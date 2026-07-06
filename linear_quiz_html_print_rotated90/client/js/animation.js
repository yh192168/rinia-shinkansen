/**
 * ===== アニメーションジェネレータ =====
 * 60fpsアニメーションを提供
 */

class AnimationEngine {
    constructor() {
        this.animations = [];
        this.isRunning = false;
        this.lastFrameTime = 0;
        this.frameRate = 60;
        this.frameTime = 1000 / this.frameRate;
    }

    /**
     * アニメーション開始
     */
    start() {
        if (this.isRunning) return;
        this.isRunning = true;
        this.animate();
    }

    /**
     * アニメーション停止
     */
    stop() {
        this.isRunning = false;
    }

    /**
     * アニメーションループ (60fps)
     */
    animate = () => {
        if (!this.isRunning) return;

        requestAnimationFrame(this.animate);

        const now = performance.now();
        const deltaTime = now - this.lastFrameTime;

        if (deltaTime >= this.frameTime) {
            this.animations = this.animations.filter(animation => {
                animation.update(deltaTime);
                return !animation.isComplete();
            });

            this.lastFrameTime = now;
        }
    }

    /**
     * アニメーション追加
     * @param {Animation} animation
     */
    add(animation) {
        this.animations.push(animation);
    }

    /**
     * 要素をアニメート
     * @param {HTMLElement} element
     * @param {Object} options
     */
    animate_element(element, options) {
        const animation = new ElementAnimation(element, options);
        this.add(animation);
        return animation;
    }
}

/**
 * アニメーション統一クラス
 */
class Animation {
    constructor(duration = 1000, easing = 'easeOut') {
        this.duration = duration;
        this.easing = easing;
        this.progress = 0;
        this.startTime = Date.now();
        this.onUpdate = null;
        this.onComplete = null;
    }

    /**
     * アニメーション更新
     * @param {number} deltaTime
     */
    update(deltaTime) {
        const elapsed = Date.now() - this.startTime;
        this.progress = Math.min(1, elapsed / this.duration);
        const eased = this.getEasedProgress(this.progress);

        if (this.onUpdate) {
            this.onUpdate(eased);
        }

        if (this.progress >= 1 && this.onComplete) {
            this.onComplete();
        }
    }

    /**
     * イージング函数を適用
     * @param {number} t
     * @returns {number}
     */
    getEasedProgress(t) {
        switch (this.easing) {
            case 'linear': return t;
            case 'easeIn': return t * t;
            case 'easeOut': return 1 - (1 - t) * (1 - t);
            case 'easeInOut': return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
            case 'easeInCubic': return t * t * t;
            case 'easeOutCubic': return 1 - (1 - t) * (1 - t) * (1 - t);
            case 'easeInOutCubic': return t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2;
            default: return t;
        }
    }

    /**
     * アニメーション完了かどうか
     * @returns {boolean}
     */
    isComplete() {
        return this.progress >= 1;
    }
}

/**
 * 要素アニメーション
 */
class ElementAnimation extends Animation {
    constructor(element, options) {
        super(options.duration || 1000, options.easing || 'easeOut');
        this.element = element;
        this.from = options.from || {};
        this.to = options.to || {};
        this.properties = {};

        // 初期値を保持
        Object.keys(this.from).forEach(key => {
            this.properties[key] = this.from[key];
        });

        this.onUpdate = () => this.render();
    }

    /**
     * 要素を描画
     */
    render() {
        Object.keys(this.to).forEach(key => {
            if (typeof this.from[key] === 'number' && typeof this.to[key] === 'number') {
                const value = this.from[key] + (this.to[key] - this.from[key]) * this.progress;
                this.properties[key] = value;

                // CSSを適用
                if (key === 'opacity') {
                    this.element.style.opacity = value;
                } else if (key === 'scale') {
                    this.element.style.transform = `scale(${value})`;
                } else if (key === 'rotate') {
                    this.element.style.transform = `rotate(${value}deg)`;
                } else if (key === 'translateX') {
                    this.element.style.transform = `translateX(${value}px)`;
                } else if (key === 'translateY') {
                    this.element.style.transform = `translateY(${value}px)`;
                }
            }
        });
    }
}

/**
 * タイマーアニメーション
 */
class TimerAnimation {
    constructor(duration, onTick, onComplete) {
        this.duration = duration;
        this.remaining = duration;
        this.onTick = onTick;
        this.onComplete = onComplete;
        this.isRunning = false;
        this.startTime = 0;
        this.pausedTime = 0;
    }

    /**
     * タイマー起動
     */
    start() {
        this.isRunning = true;
        this.startTime = Date.now() - this.pausedTime;
        this.tick();
    }

    /**
     * タイマー一時停止
     */
    pause() {
        this.isRunning = false;
        this.pausedTime = Date.now() - this.startTime;
    }

    /**
     * タイマー再開始
     */
    resume() {
        this.start();
    }

    /**
     * タイマー取り消し
     */
    stop() {
        this.isRunning = false;
        this.remaining = this.duration;
    }

    /**
     * タイマーティック
     */
    tick = () => {
        if (!this.isRunning) return;

        const elapsed = Date.now() - this.startTime;
        this.remaining = Math.max(0, this.duration - elapsed);

        const progress = 1 - (this.remaining / this.duration);
        this.onTick(Math.ceil(this.remaining / 1000), progress);

        if (this.remaining <= 0) {
            this.isRunning = false;
            if (this.onComplete) this.onComplete();
        } else {
            requestAnimationFrame(this.tick);
        }
    }

    /**
     * 残り時間を取得
     * @returns {number}
     */
    getRemaining() {
        return Math.ceil(this.remaining / 1000);
    }
}

/**
 * スクリーントランジション
 */
class ScreenTransition {
    constructor(fromScreen, toScreen, duration = 500) {
        this.fromScreen = fromScreen;
        this.toScreen = toScreen;
        this.duration = duration;
        this.engine = new AnimationEngine();
    }

    /**
     * トランジション実行
     */
    execute() {
        return new Promise(resolve => {
            this.engine.start();

            const animation = new Animation(this.duration, 'easeInOut');
            animation.onUpdate = (progress) => {
                if (this.fromScreen) {
                    this.fromScreen.style.opacity = 1 - progress;
                }
                if (this.toScreen) {
                    this.toScreen.style.opacity = progress;
                }
            };
            animation.onComplete = () => {
                this.engine.stop();
                resolve();
            };

            this.engine.add(animation);
        });
    }
}

// グローバルに登録
window.AnimationEngine = AnimationEngine;
window.Animation = Animation;
window.TimerAnimation = TimerAnimation;
window.ScreenTransition = ScreenTransition;
