/**
 * ===== リニア新幹線背景アニメーション =====
 * Canvasを使用したリニア走行アニメーション
 */

class LinearBackground {
    constructor() {
        this.canvas = document.getElementById('linear-background');
        if (!this.canvas) return;

        this.ctx = this.canvas.getContext('2d');
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.particles = [];
        this.scrollOffset = 0;
        this.isRunning = false;

        this.resize();
        this.init();
    }

    /**
     * 初期化
     */
    init() {
        this.isRunning = true;
        this.createParticles();
        this.animate();

        window.addEventListener('resize', () => this.resize());
    }

    /**
     * キャンバスリサイズ
     */
    resize() {
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.canvas.width = this.width;
        this.canvas.height = this.height;
    }

    /**
     * 背景粒を生成
     */
    createParticles() {
        this.particles = [];
        for (let i = 0; i < 100; i++) {
            this.particles.push({
                x: Math.random() * this.width,
                y: Math.random() * this.height,
                z: Math.random() * 100,
                vx: (Math.random() - 0.5) * 2,
                vy: (Math.random() - 0.5) * 2,
                size: Math.random() * 2 + 0.5,
                opacity: Math.random() * 0.5 + 0.3
            });
        }
    }

    /**
     * アニメーションループ
     */
    animate = () => {
        if (!this.isRunning) return;

        this.ctx.clearRect(0, 0, this.width, this.height);

        // 背景グラデーション
        const gradient = this.ctx.createLinearGradient(0, 0, 0, this.height);
        gradient.addColorStop(0, 'rgba(10, 14, 39, 0.8)');
        gradient.addColorStop(0.5, 'rgba(20, 30, 60, 0.6)');
        gradient.addColorStop(1, 'rgba(10, 14, 39, 0.8)');
        this.ctx.fillStyle = gradient;
        this.ctx.fillRect(0, 0, this.width, this.height);

        // リニア走行譜線描画
        this.drawLinearTracks();

        // 背景粒描画
        this.drawParticles();

        // ネオングロー描画
        this.drawNeonGlow();

        requestAnimationFrame(this.animate);
    }

    /**
     * リニア輕道を描画
     */
    drawLinearTracks() {
        this.scrollOffset = (this.scrollOffset + 1) % (this.width * 2);

        // 上輕道
        this.ctx.strokeStyle = 'rgba(0, 255, 65, 0.15)';
        this.ctx.lineWidth = 3;
        this.ctx.beginPath();
        this.ctx.moveTo(0, this.height * 0.25);
        this.ctx.lineTo(this.width, this.height * 0.25);
        this.ctx.stroke();

        // 下輕道
        this.ctx.beginPath();
        this.ctx.moveTo(0, this.height * 0.75);
        this.ctx.lineTo(this.width, this.height * 0.75);
        this.ctx.stroke();

        // 樫筆描画
        this.ctx.strokeStyle = 'rgba(0, 212, 255, 0.2)';
        this.ctx.lineWidth = 1;
        for (let i = 0; i < 10; i++) {
            const offset = (this.scrollOffset + i * 200) % (this.width * 2);
            this.ctx.beginPath();
            this.ctx.moveTo(offset - this.width, this.height * 0.2);
            this.ctx.lineTo(offset - this.width + 100, this.height * 0.3);
            this.ctx.stroke();
        }
    }

    /**
     * 背景粒を描画
     */
    drawParticles() {
        this.particles.forEach(particle => {
            particle.x += particle.vx;
            particle.y += particle.vy;

            // 画面競痢
            if (particle.x < 0) particle.x = this.width;
            if (particle.x > this.width) particle.x = 0;
            if (particle.y < 0) particle.y = this.height;
            if (particle.y > this.height) particle.y = 0;

            const opacity = particle.opacity * (particle.z / 100);
            this.ctx.fillStyle = `rgba(0, 255, 65, ${opacity})`;
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            this.ctx.fill();
        });
    }

    /**
     * ネオングローを描画
     */
    drawNeonGlow() {
        // 中心を中学とした窄い円形
        const time = Date.now() * 0.0005;
        const scale = 1 + Math.sin(time) * 0.2;

        this.ctx.strokeStyle = 'rgba(0, 212, 255, 0.3)';
        this.ctx.lineWidth = 2;
        this.ctx.globalCompositeOperation = 'screen';

        this.ctx.beginPath();
        this.ctx.ellipse(
            this.width / 2,
            this.height / 2,
            this.width * 0.3 * scale,
            this.height * 0.2 * scale,
            0,
            0,
            Math.PI * 2
        );
        this.ctx.stroke();

        this.ctx.globalCompositeOperation = 'source-over';
    }

    /**
     * アニメーション停止
     */
    stop() {
        this.isRunning = false;
    }

    /**
     * アニメーション再開始
     */
    resume() {
        this.isRunning = true;
        this.animate();
    }
}

// グローバルに登録
window.LinearBackground = LinearBackground;
