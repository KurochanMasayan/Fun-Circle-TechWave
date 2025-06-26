# Donation Management セットアップ進捗

## 完了したタスク ✅

### 1. プロジェクト構造の確認とブランチ名の変更
- ブランチ名を `auth-settings` から `setup-environment` に変更

### 2. Supabase の初期設定
- Supabase関連パッケージをインストール
  - `@supabase/supabase-js`
  - `@supabase/auth-ui-react`
  - `@supabase/auth-ui-shared`
- Supabaseクライアントの設定ファイルを作成 (`src/lib/supabase.ts`)

### 3. OAuth認証の設定
- 認証コンポーネントを作成 (`src/components/Auth.tsx`)
- GitHub と Google OAuth に対応した認証UIを実装
- App.tsx を認証機能付きに更新（ログイン/ログアウト機能）

### 4. 環境変数ファイルの設定
- `.env.example` ファイルを作成（テンプレート）
- `.env` ファイルを作成（実際の環境変数用）

### 5. Git設定の確認と調整
- `.gitignore` ファイルを作成
- `README.md` を作成してプロジェクトの説明とセットアップ手順を記載

## 今後のタスク 📋

### 1. Supabaseプロジェクトの作成
1. [Supabase](https://supabase.com/) にアクセス
2. 新しいプロジェクトを作成
3. プロジェクトの URL と Anon Key を取得

### 2. 環境変数の設定
`donation-management-front/.env` ファイルに以下の値を設定：
```
VITE_SUPABASE_URL=取得したSupabaseプロジェクトURL
VITE_SUPABASE_ANON_KEY=取得したSupabase Anon Key
```

### 3. OAuth プロバイダーの設定（オプション）
Supabaseダッシュボードで以下を設定：
- **GitHub OAuth**
  1. Authentication > Providers > GitHub を有効化
  2. GitHub でOAuth Appを作成し、Client ID/Secretを取得
  3. Callback URL: `https://yourproject.supabase.co/auth/v1/callback`
  
- **Google OAuth**
  1. Authentication > Providers > Google を有効化
  2. Google Cloud Console でOAuth 2.0クライアントIDを作成
  3. 認証済みリダイレクトURIを設定

### 4. データベースの設計とテーブル作成
寄付管理に必要なテーブルを作成：
- `donations` - 寄付記録
- `donors` - 寄付者情報
- `campaigns` - 寄付キャンペーン
など

### 5. アプリケーションの起動と動作確認
```bash
cd donation-management-front
pnpm dev
```
- http://localhost:5173 でアプリケーションにアクセス
- ログイン機能が正常に動作することを確認

### 6. バックエンドAPIの実装
`donation-management-back` でCloudflare Workers APIを実装：
- 寄付の作成・更新・削除
- 統計情報の取得
- レポート生成

## 参考リンク
- [Supabase ドキュメント](https://supabase.com/docs)
- [Supabase Auth UI](https://supabase.com/docs/guides/auth/auth-helpers/auth-ui)
- [Cloudflare Workers](https://developers.cloudflare.com/workers/)