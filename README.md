# Your Time Clone

あなたの時間を可視化し、大切にするためのアプリケーション。「Your Time」のクローンプロジェクトです。
人生の残り時間を計算し、モチベーションを高める名言と共に表示します。

## 機能

- **人生のカウントダウン**: 生年月日と平均寿命を設定することで、残された時間をリアルタイムで表示します。
- **人生の統計**: 経過日数、残り日数、人生の進捗率（%）を統計カードとして表示します。
- **名言管理**: 自分を鼓舞する名言を登録・管理（追加・削除）できます。
- **名言表示**: 登録した名言の中から、現在のお気に入りを選択してホーム画面に表示できます。長い名言も美しく表示されます。
- 選択機能: お気に入りの名言を一つ選択してトップに固定表示。
- 閲覧機能: 登録済み名言を順に閲覧可能。
- **ダークモード対応**: システム設定または手動切り替えによるライト/ダークモードに対応。美しいグラデーションとグラスモーフィズムデザインを採用。
- **PWA対応**: モバイルデバイスでホーム画面に追加し、ネイティブアプリのように使用可能。

## 技術スタック

- **Framework**: [Next.js 15+](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) (v4), CSS Modules
- **Icons**: [Lucide React](https://lucide.dev/)
- **PWA**: [next-pwa](https://github.com/shadowwalker/next-pwa)

## セットアップ手順

### 必要要件

- Node.js 18.17.0 以上
- npm または yarn, pnpm, bun

### インストール

1.  リポジトリをクローンします:

    ```bash
    git clone <repository-url>
    cd your-time-clone
    ```

2.  依存関係をインストールします:
    ```bash
    npm install
    # または yarn install, pnpm install, bun install
    ```

### 開発サーバーの起動

以下のコマンドで開発サーバーを起動します:

```bash
npm run dev
```

ブラウザで [http://localhost:3000](http://localhost:3000) にアクセスしてアプリを確認します。

### ビルドと実行

本番用にビルドして実行するには:

```bash
npm run build
npm start
```

## プロジェクト構造

- `src/app`: アプリケーションのページとレイアウト (Next.js App Router)
  - `src/app/quotes`: 名言管理ページ
- `src/components`: 再利用可能なUIコンポーネント (InputForm, ProgressBar, QuoteDisplayなど)
- `src/utils`: ユーティリティ関数 (時間計算ロジック、LocalStorage操作など)
- `src/data`: ローカルデータ（名言ライブラリなど）
- `public`: 静的アセット (アイコン、マニフェストなど)

## ローカル名言ライブラリ（AIより優先）

`/api/generate-quote` は、まず `src/data/quoteLibrary.ts` を検索し、見つからなければAI（Gemini）にフォールバックします。

- 人物名で探す: `author` / `aliases` に部分一致・表記ゆれ一致するとヒットします
- テーマで探す: `tags` に一致するとヒットします

## ライセンス

MIT License
