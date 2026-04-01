/**
 * 游戏常量配置
 */
export const VERSION = '0.42.0';

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

/**
 * 数学题难度配置（重新设计）
 *
 * 每个关卡有3个难度池的权重 [简单, 中等, 困难]
 * boss战(subLevel=5) 会额外提升难度
 */

// 普通战斗的难度权重 [简单, 中等, 困难]
export const DIFFICULTY_WEIGHTS = Object.freeze({
    1: [0.45, 0.40, 0.15],
    2: [0.35, 0.40, 0.25],
    3: [0.25, 0.40, 0.35],
    4: [0.20, 0.40, 0.40],
    5: [0.15, 0.35, 0.50],
    6: [0.10, 0.35, 0.55],
    7: [0.05, 0.30, 0.65],
    8: [0.05, 0.25, 0.70],
    9: [0.00, 0.20, 0.80]
});

// boss战的难度权重（道馆馆主 subLevel=5）
export const BOSS_DIFFICULTY_WEIGHTS = Object.freeze({
    1: [0.20, 0.45, 0.35],
    2: [0.15, 0.40, 0.45],
    3: [0.10, 0.35, 0.55],
    4: [0.05, 0.30, 0.65],
    5: [0.05, 0.25, 0.70],
    6: [0.00, 0.25, 0.75],
    7: [0.00, 0.20, 0.80],
    8: [0.00, 0.15, 0.85],
    9: [0.00, 0.10, 0.90]
});

/**
 * 难度范围配置（按数值模式分组）
 * 每个模式有3个难度等级：1=简单, 2=中等, 3=困难
 */
export const MODE_DIFFICULTY_RANGES = Object.freeze({
    10: {
        1: { minAddend: 1, maxAddition: 8,  hasSubtraction: true, subChance: 0.2,  minMinuend: 3,  maxMinuend: 6,   minSubtrahend: 1 },
        2: { minAddend: 2, maxAddition: 10, hasSubtraction: true, subChance: 0.45, minMinuend: 5,  maxMinuend: 9,   minSubtrahend: 2 },
        3: { minAddend: 2, maxAddition: 10, hasSubtraction: true, subChance: 0.55, minMinuend: 6,  maxMinuend: 10,  minSubtrahend: 2 }
    },
    20: {
        1: { minAddend: 1, maxAddition: 14, hasSubtraction: true, subChance: 0.25, minMinuend: 5,  maxMinuend: 12,  minSubtrahend: 1 },
        2: { minAddend: 2, maxAddition: 18, hasSubtraction: true, subChance: 0.45, minMinuend: 8,  maxMinuend: 16,  minSubtrahend: 2 },
        3: { minAddend: 3, maxAddition: 20, hasSubtraction: true, subChance: 0.55, minMinuend: 10, maxMinuend: 20,  minSubtrahend: 3 }
    },
    50: {
        1: { minAddend: 2, maxAddition: 30, hasSubtraction: true, subChance: 0.3,  minMinuend: 10, maxMinuend: 25,  minSubtrahend: 2 },
        2: { minAddend: 5, maxAddition: 40, hasSubtraction: true, subChance: 0.45, minMinuend: 15, maxMinuend: 40,  minSubtrahend: 5 },
        3: { minAddend: 5, maxAddition: 50, hasSubtraction: true, subChance: 0.55, minMinuend: 20, maxMinuend: 50,  minSubtrahend: 5 }
    },
    100: {
        1: { minAddend: 5,  maxAddition: 60,  hasSubtraction: true, subChance: 0.3,  minMinuend: 20, maxMinuend: 50,  minSubtrahend: 5  },
        2: { minAddend: 10, maxAddition: 80,  hasSubtraction: true, subChance: 0.45, minMinuend: 30, maxMinuend: 80,  minSubtrahend: 10 },
        3: { minAddend: 10, maxAddition: 100, hasSubtraction: true, subChance: 0.55, minMinuend: 40, maxMinuend: 100, minSubtrahend: 10 }
    }
});
