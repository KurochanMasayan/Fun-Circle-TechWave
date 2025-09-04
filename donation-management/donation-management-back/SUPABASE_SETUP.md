# Supabaseローカル開発環境

## 前提条件

以下がインストール・起動されていることを確認してください：

- **Node.js** (v18以上)
- **pnpm** (`npm install -g pnpm`)
- **Docker Desktop** (ローカルSupabaseに必要) - **必ず起動しておく**

## 基本セットアップ

### 1. プロジェクトのクローンと依存関係インストール

```bash
# プロジェクトをクローン
git clone <repository-url>
cd donation-management/donation-management-back

# 依存関係をインストール
pnpm install
```

### 2. ローカル開発を開始

```bash
pnpm dev:local
```

**初回実行時の自動処理**：
- Supabase CLIの自動ダウンロード（初回のみ）
- ローカルSupabaseのDockerコンテナ起動
- 必要なサービス群の起動
- Cloudflare Workers開発サーバーの起動

**アクセス可能なURL**：
- ローカルSupabase Studio: http://localhost:54323
- API開発サーバー: http://localhost:8787
- ローカルSupabase API: http://localhost:54321

### 3. 動作確認

1. ブラウザで `http://localhost:8787/` にアクセス
2. Swagger UIでAPIエンドポイントをテスト

### 4. テーブル作成（初回のみ）

ローカルSupabaseでテーブルを作成します：

1. **http://localhost:54323** にアクセス（Supabase Studio）
2. 「SQL Editor」を開く
3. 以下のSQLを実行：

```sql
CREATE TABLE tasks (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  description TEXT,
  completed BOOLEAN DEFAULT FALSE,
  due_date DATE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### 5. その他のコマンド

```bash
# ローカルSupabaseを停止
pnpm supabase:stop

# ローカルSupabaseの状態確認
pnpm supabase:status
```

## 本番環境での開発

本番Supabaseに接続する場合：

1. `.dev.vars.example` を `.dev.vars` にコピー
2. 実際のSupabaseプロジェクトのURLとAPIキーを設定
3. `pnpm dev` で開発サーバーを起動

## トラブルシューティング

### Docker関連エラー

```bash
# Docker Desktopが起動していない場合
Error: Docker is not running

# 解決方法：Docker Desktopを起動してから再実行
pnpm dev:local
```

### ポート競合エラー

```bash
# ポート54321が使用中の場合
Error: Port 54321 is already in use

# 解決方法：既存のSupabaseを停止
pnpm supabase:stop
# または他のサービスを停止してから再実行
```

## 本番デプロイ

```bash
# 環境変数を設定
wrangler secret put SUPABASE_URL
wrangler secret put SUPABASE_ANON_KEY

# デプロイ
pnpm deploy
``` 