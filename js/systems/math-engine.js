/**
 * 数学题引擎 — 10以内加减法
 */
import { DIFFICULTY_WEIGHTS, DIFFICULTY_RANGES } from '../config/constants.js';

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

/**
 * 根据关卡确定基础难度等级(1-3)
 */
function calcDifficulty(level, subLevel) {
    let d;
    if (level <= 2) d = 1;
    else if (level <= 5) d = 2;
    else d = 3;
    if (subLevel === 5) d = Math.min(3, d + 1);
    return d;
}

/**
 * 生成加法题
 */
function makeAddition(maxSum) {
    let a, b;
    do {
        a = randInt(1, Math.min(10, maxSum));
        b = randInt(1, Math.min(10, maxSum));
    } while (a + b > maxSum);
    return { type: 'addition', answer: a + b, display: `${a} + ${b} = ?` };
}

/**
 * 生成减法题
 */
function makeSubtraction(maxMinuend) {
    const x = randInt(2, maxMinuend);
    const y = randInt(1, x - 1);
    return { type: 'subtraction', answer: x - y, display: `${x} - ${y} = ?` };
}

/**
 * 生成干扰选项
 */
function makeOptions(correct) {
    const opts = [correct];
    while (opts.length < 3) {
        const offset = randInt(1, 3);
        const wrong = Math.random() < 0.5 ? correct + offset : correct - offset;
        if (wrong >= 1 && wrong <= 10 && !opts.includes(wrong)) {
            opts.push(wrong);
        }
    }
    return shuffle(opts);
}

/**
 * 生成一道题目
 * @param {number} level  - 大关卡 1-9
 * @param {number} subLevel - 子关卡 1-5
 * @returns {{ display: string, answer: number, options: number[] }}
 */
export function generateQuestion(level, subLevel) {
    const weights = DIFFICULTY_WEIGHTS[level] || DIFFICULTY_WEIGHTS[1];
    const rand = Math.random();
    let selectedDiff;
    if (rand < weights[0]) selectedDiff = 1;
    else if (rand < weights[0] + weights[1]) selectedDiff = 2;
    else selectedDiff = 3;

    const range = DIFFICULTY_RANGES[selectedDiff];
    let q = null;

    if (range.hasSubtraction && Math.random() < 0.4) {
        q = makeSubtraction(range.maxSubtraction);
    }
    if (!q) {
        q = makeAddition(range.maxAddition);
    }

    q.options = makeOptions(q.answer);
    return q;
}
