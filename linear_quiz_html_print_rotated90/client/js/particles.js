/**
 * ===== パーティクルシステム =====
 * ネオンパーティクル効果を生成・管理
 */

class ParticleSystem {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.particles = [];
        this.frameRate = 60;
        this.isRunning = false;
        this.lastTime = 0;

        if (this.container) {
            this.start();
        }
    }

    /**
     * パーティクルシステム開始
     */
    start() {
        this.isRunning = true;
        this.animate();
    }

    /**
     * パーティクルシステム停止
     */
    stop() {
        this.isRunning = false;
    }

    /**
     * アニメーションループ
     */
    animate = () => {
        if (!this.isRunning) return;

        const now = Date.now();
        const deltaTime = now - this.lastTime;
        this.lastTime = now;

        // パーティクルの更新
        this.particles = this.particles.filter(particle => {
            particle.update(deltaTime);
            if (particle.isAlive()) {
                particle.render();
                return true;
            } else {
                particle.element.remove();
                return false;
            }
        });

        requestAnimationFrame(this.animate);
    }

    /**
     * 単一パーティクル生成
     * @param {Object} options - オプション
     */
    createParticle(options) {
        const particle = new Particle(this.container, options);
        this.particles.push(particle);
    }

    /**
     * 爆発エフェクト生成
     * @param {number} x - X座標
     * @param {number} y - Y座標
     * @param {number} count - パーティクル数
     * @param {string} color - カラー
     */
    burst(x, y, count = 20, color = 'var(--neon-primary)') {
        for (let i = 0; i < count; i++) {
            const angle = (Math.PI * 2 * i) / count;
            const velocity = {
                x: Math.cos(angle) * 3,
                y: Math.sin(angle) * 3
            };

            this.createParticle({
                x,
                y,
                velocity,
                color,
                life: 800,
                size: Utils.random(3, 8)
            });
        }
    }

    /**
     * 雨エフェクト生成
     * @param {number} count - パーティクル数
     * @param {string} color - カラー
     */
    rain(count = 30, color = 'rgba(0, 255, 65, 0.5)') {
        for (let i = 0; i < count; i++) {
            this.createParticle({
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight * -0.5,
                velocity: {
                    x: Utils.random(-1, 1),
                    y: 2 + Math.random() * 3
                },
                color,
                life: 3000,
                size: Utils.random(1, 3)
            });
        }
    }

    /**
     * スパーク生成
     * @param {number} x - X座標
     * @param {number} y - Y座標
     * @param {number} count - パーティクル数
     */
    spark(x, y, count = 10) {
        for (let i = 0; i < count; i++) {
            const angle = Math.random() * Math.PI * 2;
            const speed = 1 + Math.random() * 3;

            this.createParticle({
                x,
                y,
                velocity: {
                    x: Math.cos(angle) * speed,
                    y: Math.sin(angle) * speed
                },
                color: `hsl(${Math.random() * 60 + 45}, 100%, 50%)`,
                life: 500,
                size: Utils.random(2, 5)
            });
        }
    }

    /**
     * すべてのパーティクル削除
     */
    clear() {
        this.particles.forEach(p => p.element.remove());
        this.particles = [];
    }
}

/**
 * パーティクルクラス
 */
class Particle {
    constructor(container, options) {
        this.container = container;
        this.x = options.x || 0;
        this.y = options.y || 0;
        this.velocity = options.velocity || { x: 0, y: 0 };
        this.acceleration = options.acceleration || { x: 0, y: 0.1 };
        this.color = options.color || 'var(--neon-primary)';
        this.size = options.size || 5;
        this.life = options.life || 1000;
        this.age = 0;
        this.maxLife = this.life;
        this.rotation = options.rotation || 0;
        this.rotationVelocity = options.rotationVelocity || 0;

        this.element = document.createElement('div');
        this.element.className = 'particle';
        this.element.style.cssText = `
            position: absolute;
            width: ${this.size}px;
            height: ${this.size}px;
            border-radius: 50%;
            background: ${this.color};
            box-shadow: 0 0 ${this.size * 2}px ${this.color};
            pointer-events: none;
            z-index: 10;
        `;

        this.container.appendChild(this.element);
    }

    /**
     * パーティクル更新
     * @param {number} deltaTime - デルタタイム
     */
    update(deltaTime) {
        this.age += deltaTime;

        // 速度に加速度を適用
        this.velocity.x += this.acceleration.x * (deltaTime / 1000);
        this.velocity.y += this.acceleration.y * (deltaTime / 1000);

        // 位置更新
        this.x += this.velocity.x * (deltaTime / 1000);
        this.y += this.velocity.y * (deltaTime / 1000);

        // 回転
        this.rotation += this.rotationVelocity * (deltaTime / 1000);
    }

    /**
     * パーティクル描画
     */
    render() {
        const progress = this.age / this.maxLife;
        const opacity = Math.max(0, 1 - progress);
        const scale = 1 - progress * 0.5;

        this.element.style.cssText = `
            position: absolute;
            left: ${this.x}px;
            top: ${this.y}px;
            width: ${this.size}px;
            height: ${this.size}px;
            border-radius: 50%;
            background: ${this.color};
            box-shadow: 0 0 ${this.size * 2}px ${this.color};
            opacity: ${opacity};
            transform: translate(-50%, -50%) scale(${scale}) rotate(${this.rotation}rad);
            pointer-events: none;
            z-index: 10;
        `;
    }

    /**
     * パーティクルが生存しているか
     * @returns {boolean}
     */
    isAlive() {
        return this.age < this.maxLife;
    }
}

// グローバルに登録
window.ParticleSystem = ParticleSystem;
