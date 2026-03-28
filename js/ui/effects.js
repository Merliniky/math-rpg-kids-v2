/**
 * 视觉特效 & 答题反馈 & 答题计时器
 */

const STAR_COLORS = ['#ff6b6b', '#feca57', '#48dbfb', '#ff9ff3', '#54a0ff'];

const TIMER_DURATION = 8000; // 8秒

const SPEED_TIERS = [
    { max: 2000, label: 'Excellent!', emoji: '⚡', cls: 'speed-excellent' },
    { max: 4000, label: 'Great!',     emoji: '🔥', cls: 'speed-great' },
    { max: 6000, label: 'Good',       emoji: '👍', cls: 'speed-good' },
    { max: Infinity, label: 'Bad',    emoji: '🐢', cls: 'speed-bad' }
];

// ---- 计时器状态 ----
let timerStart = 0;
let timerRAF = 0;
let timerStopped = false;

let barFill = null;
let speedLabel = null;

function getTimerElements() {
    if (!barFill) barFill = document.getElementById('timer-bar-fill');
    if (!speedLabel) speedLabel = document.getElementById('timer-speed-label');
}

/**
 * 开始答题计时
 */
export function startTimer() {
    getTimerElements();
    timerStart = performance.now();
    timerStopped = false;

    // 重置UI
    barFill.style.transition = 'none';
    barFill.style.width = '100%';
    barFill.className = '';
    speedLabel.textContent = '';
    speedLabel.className = '';

    // 强制reflow后启动CSS动画
    void barFill.offsetWidth;
    barFill.style.transition = `width ${TIMER_DURATION}ms linear`;
    barFill.style.width = '0%';

    // 用RAF更新颜色阶段
    cancelAnimationFrame(timerRAF);
    updateTimerColor();
}

function updateTimerColor() {
    if (timerStopped) return;

    const elapsed = performance.now() - timerStart;
    const pct = Math.min(elapsed / TIMER_DURATION, 1);

    // 根据时间段切换颜色class
    if (pct < 0.25) {
        barFill.className = 'timer-excellent';
    } else if (pct < 0.5) {
        barFill.className = 'timer-great';
    } else if (pct < 0.75) {
        barFill.className = 'timer-good';
    } else {
        barFill.className = 'timer-bad';
    }

    if (pct < 1) {
        timerRAF = requestAnimationFrame(updateTimerColor);
    }
}

/**
 * 停止计时并返回耗时(ms)及速度等级
 */
export function stopTimer() {
    getTimerElements();
    timerStopped = true;
    cancelAnimationFrame(timerRAF);

    const elapsed = performance.now() - timerStart;
    const tier = SPEED_TIERS.find(t => elapsed <= t.max);

    // 冻结进度条当前位置
    const remaining = Math.max(0, 1 - elapsed / TIMER_DURATION);
    barFill.style.transition = 'none';
    barFill.style.width = `${remaining * 100}%`;

    // 显示速度标签
    speedLabel.textContent = `${tier.emoji} ${tier.label}`;
    speedLabel.className = tier.cls;

    return { elapsed, tier };
}

/**
 * 播放攻击特效（黄色爆发 + 星星）
 */
export function playAttackEffect() {
    const sprite = document.querySelector('.monster-sprite');
    if (!sprite) return;

    const flash = document.createElement('div');
    flash.className = 'attack-effect';
    sprite.appendChild(flash);
    setTimeout(() => flash.remove(), 500);

    const area = document.querySelector('main');
    for (let i = 0; i < 5; i++) {
        setTimeout(() => {
            const star = document.createElement('div');
            star.className = 'star-effect';
            star.textContent = '★';
            star.style.left = `${Math.random() * 100}%`;
            star.style.top = `${Math.random() * 100}%`;
            star.style.color = STAR_COLORS[Math.floor(Math.random() * STAR_COLORS.length)];
            area.appendChild(star);
            setTimeout(() => star.remove(), 1000);
        }, i * 100);
    }
}

/**
 * 显示答题反馈弹窗（含速度评价）
 */
export function showFeedback(isCorrect, correctAnswer, speedTier) {
    const overlay = document.createElement('div');
    overlay.className = `feedback-overlay ${isCorrect ? 'correct-feedback' : 'wrong-feedback'}`;

    let html = '<div class="feedback-content">';
    if (isCorrect) {
        html += '<span class="feedback-emoji">🎉</span>';
        html += '<span class="feedback-text">回答正确！</span>';
        if (speedTier) {
            html += `<div class="feedback-speed ${speedTier.cls}">${speedTier.emoji} ${speedTier.label}</div>`;
        }
    } else {
        html += '<span class="feedback-emoji">😢</span>';
        html += '<span class="feedback-text">答错啦～</span>';
        html += `<div class="feedback-answer">正确答案是 ${correctAnswer}</div>`;
    }
    html += '</div>';

    overlay.innerHTML = html;
    document.body.appendChild(overlay);
    setTimeout(() => overlay.remove(), 1200);
}
