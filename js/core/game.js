/**
 * 游戏主控制器 — 协调所有系统
 */
import { GameState, BattlePhase, BATTLE_REWARDS } from '../config/constants.js';
import { GymData, EliteFourData } from '../config/pokemon-data.js';
import { EventBus, GameStore, SaveManager } from './state.js';
import { createPet, addXP, usePotion as usePotionSystem, recoverFromDefeat } from '../systems/pet.js';
import { createEncounter, dealDamage } from '../systems/battle.js';
import { generateQuestion, resetQuestionHistory } from '../systems/math-engine.js';
import * as R from '../ui/renderer.js';
import { playAttackEffect, showFeedback } from '../ui/effects.js';
import { startTimer, stopTimer } from '../ui/timer.js';

export class Game {
    constructor() {
        this.bus = new EventBus();
        this.store = new GameStore(this.bus);
        this.messageCallback = null;
        this.el = R.cacheElements();
        this.bindEvents();
        this.start();
    }

    // ---- Init ----

    start() {
        this.store.set('gameState', GameState.PET_SELECTION);
        const saveData = SaveManager.load();
        if (saveData) {
            R.renderSaveInfo(this.el, saveData);
        } else {
            R.hideSaveInfo(this.el);
        }
        R.show(this.el.petSelection);
    }

    loadSave() {
        const saveData = SaveManager.load();
        if (!saveData) return;
        this.store.set('pet', { ...saveData.pet });
        this.store.set('mathMode', saveData.mathMode || 10);
        this.store.update({
            level: saveData.progress.level,
            subLevel: saveData.progress.subLevel,
            monstersDefeated: saveData.progress.monstersDefeated
        });
        R.hide(this.el.petSelection);
        this.store.set('gameState', GameState.EXPLORING);
        R.renderPet(this.store.get('pet'));
        R.renderLevelDisplay(this.store.get('level'), this.store.get('subLevel'));
        R.renderModeTag(this.store.get('mathMode'));
        R.renderExploreHint(this.store.get('level'), this.store.get('subLevel'));
        R.show(this.el.exploreHint);
    }

    newGame() {
        SaveManager.delete();
        R.hideSaveInfo(this.el);
    }

    bindEvents() {
        this.el.exploreBtn.addEventListener('click', () => this.explore());
        this.el.potionBtn.addEventListener('click', () => this.usePotion());
        this.el.statsBtn.addEventListener('click', () => this.showStats());
        this.el.messageOkBtn.addEventListener('click', () => this.hideMessage());
        this.el.confirmPetBtn.addEventListener('click', () => this.confirmPet());
        this.el.closeStatsBtn.addEventListener('click', () => this.hideStats());
        this.el.continueSaveBtn.addEventListener('click', () => this.loadSave());
        this.el.newGameBtn.addEventListener('click', () => this.newGame());

        this.el.modeOptions.forEach(opt => {
            opt.addEventListener('click', e => {
                this.el.modeOptions.forEach(o => o.classList.remove('selected'));
                e.currentTarget.classList.add('selected');
            });
        });

        this.el.petOptions.forEach(opt => {
            opt.addEventListener('click', e => {
                this.el.petOptions.forEach(o => o.classList.remove('selected'));
                e.currentTarget.classList.add('selected');
            });
        });

        this.el.answerButtons.forEach(btn => {
            btn.addEventListener('click', e => this.submitAnswer(e.currentTarget));
        });
    }

    // ---- Pet Selection ----

    confirmPet() {
        const selected = document.querySelector('.pet-option.selected');
        if (!selected) {
            this.showMessage('请先选择一只宠物！');
            return;
        }

        const modeBtn = document.querySelector('.mode-option.selected');
        const mathMode = modeBtn ? parseInt(modeBtn.dataset.mode) : 10;
        this.store.set('mathMode', mathMode);

        const pet = createPet(selected.dataset.pet);
        this.store.set('pet', pet);
        R.hide(this.el.petSelection);
        this.store.set('gameState', GameState.EXPLORING);
        R.renderPet(pet);
        R.renderLevelDisplay(this.store.get('level'), this.store.get('subLevel'));
        R.renderModeTag(mathMode);
        this.showMessage(`欢迎来到数理小精灵的世界！\n你选择了${pet.name}！\n模式：${mathMode}以内加减法`);
    }

    // ---- Exploration ----

    explore() {
        if (this.store.get('gameState') !== GameState.EXPLORING) return;

        const level = this.store.get('level');
        const subLevel = this.store.get('subLevel');
        const enemy = createEncounter(level, subLevel);
        this.store.set('enemy', enemy);
        this.store.set('encounterType', enemy.encounterType);

        let msg = '';
        if (enemy.encounterType === 'champion') {
            msg = `👑 联盟冠军小智出现了！\n\n这是最终决战！`;
        } else if (enemy.encounterType === 'eliteFour') {
            msg = `⭐ ${enemy.trainerName} 派出了成名宝可梦 ${enemy.name}（${enemy.type}）！\n\n准备迎接最艰难的战斗！`;
        } else if (enemy.encounterType === 'gymLeader') {
            msg = `🏛️ ${enemy.trainerName.split('（')[0]} 派出了成名宝可梦 ${enemy.name}（${enemy.type}）！\n\n这是道馆战斗！`;
        } else {
            msg = `${enemy.trainerName} 派出了 ${enemy.name}（${enemy.type}）！`;
        }

        this.showMessage(msg, () => this.startBattle());
    }

    // ---- Battle ----

    startBattle() {
        this.store.set('gameState', GameState.BATTLE);
        this.store.set('battlePhase', BattlePhase.WAITING_ANSWER);
        resetQuestionHistory();
        R.show(this.el.mathBoard);
        R.hide(this.el.exploreHint);
        R.renderEnemy(this.store.get('enemy'));
        this.nextQuestion();
    }

    nextQuestion() {
        const level = this.store.get('level');
        const subLevel = this.store.get('subLevel');
        const encounterType = this.store.get('encounterType');
        const mathMode = this.store.get('mathMode');
        const q = generateQuestion(level, subLevel, encounterType, mathMode);
        this.store.set('question', q);
        R.renderQuestion(q);
        this.store.set('battlePhase', BattlePhase.WAITING_ANSWER);
        startTimer();
    }

    submitAnswer(btn) {
        if (this.store.get('battlePhase') !== BattlePhase.WAITING_ANSWER) return;
        this.store.set('battlePhase', BattlePhase.ANIMATING);
        R.disableAnswerButtons();
        const { tier } = stopTimer();

        const question = this.store.get('question');
        const userAnswer = parseInt(btn.dataset.answer);
        const isCorrect = userAnswer === question.answer;

        if (isCorrect) {
            this.handleCorrect(btn, tier);
        } else {
            this.handleWrong(btn);
        }
    }

    handleCorrect(btn, speedTier) {
        R.markButton(btn, 'correct');
        showFeedback(true, null, speedTier);
        playAttackEffect();

        const pet = this.store.get('pet');
        const enemy = this.store.get('enemy');
        const defeated = dealDamage(enemy, pet.attack);
        R.renderEnemy(enemy);

        const events = addXP(pet, BATTLE_REWARDS.XP_PER_CORRECT);
        R.renderPet(pet);

        setTimeout(() => {
            // 先处理升级消息
            if (events.length > 0) {
                this.processLevelEvents(events, () => {
                    if (defeated) {
                        this.enemyDefeated();
                    } else {
                        this.nextQuestion();
                    }
                });
            } else if (defeated) {
                this.enemyDefeated();
            } else {
                this.nextQuestion();
            }
        }, 1000);
    }

    processLevelEvents(events, callback) {
        const event = events.shift();
        if (!event) { callback(); return; }

        const pet = this.store.get('pet');
        let msg = `恭喜！你的宠物升到了${event.newLevel}级！`;

        if (event.evolved) {
            msg += `\n\n你的宠物进化成了${pet.name}！变得更强大了！`;
            R.renderPet(pet);
        }

        this.showMessage(msg, () => this.processLevelEvents(events, callback));
    }

    handleWrong(btn) {
        R.markButton(btn, 'wrong');
        showFeedback(false, this.store.get('question').answer);
        R.highlightCorrectAnswer(this.store.get('question').answer);

        setTimeout(() => {
            const pet = this.store.get('pet');
            const enemy = this.store.get('enemy');
            dealDamage(pet, enemy.attack);
            R.renderPet(pet);

            if (pet.hp <= 0) {
                this.playerDefeated();
            } else {
                setTimeout(() => this.nextQuestion(), 1500);
            }
        }, 500);
    }

    // ---- Battle Outcomes ----

    enemyDefeated() {
        const enemy = this.store.get('enemy');
        const pet = this.store.get('pet');
        const level = this.store.get('level');
        const subLevel = this.store.get('subLevel');
        const type = enemy.encounterType;

        const events = addXP(pet, enemy.xp);
        R.renderPet(pet);
        this.store.set('monstersDefeated', this.store.get('monstersDefeated') + 1);

        R.clearEnemy();
        R.hide(this.el.mathBoard);

        // 冠军通关
        if (type === 'champion') {
            this.showMessage(
                `🎉🎉🎉 恭喜你击败了小智的皮卡丘！\n\n你成为了新的宝可梦联盟冠军！\n\n感谢游玩《数理小精灵：十之秘境》！`,
                () => {
                    if (events.length > 0) {
                        this.processLevelEvents(events, () => this.gameComplete());
                    } else {
                        this.gameComplete();
                    }
                }
            );
            return;
        }

        // 关卡推进
        let msg = '';
        let newLevel = level;
        let newSubLevel = subLevel;

        if (type === 'gymLeader') {
            msg = `🏆 恭喜你击败了${enemy.gymLeader}的${enemy.name}！\n获得了${enemy.gymType}徽章！\n\n获得经验值：${enemy.xp}`;
            newLevel++;
            newSubLevel = 1;
            if (newLevel > 8) {
                newLevel = 9;
                msg += `\n\n⭐ 你已经获得了所有道馆徽章！\n准备挑战四大天王吧！`;
            }
        } else if (type === 'eliteFour') {
            msg = `⭐ 恭喜你击败了${enemy.eliteName}的${enemy.name}！\n\n获得经验值：${enemy.xp}`;
            newSubLevel++;
            if (newSubLevel > 4) {
                msg += `\n\n👑 准备迎接最终决战！\n联盟冠军小智在等着你！`;
            }
        } else {
            msg = `成功击败了${enemy.trainerName}的${enemy.name}！\n\n获得经验值：${enemy.xp}`;
            newSubLevel++;
        }

        this.store.update({ level: newLevel, subLevel: newSubLevel });

        this.showMessage(msg, () => {
            if (events.length > 0) {
                this.processLevelEvents(events, () => this.returnToExploring());
            } else {
                this.returnToExploring();
            }
        });
    }

    returnToExploring() {
        this.store.update({ gameState: GameState.EXPLORING, enemy: null, encounterType: null });
        R.show(this.el.exploreHint);
        R.renderLevelDisplay(this.store.get('level'), this.store.get('subLevel'));
        R.renderExploreHint(this.store.get('level'), this.store.get('subLevel'));
        SaveManager.save(this.store);
    }

    playerDefeated() {
        this.showMessage('你的宠物被击败了！需要休息一下...', () => {
            const pet = this.store.get('pet');
            recoverFromDefeat(pet);
            R.renderPet(pet);
            R.hide(this.el.mathBoard);
            this.returnToExploring();
        });
    }

    gameComplete() {
        this.store.set('gameState', GameState.GAME_OVER);
        SaveManager.delete();
        R.renderGameComplete();
    }

    // ---- Potion ----

    usePotion() {
        const pet = this.store.get('pet');
        if (!pet) return;
        const result = usePotionSystem(pet);
        R.renderPet(pet);
        this.showMessage(result.message);
    }

    // ---- Stats ----

    showStats() {
        if (!this.store.get('pet')) return;
        this.store.set('gameState', GameState.STATS);
        R.renderStats(
            this.store.get('pet'),
            this.store.get('level'),
            this.store.get('subLevel'),
            this.store.get('monstersDefeated')
        );
        R.show(this.el.statsPanel);
    }

    hideStats() {
        R.hide(this.el.statsPanel);
        this.store.set('gameState', GameState.EXPLORING);
    }

    // ---- Message System ----

    showMessage(text, callback) {
        this.el.messageText.textContent = text;
        R.show(this.el.messageOverlay);
        this.messageCallback = callback || null;
    }

    hideMessage() {
        R.hide(this.el.messageOverlay);
        if (this.messageCallback) {
            const cb = this.messageCallback;
            this.messageCallback = null;
            cb();
        }
    }
}

