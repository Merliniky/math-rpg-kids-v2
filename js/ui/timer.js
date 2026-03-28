/**
 * 答题计时器模块
 *
 * 进度条8秒倒计时，根据回答速度给出评价。
 * 超时无惩罚，用户仍可继续作答。
 */

const TIMER_DURATION = 8000;

const SPEED_TIERS = [
    { max: 2000, label: 'Excellent!', emoji: '⚡', cls: 'speed-excellent' },
    { max: 4000, label: 'Great!',     emoji: '🔥', cls: 'speed-great' },
    { max: 6000, label: 'Good',       emoji: '👍', cls: 'speed-good' },
    { max: Infinity, label: 'Bad',    emoji: '🐢', cls: 'speed-bad' }
];

let timerStart = 0;
let rafId = 0;
let stopped = true;

// 懒获取DOM元素
let _fill = null;
let _label = null;

function getFill() {
    if (!_fill) _fill = document.getElementById('timer-bar-fill');
    return _fill;
}

function getLabel() {
    if (!_label) _label = document.getElementById('timer-speed-label');
    return _label;
}

function updateColor() {
    if (stopped) return;
    const fill = getFill();
    if (!fill) return;

    const elapsed = performance.now() - timerStart;
    const ratio = Math.min(elapsed / TIMER_DURATION, 1);

    if (ratio < 0.25)      fill.className = 'timer-phase-1';
    else if (ratio < 0.50) fill.className = 'timer-phase-2';
    else if (ratio < 0.75) fill.className = 'timer-phase-3';
    else                    fill.className = 'timer-phase-4';

    if (ratio < 1) {
        rafId = requestAnimationFrame(updateColor);
    }
}

/**
 * 出题时调用 — 启动8秒倒计时
 */
export function startTimer() {
    const fill = getFill();
    const label = getLabel();
    if (!fill) return;

    stopped = false;
    timerStart = performance.now();

    // 重置：先移除动画，设满宽
    fill.style.transition = 'none';
    fill.style.width = '100%';
    fill.className = 'timer-phase-1';
    if (label) {
        label.textContent = '';
        label.className = '';
    }

    // 强制reflow然后启动CSS过渡动画
    void fill.offsetWidth;
    fill.style.transition = `width ${TIMER_DURATION}ms linear`;
    fill.style.width = '0%';

    cancelAnimationFrame(rafId);
    rafId = requestAnimationFrame(updateColor);
}

/**
 * 回答时调用 — 停止计时，返回速度评价
 * @returns {{ elapsed: number, tier: { label, emoji, cls } }}
 */
export function stopTimer() {
    stopped = true;
    cancelAnimationFrame(rafId);

    const fill = getFill();
    const label = getLabel();
    const elapsed = performance.now() - timerStart;
    const tier = SPEED_TIERS.find(t => elapsed <= t.max);

    if (fill) {
        // 冻结在当前位置
        const remaining = Math.max(0, 1 - elapsed / TIMER_DURATION);
        fill.style.transition = 'none';
        fill.style.width = `${remaining * 100}%`;
    }

    if (label) {
        label.textContent = `${tier.emoji} ${tier.label}`;
        label.className = `speed-label ${tier.cls}`;
    }

    return { elapsed, tier };
}
