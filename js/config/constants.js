/**
 * 游戏常量配置
 */
export const VERSION = '0.38.1';

// 游戏状态
export const GameState = Object.freeze({
    PET_SELECTION: 'pet_selection',
    EXPLORING: 'exploring',
    BATTLE: 'battle',
    STATS: 'stats',
    GAME_OVER: 'game_over'
});

// 战斗状态
export const BattlePhase = Object.freeze({
    IDLE: 'idle',
    WAITING_ANSWER: 'waiting_answer',
    ANIMATING: 'animating'
});

// 宠物成长参数
export const PET_GROWTH = Object.freeze({
    HP_PER_LEVEL: 10,
    ATTACK_PER_LEVEL: 2,
    XP_BASE: 100,
    XP_MULTIPLIER: 1.5,
    EVOLUTION_LEVEL: 5,
    INITIAL_POTIONS: 3,
    POTION_HEAL_PERCENT: 0.3,
    DEFEAT_RECOVER_PERCENT: 0.5
});

// 战斗奖励
export const BATTLE_REWARDS = Object.freeze({
    XP_PER_CORRECT: 10,
    TRAINER_BASE_XP: 30,
    GYM_LEADER_BASE_XP: 100,
    ELITE_FOUR_BASE_XP: 200,
    CHAMPION_XP: 500
});

// 敌人缩放参数
export const ENEMY_SCALING = Object.freeze({
    TRAINER_LEVEL_FACTOR: 0.15,
    GYM_LEVEL_FACTOR: 0.1,
    GYM_HP_BONUS: 1.5,
    GYM_ATTACK_BONUS: 1.3,
    ELITE_HP_BONUS: 2.0,
    ELITE_ATTACK_BONUS: 1.5,
    ELITE_LEVEL_FACTOR: 0.1,
    GYM_TYPE_CHANCE: 0.3
});

// 训练师名字
export const TRAINER_NAMES = [
    '新人训练师', '短裤小子', '捕虫少年', '迷你裙',
    '背包客', '登山男', '自行车手', '超能力者'
];

// 数学题难度权重 [简单, 中等, 困难]
export const DIFFICULTY_WEIGHTS = Object.freeze({
    1: [0.8, 0.2, 0.0],
    2: [0.7, 0.3, 0.0],
    3: [0.5, 0.4, 0.1],
    4: [0.4, 0.4, 0.2],
    5: [0.3, 0.4, 0.3],
    6: [0.2, 0.4, 0.4],
    7: [0.1, 0.4, 0.5],
    8: [0.1, 0.3, 0.6],
    9: [0.0, 0.2, 0.8]
});

// 难度范围配置
export const DIFFICULTY_RANGES = Object.freeze({
    1: { maxAddition: 5, maxSubtraction: 0, hasSubtraction: false },
    2: { maxAddition: 8, maxSubtraction: 5, hasSubtraction: true },
    3: { maxAddition: 10, maxSubtraction: 10, hasSubtraction: true }
});
