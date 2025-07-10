# CLAUDE.md - プロジェクト開発ガイドライン

このファイルは、Claude AIがこのプロジェクトで作業する際の重要なガイドラインとコンテキストを提供します。

## プロジェクト概要

**プロジェクト名**: 社内寄贈物管理システム (Fun-Circle-TechWave)

**目的**: 社内に寄贈された書籍・備品を効率的に管理し、社員間での共有・活用を促進するWebアプリケーション

## 技術スタック

- **フロントエンド**: React 19 + TypeScript (Vite)
- **バックエンド**: Cloudflare Workers + Hono
- **データベース**: Supabase (PostgreSQL)
- **認証**: Google OAuth (Supabase Auth)
- **デプロイ**: Cloudflare Pages (Frontend), Cloudflare Workers (Backend)

## Git運用ルール

### 🚨 重要: ブランチ保護ルール

**mainブランチへの直接プッシュは禁止されています。**

すべての変更は以下のフローに従ってください：

1. **必ず機能ブランチを作成する**
   ```bash
   git checkout -b feature/機能名
   git checkout -b fix/バグ修正名
   git checkout -b docs/ドキュメント名
   ```

2. **変更をコミット**
   ```bash
   git add .
   git commit -m "type: 説明"
   ```

3. **ブランチをプッシュ**
   ```bash
   git push -u origin feature/機能名
   ```

4. **プルリクエストを作成**
   ```bash
   gh pr create --title "タイトル" --body "説明"
   ```

5. **レビュー後にマージ**
   - 最低1名のレビュー承認が必要
   - CIチェックがすべてパスしている必要がある

### ブランチ命名規則

- `feature/` - 新機能開発
- `fix/` - バグ修正
- `docs/` - ドキュメント更新
- `refactor/` - リファクタリング
- `test/` - テスト追加・修正
- `chore/` - ビルド設定等の変更

### コミットメッセージ規約

Conventional Commitsに従う：
- `feat:` 新機能
- `fix:` バグ修正
- `docs:` ドキュメント
- `style:` フォーマット修正
- `refactor:` リファクタリング
- `test:` テスト
- `chore:` その他の変更

## 開発フロー

1. **Issue作成** - 作業内容を明確にする
2. **ブランチ作成** - mainから最新を取得して作成
3. **開発** - 小さな単位でコミット
4. **テスト** - ユニットテスト・統合テストを実行
5. **PR作成** - レビュー依頼
6. **マージ** - 承認後、Squash and mergeでマージ

## コーディング規約

### TypeScript
- strictモード有効
- 明示的な型定義を推奨
- any型の使用禁止

### React
- 関数コンポーネントのみ使用
- カスタムフックでロジックを分離
- メモ化は必要な箇所のみ

### スタイリング
- CSS Modules使用
- BEM命名規則準拠
- レスポンシブデザイン必須

## テスト要件

- 新機能には必ずテストを追加
- カバレッジ70%以上を維持
- E2Eテストは重要なユーザーフローのみ

## セキュリティ

- 環境変数に機密情報を格納
- .envファイルはGitにコミットしない
- SQLインジェクション対策必須
- XSS対策（Reactの自動エスケープを活用）

## パフォーマンス

- Lighthouse Score 90以上を目標
- 画像は適切に最適化
- 遅延読み込みを活用
- バンドルサイズを監視

## デプロイ

### ステージング環境
- developブランチから自動デプロイ
- URL: https://staging.donation-management.example.com

### 本番環境
- mainブランチから手動デプロイ
- URL: https://donation-management.example.com

## チーム構成

- **黒谷**: フロントエンドリーダー
- **工藤**: バックエンドリーダー・技術統括
- **福元**: バックエンドサポート
- **杉田**: データベース設計リーダー
- **鷹木**: データ分析・PM補佐

## よく使うコマンド

```bash
# 開発サーバー起動
yarn dev

# テスト実行
yarn test

# ビルド
yarn build

# リント実行
yarn lint

# 型チェック
yarn typecheck

# Supabase型生成
yarn supabase:types
```

## トラブルシューティング

### node_modulesの問題
```bash
rm -rf node_modules yarn.lock
yarn install
```

### Git関連の問題
```bash
# ブランチを最新に更新
git checkout main
git pull origin main
git checkout feature/your-branch
git rebase main
```

## AIアシスタントへの指示

1. **必ずブランチを作成してから作業を開始する**
2. **mainブランチへの直接コミットは絶対に行わない**
3. **PRを作成してレビューを依頼する**
4. **テストを実行してから変更をプッシュする**
5. **環境変数や機密情報をコードに含めない**

---

最終更新: 2025年1月10日