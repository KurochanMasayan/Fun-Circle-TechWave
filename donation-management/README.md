# Donation Management System

寄付管理システムのモノレポプロジェクトです。

## プロジェクト構成

- `donation-management-front/` - React + TypeScript + Viteのフロントエンド
- `donation-management-back/` - Cloudflare Workersのバックエンド

## セットアップ

### 1. 依存関係のインストール
```bash
pnpm install
cd donation-management-front && pnpm install
cd ../donation-management-back && pnpm install
```

### 2. Supabaseプロジェクトの設定

1. [Supabase](https://supabase.com/)でプロジェクトを作成
2. プロジェクトのURL とAnon Keyを取得
3. `.env.example`を`.env`にコピーして環境変数を設定

```bash
cp .env.example donation-management-front/.env
```

### 3. OAuth プロバイダーの設定 (オプション)

Supabaseダッシュボードで以下のOAuthプロバイダーを設定：
- GitHub
- Google

### 4. 開発サーバーの起動

フロントエンド:
```bash
cd donation-management-front
pnpm dev
```

バックエンド:
```bash
cd donation-management-back
pnpm dev
```

## 環境変数

必須:
- `VITE_SUPABASE_URL` - SupabaseプロジェクトのURL
- `VITE_SUPABASE_ANON_KEY` - SupabaseのAnonymous Key

オプション:
- `VITE_GITHUB_CLIENT_ID` - GitHub OAuth Client ID
- `VITE_GOOGLE_CLIENT_ID` - Google OAuth Client ID