# 社内寄贈物管理システム - 技術仕様書

## 1. システムアーキテクチャ

### 1.1 全体構成
```
┌─────────────────────────────────────────────────────────────────┐
│                           Client Side                              │
├─────────────────────────────────────────────────────────────────┤
│  React SPA (TypeScript)                                           │
│  ├─ Components (Atomic Design)                                    │
│  ├─ State Management (Context API + useReducer)                  │
│  └─ Styling (CSS Modules)                                        │
├─────────────────────────────────────────────────────────────────┤
│                      Cloudflare Pages                             │
│                    (Static File Hosting)                          │
└─────────────────────────────────────────────────────────────────┘
                                │
                                │ HTTPS
                                ▼
┌─────────────────────────────────────────────────────────────────┐
│                         API Layer                                  │
├─────────────────────────────────────────────────────────────────┤
│  Cloudflare Workers (Edge Computing)                             │
│  ├─ REST API Endpoints                                           │
│  ├─ Authentication Middleware                                     │
│  ├─ Rate Limiting                                                │
│  └─ CORS Handling                                                │
└─────────────────────────────────────────────────────────────────┘
                                │
                                │ Secure Connection
                                ▼
┌─────────────────────────────────────────────────────────────────┐
│                        Data Layer                                  │
├─────────────────────────────────────────────────────────────────┤
│  Supabase                                                         │
│  ├─ PostgreSQL Database                                          │
│  ├─ Row Level Security (RLS)                                     │
│  ├─ Real-time Subscriptions                                      │
│  └─ Storage (画像ファイル)                                        │
├─────────────────────────────────────────────────────────────────┤
│  Google OAuth 2.0                                                │
│  (Authentication Provider)                                        │
└─────────────────────────────────────────────────────────────────┘
```

### 1.2 技術スタック詳細

#### フロントエンド
- **Framework**: React 18.2.0
- **Language**: TypeScript 5.0
- **Build Tool**: Vite 5.0
- **Package Manager**: yarn 1.22
- **Styling**: CSS Modules
- **HTTP Client**: Fetch API (with custom wrapper)
- **Routing**: React Router v6
- **Form Handling**: React Hook Form
- **Date Handling**: date-fns

#### バックエンド
- **Runtime**: Cloudflare Workers
- **Language**: TypeScript 5.0
- **Framework**: Hono 3.0 (軽量Web Framework)
- **Validation**: Zod
- **Database Client**: Supabase JS Client
- **Logging**: Custom Logger with Cloudflare Analytics

#### データベース
- **Database**: PostgreSQL 15 (Supabase hosted)
- **ORM**: Supabase Client (REST API)
- **Migration Tool**: Supabase Migration
- **File Storage**: Supabase Storage

#### 開発環境
- **Version Control**: Git / GitHub
- **Code Editor**: VS Code
- **Node Version**: 18.x (Volta管理)
- **Linter**: ESLint
- **Formatter**: Prettier
- **Pre-commit Hook**: Husky + lint-staged

## 2. フロントエンド設計

### 2.1 ディレクトリ構造
```
frontend/
├── src/
│   ├── components/          # UIコンポーネント
│   │   ├── atoms/          # 最小単位のコンポーネント
│   │   ├── molecules/      # 複合コンポーネント
│   │   ├── organisms/      # 大きな機能単位
│   │   └── templates/      # ページテンプレート
│   ├── pages/              # ページコンポーネント
│   ├── hooks/              # カスタムフック
│   ├── contexts/           # Context定義
│   ├── utils/              # ユーティリティ関数
│   ├── types/              # TypeScript型定義
│   ├── api/                # API通信層
│   ├── constants/          # 定数定義
│   └── styles/             # グローバルスタイル
├── public/                 # 静的ファイル
├── tests/                  # テストファイル
└── package.json
```

### 2.2 状態管理
- **グローバル状態**: Context API + useReducer
  - 認証情報
  - ユーザー設定
  - 通知
- **ローカル状態**: useState
  - フォーム入力
  - UIの開閉状態
- **サーバー状態**: Custom hooks with cache
  - 寄贈物データ
  - 検索結果

### 2.3 ルーティング設計
```typescript
const routes = [
  { path: '/', component: Dashboard },
  { path: '/login', component: Login },
  { path: '/items', component: ItemList },
  { path: '/items/:id', component: ItemDetail },
  { path: '/items/new', component: ItemCreate, protected: true },
  { path: '/items/:id/edit', component: ItemEdit, protected: true },
  { path: '/my-page', component: MyPage, protected: true },
  { path: '/admin', component: AdminDashboard, role: 'admin' },
];
```

## 3. バックエンド設計

### 3.1 API設計原則
- RESTful API設計
- JSON形式でのデータ交換
- 適切なHTTPステータスコードの使用
- ページネーション対応
- エラーレスポンスの統一化

### 3.2 ディレクトリ構造
```
backend/
├── src/
│   ├── routes/             # APIルート定義
│   ├── controllers/        # ビジネスロジック
│   ├── middlewares/        # ミドルウェア
│   ├── services/           # 外部サービス連携
│   ├── validators/         # リクエスト検証
│   ├── types/              # TypeScript型定義
│   └── utils/              # ユーティリティ
├── tests/                  # テストファイル
├── wrangler.toml          # Cloudflare Workers設定
└── package.json
```

### 3.3 認証・認可
```typescript
// 認証フロー
1. フロントエンド → Google OAuth認証画面
2. Google → 認証コード発行
3. フロントエンド → バックエンドへ認証コード送信
4. バックエンド → Googleでトークン検証
5. バックエンド → Supabaseでユーザー情報確認/作成
6. バックエンド → JWTトークン発行
7. フロントエンド → トークンをlocalStorageに保存
```

### 3.4 エラーハンドリング
```typescript
// エラーレスポンス形式
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "入力値が不正です",
    "details": [
      {
        "field": "title",
        "message": "タイトルは必須です"
      }
    ]
  }
}
```

## 4. データベース設計

### 4.1 テーブル設計概要
```sql
-- ユーザーテーブル
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(100) NOT NULL,
  role VARCHAR(20) DEFAULT 'user',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 寄贈物テーブル
CREATE TABLE donations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255) NOT NULL,
  category VARCHAR(50) NOT NULL,
  sub_category VARCHAR(50),
  donor_name VARCHAR(100),
  donated_at DATE NOT NULL,
  status VARCHAR(20) DEFAULT 'available',
  location VARCHAR(100) NOT NULL,
  created_by UUID REFERENCES users(id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 貸出履歴テーブル
CREATE TABLE lendings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  donation_id UUID REFERENCES donations(id),
  user_id UUID REFERENCES users(id),
  borrowed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  due_date DATE NOT NULL,
  returned_at TIMESTAMP,
  status VARCHAR(20) DEFAULT 'active'
);
```

### 4.2 インデックス設計
```sql
-- 検索性能向上のためのインデックス
CREATE INDEX idx_donations_category ON donations(category);
CREATE INDEX idx_donations_status ON donations(status);
CREATE INDEX idx_donations_title ON donations(title);
CREATE INDEX idx_lendings_user_id ON lendings(user_id);
CREATE INDEX idx_lendings_status ON lendings(status);
```

### 4.3 Row Level Security (RLS)
```sql
-- 一般ユーザーは自分の貸出履歴のみ参照可能
CREATE POLICY "Users can view own lendings" ON lendings
  FOR SELECT USING (auth.uid() = user_id);

-- 管理者は全データ参照可能
CREATE POLICY "Admins can view all data" ON donations
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid() AND users.role = 'admin'
    )
  );
```

## 5. セキュリティ設計

### 5.1 認証・認可
- Google OAuth 2.0による認証
- JWTトークンによるセッション管理
- Role-Based Access Control (RBAC)

### 5.2 データ保護
- HTTPS通信の強制
- Supabase RLSによるデータアクセス制御
- 個人情報の最小限化

### 5.3 脆弱性対策
- SQLインジェクション: Parameterized Queries
- XSS: React自動エスケープ + Content Security Policy
- CSRF: SameSite Cookieの使用
- Rate Limiting: Cloudflare Workers設定

## 6. パフォーマンス設計

### 6.1 フロントエンド最適化
- Code Splitting (React.lazy)
- 画像の遅延読み込み
- Service Workerによるキャッシュ
- Bundle size最適化

### 6.2 バックエンド最適化
- Edge Computingによる低レイテンシ
- データベースクエリ最適化
- 適切なインデックス設計
- キャッシュ戦略（Cloudflare Cache API）

### 6.3 画像最適化
- WebP形式への自動変換
- レスポンシブ画像の提供
- Cloudflare Image Resizing

## 7. 監視・ログ設計

### 7.1 アプリケーション監視
- Cloudflare Analytics
- エラー追跡（Sentry検討）
- パフォーマンス監視

### 7.2 ログ設計
```typescript
// ログフォーマット
{
  "timestamp": "2025-01-10T12:00:00Z",
  "level": "info",
  "service": "api",
  "userId": "xxx",
  "action": "item_borrowed",
  "details": {...}
}
```

## 8. デプロイメント

### 8.1 CI/CD パイプライン
```yaml
# GitHub Actions
name: Deploy
on:
  push:
    branches: [main, develop]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Run tests
      - name: Lint check

  deploy:
    needs: test
    steps:
      - name: Deploy to Cloudflare
```

### 8.2 環境構成
- **開発環境**: localhost
- **ステージング環境**: staging.example.com
- **本番環境**: app.example.com

## 9. 開発規約

### 9.1 コーディング規約
- TypeScript Strict Mode有効
- ESLint + Prettier設定準拠
- 関数型プログラミングを推奨

### 9.2 Git運用
- Git Flow準拠
- コミットメッセージ規約（Conventional Commits）
- PR必須 + レビュー承認後マージ

### 9.3 テスト方針
- ユニットテスト: 重要なビジネスロジック
- 統合テスト: API エンドポイント
- E2Eテスト: 重要なユーザーフロー

---

*作成日：2025年1月10日*
*更新日：2025年1月10日*