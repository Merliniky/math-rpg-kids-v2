/**
 * DOM 渲染器 — 所有 UI 更新集中在此
 */
import { getPetDisplay } from '../systems/pet.js';
import { spriteUrl } from '../config/pokemon-data.js';

/**
 * 设置精灵图：优先用 <img>，加载失败回退到 emoji
 */
function setSpriteImage(container, spriteId, fallbackEmoji) {
    if (spriteId) {
        const url = spriteUrl(spriteId);
        // 复用已有的 img 或新建
        let img = container.querySelector('img');
        if (!img) {
            container.textContent = '';
            img = document.createElement('img');
            img.className = 'sprite-img';
            img.alt = '';
            img.onerror = () => { container.textContent = fallbackEmoji; img.remove(); };
            container.appendChild(img);
        }
        img.src = url;
    } else {
        const img = container.querySelector('img');
        if (img) img.remove();
        container.textContent = fallbackEmoji;
    }
}

// 缓存所有 DOM 元素
let el = {};

export function cacheElements() {
    el = {
        playerLevel: document.getElementById('player-level'),
        playerHPFill: document.getElementById('player-hp-fill'),
        playerXPFill: document.getElementById('player-xp-fill'),
        playerPetImage: document.getElementById('player-pet-image'),
        playerPetName: document.getElementById('player-pet-name'),
        enemyHPFill: document.getElementById('enemy-hp-fill'),
        enemyMonsterImage: document.getElementById('enemy-monster-image'),
        monsterName: document.getElementById('monster-name'),
        trainerName: document.getElementById('trainer-name'),
        mathBoard: document.getElementById('math-board'),
        exploreHint: document.getElementById('explore-hint'),
        questionText: document.getElementById('question-text'),
        answerButtons: document.querySelectorAll('.answer-btn'),
        exploreBtn: document.getElementById('explore-btn'),
        potionBtn: document.getElementById('potion-btn'),
        statsBtn: document.getElementById('stats-btn'),
        messageOverlay: document.getElementById('message-overlay'),
        messageText: document.getElementById('message-text'),
        messageOkBtn: document.getElementById('message-ok-btn'),
        petSelection: document.getElementById('pet-selection'),
        petOptions: document.querySelectorAll('.pet-option'),
        confirmPetBtn: document.getElementById('confirm-pet-btn'),
        statsPanel: document.getElementById('stats-panel'),
        closeStatsBtn: document.getElementById('close-stats-btn'),
        petName: document.getElementById('pet-name'),
        petLevelDisplay: document.getElementById('pet-level-display'),
        petXP: document.getElementById('pet-xp'),
        xpToNext: document.getElementById('xp-to-next'),
        petHP: document.getElementById('pet-hp'),
        petMaxHP: document.getElementById('pet-max-hp'),
        petAttack: document.getElementById('pet-attack'),
        currentLevel: document.getElementById('current-level'),
        monstersDefeatedDisplay: document.getElementById('monsters-defeated'),
        levelDisplay: document.getElementById('level-display')
    };
    return el;
}

export function getElements() {
    return el;
}

// ---- Pet UI ----

export function renderPet(pet) {
    if (!pet) return;
    const display = getPetDisplay(pet);
    el.playerLevel.textContent = pet.level;
    el.playerHPFill.style.width = `${(pet.hp / pet.maxHP) * 100}%`;
    el.playerXPFill.style.width = `${(pet.xp / pet.xpToNext) * 100}%`;
    setSpriteImage(el.playerPetImage, display.spriteId, display.emoji);
    el.playerPetName.textContent = display.name;
}

// ---- Enemy UI ----

export function renderEnemy(enemy) {
    if (!enemy) return;
    el.enemyHPFill.style.width = `${(enemy.hp / enemy.maxHP) * 100}%`;
    if (enemy.trainerName) {
        el.trainerName.textContent = `👤 ${enemy.trainerName}`;
        el.trainerName.style.display = 'block';
    } else {
        el.trainerName.textContent = '';
        el.trainerName.style.display = 'none';
    }
    el.monsterName.textContent = enemy.name;
    setSpriteImage(el.enemyMonsterImage, enemy.spriteId, enemy.emoji || '❓');
}

export function clearEnemy() {
    el.monsterName.textContent = '';
    const img = el.enemyMonsterImage.querySelector('img');
    if (img) img.remove();
    el.enemyMonsterImage.textContent = '';
    el.trainerName.textContent = '';
}

// ---- Level Display ----

import { GymData, EliteFourData } from '../config/pokemon-data.js';

export function renderLevelDisplay(level, subLevel) {
    const gymNames = GymData.map(g => g.name);
    let text = '';

    if (level === 9) {
        if (subLevel === 5) {
            text = '第9关 冠军之路 - 小智';
        } else {
            text = `第9关 四大天王 - ${EliteFourData[subLevel - 1].name}`;
        }
    } else {
        const gymName = gymNames[level - 1];
        if (subLevel === 5) {
            text = `第${level}关 ${gymName} - ${GymData[level - 1].leader}`;
        } else {
            text = `第${level}关 ${gymName} (${subLevel}/5)`;
        }
    }

    el.levelDisplay.textContent = text;
    if (el.currentLevel) el.currentLevel.textContent = `${level}-${subLevel}`;
}

// ---- Explore Hint ----

export function renderExploreHint(level, subLevel) {
    const hintText = el.exploreHint.querySelector('.hint-text');
    if (!hintText) return;

    if (level === 9) {
        if (subLevel === 5) {
            hintText.textContent = '点击"探索"按钮，挑战联盟冠军小智！';
        } else {
            hintText.textContent = `点击"探索"按钮，挑战四大天王${EliteFourData[subLevel - 1].name}！`;
        }
    } else {
        const gym = GymData[level - 1];
        if (subLevel === 5) {
            hintText.textContent = `点击"探索"按钮，挑战${gym.name}道馆馆主！`;
        } else {
            hintText.textContent = `点击"探索"按钮，继续${gym.name}的挑战！`;
        }
    }
}

// ---- Question UI ----

export function renderQuestion(question) {
    el.questionText.textContent = question.display;
    el.answerButtons.forEach((btn, i) => {
        btn.textContent = question.options[i];
        btn.dataset.answer = question.options[i];
        btn.classList.remove('correct', 'wrong');
        btn.disabled = false;
    });
}

export function disableAnswerButtons() {
    el.answerButtons.forEach(btn => btn.disabled = true);
}

export function markButton(btn, cls) {
    btn.classList.add(cls);
}

export function highlightCorrectAnswer(correctAnswer) {
    el.answerButtons.forEach(btn => {
        if (parseInt(btn.dataset.answer) === correctAnswer) {
            btn.classList.add('correct');
        }
    });
}

// ---- Stats Panel ----

export function renderStats(pet, level, subLevel, monstersDefeated) {
    const display = getPetDisplay(pet);
    el.petName.textContent = display.name;
    el.petLevelDisplay.textContent = pet.level;
    el.petXP.textContent = pet.xp;
    el.xpToNext.textContent = pet.xpToNext;
    el.petHP.textContent = pet.hp;
    el.petMaxHP.textContent = pet.maxHP;
    el.petAttack.textContent = pet.attack;
    el.currentLevel.textContent = `${level}-${subLevel}`;
    el.monstersDefeatedDisplay.textContent = monstersDefeated;
}

// ---- Visibility ----

export function show(element) { element.classList.remove('hidden'); }
export function hide(element) { element.classList.add('hidden'); }

// ---- Game Complete ----

export function renderGameComplete() {
    el.exploreHint.innerHTML = `
        <div class="hint-content">
            <span class="hint-icon">🏆</span>
            <span class="hint-text">恭喜通关！</span>
            <span class="hint-subtext">你已经成为了宝可梦联盟冠军！</span>
            <button onclick="location.reload()" class="restart-btn">重新开始</button>
        </div>
    `;
    show(el.exploreHint);
}
