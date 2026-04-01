/**
 * 数学题引擎 — 支持多种数值范围模式
 *
 * 设计目标：
 * - 每场战斗简单题和难题交替出现
 * - 避免大量出现 +1/-1 类过于简单的题目
 * - boss战（道馆馆主、四大天王、冠军）显著更难
 * - 高关卡减法题比例增加
 * - 支持10/20/50/100以内加减法模式
 */
import {
    DIFFICULTY_WEIGHTS,
    BOSS_DIFFICULTY_WEIGHTS,
    MODE_DIFFICULTY_RANGES
} from '../config/constants.js';

function randInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function shuffle(arr) {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

// 最近出过的题目，用于防止连续重复
let recentQuestions = [];
const MAX_RECENT = 4;

/**
 * 生成加法题
 */
function makeAddition(range) {
    const { minAddend, maxAddition } = range;
    let a, b;
    let attempts = 0;
    do {
        a = randInt(minAddend, maxAddition - minAddend);
        b = randInt(minAddend, maxAddition - a);
        attempts++;
    } while ((a + b > maxAddition || a + b < minAddend * 2) && attempts < 20);

    // 确保不超范围
    if (a + b > maxAddition) {
        a = randInt(minAddend, Math.floor(maxAddition / 2));
        b = randInt(minAddend, maxAddition - a);
    }

    return { type: 'addition', a, b, answer: a + b, display: `${a} + ${b} = ?` };
}

/**
 * 生成减法题
 */
function makeSubtraction(range) {
    const { minMinuend, maxMinuend, minSubtrahend } = range;
    const x = randInt(minMinuend, maxMinuend);
    const maxY = Math.max(minSubtrahend, x - 1);
    const y = randInt(minSubtrahend, maxY);

    return { type: 'subtraction', a: x, b: y, answer: x - y, display: `${x} - ${y} = ?` };
}

/**
 * 检查题目是否和最近的重复
 */
function isDuplicate(q) {
    return recentQuestions.some(r => r.display === q.display);
}

/**
 * 生成干扰选项（根据答案范围自适应）
 */
function makeOptions(correct, maxValue) {
    const opts = [correct];
    const maxOffset = maxValue <= 10 ? 4 : maxValue <= 20 ? 6 : maxValue <= 50 ? 10 : 15;
    let attempts = 0;
    while (opts.length < 3 && attempts < 30) {
        const offset = randInt(1, maxOffset);
        const wrong = Math.random() < 0.5 ? correct + offset : correct - offset;
        if (wrong >= 0 && wrong <= maxValue + 5 && !opts.includes(wrong)) {
            opts.push(wrong);
        }
        attempts++;
    }
    // 保底填充
    while (opts.length < 3) {
        const filler = randInt(0, maxValue);
        if (!opts.includes(filler)) opts.push(filler);
    }
    return shuffle(opts);
}

/**
 * 生成一道题目
 * @param {number} level     - 大关卡 1-9
 * @param {number} subLevel  - 子关卡 1-5
 * @param {string} [encounterType] - 遭遇类型
 * @param {number} [mathMode=10] - 数学模式：10/20/50/100
 * @returns {{ display: string, answer: number, options: number[] }}
 */
export function generateQuestion(level, subLevel, encounterType, mathMode = 10) {
    // 根据遭遇类型选择权重表
    const isBoss = encounterType === 'gymLeader'
        || encounterType === 'eliteFour'
        || encounterType === 'champion'
        || subLevel === 5;

    const weightTable = isBoss ? BOSS_DIFFICULTY_WEIGHTS : DIFFICULTY_WEIGHTS;
    const weights = weightTable[level] || weightTable[1];

    // 按权重随机选择难度
    const rand = Math.random();
    let selectedDiff;
    if (rand < weights[0]) selectedDiff = 1;
    else if (rand < weights[0] + weights[1]) selectedDiff = 2;
    else selectedDiff = 3;

    const modeRanges = MODE_DIFFICULTY_RANGES[mathMode] || MODE_DIFFICULTY_RANGES[10];
    const range = modeRanges[selectedDiff];

    // 生成题目，避免重复
    let q = null;
    let tries = 0;
    do {
        if (range.hasSubtraction && Math.random() < range.subChance) {
            q = makeSubtraction(range);
        } else {
            q = makeAddition(range);
        }
        tries++;
    } while (isDuplicate(q) && tries < 10);

    // 记录最近的题目
    recentQuestions.push(q);
    if (recentQuestions.length > MAX_RECENT) {
        recentQuestions.shift();
    }

    q.options = makeOptions(q.answer, mathMode);
    return q;
}

/**
 * 重置出题记录（新战斗开始时调用）
 */
export function resetQuestionHistory() {
    recentQuestions = [];
}
