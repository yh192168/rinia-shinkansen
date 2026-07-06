# リニア新幹線クイズゲーム - 完全リニューアル版

ゲーム会社レベルのデザインを備えた、インタラクティブなリニア新幹線クイズゲームです。

## 🎮 主な機能

### ゲーム機能
- **高速クイズゲーム**: リニア新幹線に関する20問のクイズ
- **リアルタイムランキング**: 全プレイヤーの成績を自動更新
- **デモモード**: 店舗用デモンストレーション表示
- **タイムアタック**: 制限時間演出で緊張感を演出

### 出力機能
- **Brother QL-800対応**: 高精度印刷プレビュー
- **印刷プレビュー**: 印刷前にデザイン確認
- **回転90度対応**: ラベルプリンタ用に最適化

### ネットワーク機能
- **QRコード参加**: 携帯デバイスからの参加対応
- **別Wi-Fi対応**: Cloudflare Tunnel経由での接続
- **リアルタイム同期**: WebSocket によるランキング更新

### 管理機能
- **管理画面**: ゲーム設定・ランキング管理
- **ユーザー管理**: 参加者情報の管理
- **集計機能**: 成績の一括集計・エクスポート

## 🎨 デザイン特性

- **60fps アニメーション**: スムーズな視覚体験
- **ネオンエフェクト**: 近未来的なUI
- **パーティクルシステム**: 動的な視覚演出
- **リニア背景**: 走行するリニア新幹線の背景
- **レスポンシブデザイン**: 全デバイス対応
- **タッチパネル最適化**: モバイルフレンドリー
- **フルスクリーン対応**: キオスク画面向け

## 📋 ファイル構成

```
linear_quiz_html_print_rotated90/
├── client/                      # フロントエンド
│   ├── index.html              # メインゲーム画面
│   ├── admin.html              # 管理画面
│   ├── display.html            # ランキング表示画面
│   ├── preview.html            # 印刷プレビュー
│   ├── css/
│   │   ├── style.css           # メインスタイル
│   │   ├── animations.css      # アニメーション
│   │   ├── admin.css           # 管理画面スタイル
│   │   ├── responsive.css      # レスポンシブ
│   │   └── theme.css           # テーマ・カラー
│   ├── js/
│   │   ├── main.js             # メインゲーム
│   │   ├── game.js             # ゲームロジック
│   │   ├── ranking.js          # ランキング管理
│   │   ├── printer.js          # プリンタ制御
│   │   ├── animation.js        # アニメーション
│   │   ├── particles.js        # パーティクル
│   │   ├── qrcode.js           # QRコード生成
│   │   ├── admin.js            # 管理画面ロジック
│   │   ├── api.js              # API通信
│   │   └── utils.js            # ユーティリティ
│   └── audio/
│       ├── bgm.mp3             # BGM
│       ├── correct.mp3         # 正解音
│       ├── incorrect.mp3       # 不正解音
│       ├── print.mp3           # 印刷音
│       └── countdown.mp3       # カウントダウン音
├── server/                      # バックエンド
│   ├── app.py                  # Flask アプリケーション
│   ├── config.py               # 設定
│   ├── database.py             # データベース管理
│   ├── api.py                  # API エンドポイント
│   ├── printer.py              # プリンタ制御
│   ├── ranking.py              # ランキング管理
│   ├── auth.py                 # 認証
│   ├── cloudflare.py           # Cloudflare Tunnel 対応
│   ├── requirements.txt        # Python 依存
│   └── data/
│       ├── questions.json      # クイズ問題
│       ├── users.db            # ユーザーDB
│       └── rankings.db         # ランキングDB
├── common/                      # 共通
│   ├── constants.py            # 定数
│   └── models.py               # データモデル
└── requirements.txt             # 全依存関係
```

## 🚀 セットアップ

### 必要な環境
- Python 3.8+
- Node.js 14+ (オプション)
- Brother QL-800 プリンタ
- 対応ブラウザ (Chrome/Edge/Firefox)

### インストール

```bash
# リポジトリをクローン
git clone https://github.com/yh192168/rinia-shinkansen.git
cd linear_quiz_html_print_rotated90

# サーバーセットアップ
cd server
pip install -r requirements.txt

# クライアント実行 (簡易サーバー)
python -m http.server 8000 --directory ../client
```

### 起動

```bash
# サーバー起動
cd server
python app.py

# ブラウザでアクセス
http://localhost:5000
```

## 🎯 使用方法

### ゲーム画面
1. **START** ボタンをタッチ
2. 20問のクイズに回答 (各問10秒)
3. 成績が自動的にランキングに登録
4. 高スコアで印刷チケット獲得

### 印刷方法
1. ゲーム終了後に「PRINT」ボタン表示
2. プレビューで確認
3. Brother QL-800 で印刷実行

### 管理画面
- URL: `/admin.html`
- ランキング表示・削除
- ゲーム設定変更
- ユーザー管理

## 🔧 カスタマイズ

### クイズ問題変更
`server/data/questions.json` を編集:

```json
{
  "questions": [
    {
      "id": 1,
      "text": "リニア新幹線の最高速度は?",
      "options": ["500km/h", "603km/h", "700km/h", "800km/h"],
      "correct": 1
    }
  ]
}
```

### スタイルカスタマイズ
`client/css/theme.css` でテーマカラー変更:

```css
:root {
  --neon-primary: #00ff41;
  --neon-secondary: #00d4ff;
  --bg-dark: #0a0e27;
}
```

## 📱 対応デバイス

- **デスクトップ**: Chrome/Edge/Firefox
- **タブレット**: iPad/Android タブレット
- **タッチパネル**: 10点以上マルチタッチ
- **キオスク**: フルスクリーンモード

## 🖨️ プリンタ設定

### Brother QL-800
```
- 用紙サイズ: 62mm × 100mm
- DPI: 300 (推奨)
- ドライバ: 最新版をインストール
```

### ドライバインストール
```bash
# Windows
# https://download.brother.com/welcome/dlf103393

# macOS
# https://download.brother.com/welcome/dlf006703

# Linux
# sudo apt-get install brother-lpr-drivers-ql800
```

## 🌐 Cloudflare Tunnel 設定

```bash
# cloudflared インストール
# https://developers.cloudflare.com/cloudflare-one/connections/connect-apps/install-and-setup/installation/

# トンネル作成
cloudflared tunnel create rinia-game

# 設定ファイル (~/.cloudflared/config.yml)
tunnel: rinia-game
credentials-file: /root/.cloudflared/<tunnel-id>.json

ingress:
  - hostname: game.example.com
    service: http://localhost:5000
  - service: http_status:404
```

## 📊 API エンドポイント

### ゲーム
- `POST /api/game/start` - ゲーム開始
- `POST /api/game/answer` - 回答送信
- `POST /api/game/finish` - ゲーム終了

### ランキング
- `GET /api/ranking/list` - ランキング一覧
- `POST /api/ranking/add` - ランキング追加
- `DELETE /api/ranking/:id` - ランキング削除

### 印刷
- `POST /api/print/preview` - プレビュー生成
- `POST /api/print/execute` - 印刷実行

### 管理
- `GET /api/admin/stats` - 統計情報
- `POST /api/admin/config` - 設定変更

## 🎵 音声資源

- **BGM**: ループ可能な背景音楽 (ロイヤリティフリー)
- **効果音**: 正解・不正解・印刷などの効果音

## 🐛 トラブルシューティング

### プリンタが認識されない
```bash
# ドライバ確認
lpstat -p

# ポート設定
usb_modeswitch -v 0x04f9 -p 2035 -V 0x04f9 -P 2036 -c 1
```

### ゲームが起動しない
1. コンソール確認 (F12 -> Console)
2. サーバーログ確認
3. ファイアウォール設定確認

### ランキングが更新されない
1. データベース接続確認
2. CORS 設定確認
3. WebSocket 接続確認

## 📝 ライセンス

このプロジェクトはMITライセンスの下で公開されています。

## 👨‍💻 開発者

- **リニア新幹線クイズゲーム** - 完全リニューアル版
- 最終更新: 2026年7月

## 🤝 貢献

プルリクエストを歓迎します。大きな変更の場合は、まずissueを開いて変更内容を説明してください。

---

**注意**: このゲームは教育・エンターテインメント目的です。正確な情報を確認してください。
