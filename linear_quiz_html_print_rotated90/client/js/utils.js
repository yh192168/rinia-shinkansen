/**
 * ===== ユーティリティ関数群 =====
 * 共通の補助機能を提供するモジュール
 */

const Utils = {
    /**
     * 指定範囲のランダム数値を取得
     * @param {number} min - 最小値
     * @param {number} max - 最大値
     * @returns {number} ランダム数値
     */
    random: (min, max) => {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    },

    /**
     * 配列をシャッフル（Fisher-Yates）
     * @param {Array} arr - シャッフル対象配列
     * @returns {Array} シャッフル済み配列
     */
    shuffle: (arr) => {
        const shuffled = [...arr];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    },

    /**
     * 時間フォーマット（MM:SS）
     * @param {number} seconds - 秒数
     * @returns {string} フォーマット済み時間
     */
    formatTime: (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    },

    /**
     * 日時フォーマット
     * @param {Date} date - 日時オブジェクト
     * @returns {string} フォーマット済み日時
     */
    formatDate: (date) => {
        return new Date(date).toLocaleString('ja-JP', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });
    },

    /**
     * ローカルストレージに保存
     * @param {string} key - キー
     * @param {*} value - 値
     */
    setStorage: (key, value) => {
        try {
            localStorage.setItem(key, JSON.stringify(value));
        } catch (error) {
            console.error('ストレージ保存エラー:', error);
        }
    },

    /**
     * ローカルストレージから取得
     * @param {string} key - キー
     * @param {*} defaultValue - デフォルト値
     * @returns {*} 取得値
     */
    getStorage: (key, defaultValue = null) => {
        try {
            const value = localStorage.getItem(key);
            return value ? JSON.parse(value) : defaultValue;
        } catch (error) {
            console.error('ストレージ読み込みエラー:', error);
            return defaultValue;
        }
    },

    /**
     * セッションストレージに保存
     * @param {string} key - キー
     * @param {*} value - 値
     */
    setSession: (key, value) => {
        try {
            sessionStorage.setItem(key, JSON.stringify(value));
        } catch (error) {
            console.error('セッション保存エラー:', error);
        }
    },

    /**
     * セッションストレージから取得
     * @param {string} key - キー
     * @param {*} defaultValue - デフォルト値
     * @returns {*} 取得値
     */
    getSession: (key, defaultValue = null) => {
        try {
            const value = sessionStorage.getItem(key);
            return value ? JSON.parse(value) : defaultValue;
        } catch (error) {
            console.error('セッション読み込みエラー:', error);
            return defaultValue;
        }
    },

    /**
     * クエリパラメータを解析
     * @param {string} param - パラメータ名
     * @returns {string|null} パラメータ値
     */
    getQueryParam: (param) => {
        const params = new URLSearchParams(window.location.search);
        return params.get(param);
    },

    /**
     * 遅延実行
     * @param {number} ms - ミリ秒
     * @returns {Promise} 遅延Promise
     */
    delay: (ms) => new Promise(resolve => setTimeout(resolve, ms)),

    /**
     * デバイスがタッチ対応かチェック
     * @returns {boolean}
     */
    isTouchDevice: () => {
        return (
            (typeof window !== 'undefined' && 'ontouchstart' in window) ||
            (typeof navigator !== 'undefined' && navigator.maxTouchPoints > 0)
        );
    },

    /**
     * フルスクリーン開始
     */
    requestFullscreen: async () => {
        try {
            const elem = document.documentElement;
            if (elem.requestFullscreen) {
                await elem.requestFullscreen();
            } else if (elem.webkitRequestFullscreen) {
                await elem.webkitRequestFullscreen();
            } else if (elem.msRequestFullscreen) {
                await elem.msRequestFullscreen();
            }
        } catch (error) {
            console.error('フルスクリーン要求エラー:', error);
        }
    },

    /**
     * フルスクリーン終了
     */
    exitFullscreen: async () => {
        try {
            if (document.fullscreenElement) {
                await document.exitFullscreen();
            } else if (document.webkitFullscreenElement) {
                await document.webkitExitFullscreen();
            }
        } catch (error) {
            console.error('フルスクリーン終了エラー:', error);
        }
    },

    /**
     * ブラウザのバイブレーション機能
     * @param {number|Array} pattern - バイブレーションパターン(ms)
     */
    vibrate: (pattern = 50) => {
        if ('vibrate' in navigator) {
            navigator.vibrate(pattern);
        }
    },

    /**
     * スクリーンショットを撮影
     * @returns {Promise<Canvas>}
     */
    captureScreen: async () => {
        try {
            const canvas = await html2canvas(document.body);
            return canvas;
        } catch (error) {
            console.error('スクリーンショット撮影エラー:', error);
            return null;
        }
    },

    /**
     * ブラウザ情報を取得
     * @returns {Object} ブラウザ情報
     */
    getBrowserInfo: () => {
        const ua = navigator.userAgent;
        return {
            isMobile: /Mobile|Android|iPhone/.test(ua),
            isTablet: /Tablet|iPad|Android/.test(ua),
            isChrome: /Chrome/.test(ua),
            isFirefox: /Firefox/.test(ua),
            isSafari: /Safari/.test(ua),
            isEdge: /Edge/.test(ua),
            userAgent: ua
        };
    },

    /**
     * カラーコード生成
     * @returns {string} ランダムカラーコード
     */
    randomColor: () => {
        return '#' + Math.floor(Math.random() * 16777215).toString(16);
    },

    /**
     * スコア計算
     * @param {number} correct - 正解数
     * @param {number} total - 総問題数
     * @param {number} timeRemaining - 残り時間
     * @returns {number} スコア
     */
    calculateScore: (correct, total, timeRemaining = 0) => {
        const baseScore = Math.round((correct / total) * 100);
        const timeBonus = Math.max(0, Math.floor(timeRemaining / 10));
        return baseScore + timeBonus;
    },

    /**
     * ログ出力（開発モードのみ）
     * @param {string} message - メッセージ
     * @param {*} data - データ
     */
    log: (message, data = '') => {
        if (typeof console !== 'undefined') {
            console.log(`[Game] ${message}`, data);
        }
    },

    /**
     * エラーログ
     * @param {string} message - メッセージ
     * @param {Error} error - エラーオブジェクト
     */
    error: (message, error = '') => {
        if (typeof console !== 'undefined') {
            console.error(`[Error] ${message}`, error);
        }
    },

    /**
     * DOM要素の取得
     * @param {string} selector - セレクタ
     * @returns {HTMLElement|null}
     */
    get: (selector) => document.querySelector(selector),

    /**
     * DOM要素の複数取得
     * @param {string} selector - セレクタ
     * @returns {NodeList}
     */
    getAll: (selector) => document.querySelectorAll(selector),

    /**
     * クラス追加
     * @param {HTMLElement} el - 要素
     * @param {string} className - クラス名
     */
    addClass: (el, className) => {
        if (el) el.classList.add(className);
    },

    /**
     * クラス削除
     * @param {HTMLElement} el - 要素
     * @param {string} className - クラス名
     */
    removeClass: (el, className) => {
        if (el) el.classList.remove(className);
    },

    /**
     * クラストグル
     * @param {HTMLElement} el - 要素
     * @param {string} className - クラス名
     */
    toggleClass: (el, className) => {
        if (el) el.classList.toggle(className);
    },

    /**
     * テキスト設定
     * @param {HTMLElement} el - 要素
     * @param {string} text - テキスト
     */
    setText: (el, text) => {
        if (el) el.textContent = text;
    },

    /**
     * HTML設定
     * @param {HTMLElement} el - 要素
     * @param {string} html - HTML
     */
    setHTML: (el, html) => {
        if (el) el.innerHTML = html;
    }
};

// グローバルに登録
window.Utils = Utils;
