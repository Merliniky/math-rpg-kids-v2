/**
 * 视觉特效 & 答题反馈
 */

const STAR_COLORS = ['#ff6b6b', '#feca57', '#48dbfb', '#ff9ff3', '#54a0ff'];

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

    const area = document.getElementById('battle-area');
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
 * 显示答题反馈弹窗
 */
export function showFeedback(isCorrect, correctAnswer) {
    const overlay = document.createElement('div');
    overlay.className = `feedback-overlay ${isCorrect ? 'correct-feedback' : 'wrong-feedback'}`;

    let html = '<div class="feedback-content">';
    if (isCorrect) {
        html += '<span class="feedback-emoji">🎉</span>';
        html += '<span class="feedback-text">回答正确！</span>';
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
