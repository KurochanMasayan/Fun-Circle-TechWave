# 社内寄贈物管理システム - 開発ガイドライン

## 1. 開発環境セットアップ

### 1.1 必要なツール
- **Node.js**: v18.x（Voltaで管理）
- **Yarn**: v1.22.x
- **Git**: v2.30以上
- **VS Code**: 最新版
- **Cloudflare CLI (Wrangler)**: v3.x

### 1.2 推奨VS Code拡張機能
```json
{
  "recommendations": [
    "dbaeumer.vscode-eslint",
    "esbenp.prettier-vscode",
    "ms-vscode.vscode-typescript-tsc",
    "bradlc.vscode-tailwindcss",
    "eamodio.gitlens",
    "usernamehw.errorlens",
    "yoavbls.pretty-ts-errors"
  ]
}
```

### 1.3 初期セットアップ手順
```bash
# リポジトリのクローン
git clone https://github.com/your-org/donation-management.git
cd donation-management

# Voltaのインストール（未インストールの場合）
curl https://get.volta.sh | bash

# Node.jsバージョンの固定
volta pin node@18
volta pin yarn@1.22

# 依存関係のインストール
yarn install

# 環境変数の設定
cp .env.example .env.local
# .env.localを編集して必要な値を設定

# 開発サーバーの起動
yarn dev
```

## 2. コーディング規約

### 2.1 TypeScript
```typescript
// ✅ Good: 明示的な型定義
interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin' | 'system';
}

// ❌ Bad: any型の使用
const data: any = fetchData();

// ✅ Good: Null合体演算子の使用
const name = user.name ?? 'ゲスト';

// ✅ Good: Optional Chainingの使用
const department = user?.profile?.department;

// ✅ Good: 関数の型定義
type GetUserById = (id: string) => Promise<User | null>;

// ✅ Good: Enumの代わりにconst assertionを使用
const UserRole = {
  USER: 'user',
  ADMIN: 'admin',
  SYSTEM: 'system'
} as const;

type UserRole = typeof UserRole[keyof typeof UserRole];
```

### 2.2 React
```tsx
// ✅ Good: 関数コンポーネント + TypeScript
interface ButtonProps {
  variant?: 'primary' | 'secondary';
  size?: 'small' | 'medium' | 'large';
  onClick?: () => void;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'medium',
  onClick,
  children
}) => {
  return (
    <button
      className={`btn btn-${variant} btn-${size}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

// ✅ Good: カスタムフックの命名
const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  // ...
  return { user, login, logout };
};

// ✅ Good: エラーバウンダリの実装
class ErrorBoundary extends React.Component {
  // ...
}
```

### 2.3 命名規則
```typescript
// ファイル名
UserProfile.tsx        // Reactコンポーネント
useAuth.ts            // カスタムフック
userService.ts        // サービスクラス
types.ts              // 型定義
constants.ts          // 定数
utils.ts              // ユーティリティ関数

// 変数・関数名
const userName = 'John';              // camelCase
const MAX_RETRY_COUNT = 3;           // UPPER_SNAKE_CASE（定数）
function calculateTotal() {}         // camelCase

// クラス・インターフェース名
class UserService {}                 // PascalCase
interface UserData {}                // PascalCase
type UserRole = 'admin' | 'user';   // PascalCase

// Reactコンポーネント
const UserProfile = () => {};        // PascalCase
```

### 2.4 CSS/スタイリング
```css
/* CSS Modules使用 */
.container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.button {
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
  transition: background-color 0.2s ease;
}

.button:hover {
  background-color: var(--primary-dark);
}

/* BEM命名規則 */
.card {}
.card__header {}
.card__body {}
.card__footer {}
.card--featured {}
```

## 3. Git運用

### 3.1 ブランチ戦略
```
main
├── develop
│   ├── feature/add-user-auth
│   ├── feature/implement-lending
│   └── feature/update-ui
├── release/v1.0.0
└── hotfix/fix-login-bug
```

### 3.2 コミットメッセージ
```bash
# フォーマット: <type>: <subject>

feat: 寄贈物登録機能を追加
fix: ログイン時のエラーを修正
docs: READMEを更新
style: コードフォーマットを修正
refactor: 認証ロジックをリファクタリング
test: ユーザーサービスのテストを追加
chore: 依存関係を更新

# 詳細な説明が必要な場合
feat: 寄贈物登録機能を追加

- 管理者による寄贈物の新規登録
- 画像アップロード機能（最大3枚）
- 入力値のバリデーション
```

### 3.3 プルリクエスト
```markdown
## 概要
寄贈物登録機能を実装しました。

## 変更内容
- [ ] 寄贈物登録フォームの作成
- [ ] API エンドポイントの実装
- [ ] 画像アップロード機能
- [ ] バリデーション処理

## テスト
- [ ] ユニットテスト追加
- [ ] 手動テスト完了

## スクリーンショット
[画面キャプチャを添付]

## レビューポイント
- バリデーションロジックの妥当性
- エラーハンドリングの実装
```

## 4. テスト

### 4.1 テスト方針
- **カバレッジ目標**: 70%以上
- **テスト対象**: ビジネスロジック、API、重要なコンポーネント
- **テストツール**: Jest, React Testing Library

### 4.2 テストの書き方
```typescript
// ユニットテスト例
describe('UserService', () => {
  describe('getUserById', () => {
    it('should return user when valid id is provided', async () => {
      const user = await userService.getUserById('123');
      expect(user).toEqual({
        id: '123',
        name: 'John Doe',
        email: 'john@example.com'
      });
    });

    it('should return null when user not found', async () => {
      const user = await userService.getUserById('999');
      expect(user).toBeNull();
    });
  });
});

// Reactコンポーネントテスト例
describe('Button', () => {
  it('should render with correct text', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('should call onClick when clicked', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click</Button>);
    fireEvent.click(screen.getByText('Click'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
```

## 5. セキュリティ

### 5.1 基本原則
- 最小権限の原則
- 入力値の検証とサニタイゼーション
- セキュアなデフォルト設定

### 5.2 実装ガイドライン
```typescript
// ✅ Good: 入力値の検証
const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// ✅ Good: SQLインジェクション対策（Supabase使用）
const { data, error } = await supabase
  .from('donations')
  .select('*')
  .eq('id', donationId); // パラメータ化されたクエリ

// ❌ Bad: 直接的なHTML挿入
element.innerHTML = userInput; // XSS脆弱性

// ✅ Good: Reactの自動エスケープ
return <div>{userInput}</div>;

// ✅ Good: 環境変数の適切な管理
const apiKey = process.env.SUPABASE_ANON_KEY;
// .envファイルはGitにコミットしない
```

## 6. パフォーマンス

### 6.1 フロントエンド最適化
```typescript
// ✅ Good: 遅延読み込み
const AdminPanel = lazy(() => import('./AdminPanel'));

// ✅ Good: メモ化
const MemoizedComponent = memo(ExpensiveComponent);

// ✅ Good: useMemoの適切な使用
const expensiveValue = useMemo(() => {
  return calculateExpensiveValue(data);
}, [data]);

// ✅ Good: useCallbackの適切な使用
const handleClick = useCallback(() => {
  doSomething(id);
}, [id]);
```

### 6.2 API最適化
```typescript
// ✅ Good: ページネーション
const { data, error } = await supabase
  .from('donations')
  .select('*')
  .range(0, 19); // 20件ずつ取得

// ✅ Good: 必要なフィールドのみ取得
const { data } = await supabase
  .from('donations')
  .select('id, title, status');

// ✅ Good: バッチ処理
const promises = ids.map(id => fetchData(id));
const results = await Promise.all(promises);
```

## 7. エラーハンドリング

### 7.1 エラー処理パターン
```typescript
// API呼び出し
try {
  const response = await fetch('/api/donations');
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const data = await response.json();
  return data;
} catch (error) {
  console.error('Failed to fetch donations:', error);
  // ユーザーへの通知
  showErrorNotification('寄贈物の取得に失敗しました');
  // エラートラッキング（Sentry等）
  captureException(error);
}

// Reactコンポーネント
const DonationList = () => {
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState(true);

  if (error) {
    return <ErrorMessage error={error} />;
  }

  if (loading) {
    return <LoadingSpinner />;
  }

  return <div>{/* コンテンツ */}</div>;
};
```

## 8. ドキュメンテーション

### 8.1 コードコメント
```typescript
/**
 * 寄贈物を検索します
 * @param query - 検索クエリ
 * @param filters - フィルター条件
 * @returns 検索結果の寄贈物リスト
 */
async function searchDonations(
  query: string,
  filters?: SearchFilters
): Promise<Donation[]> {
  // 実装
}

// TODO: キャッシュ機能を実装
// FIXME: エラーハンドリングを改善
// NOTE: この処理は重いので、将来的に最適化が必要
```

### 8.2 ドキュメント作成
- README.md: プロジェクト概要、セットアップ手順
- CONTRIBUTING.md: 貢献方法、開発ルール
- API.md: APIエンドポイントの仕様
- CHANGELOG.md: 変更履歴

## 9. デプロイメント

### 9.1 環境別設定
```typescript
// 環境変数の管理
const config = {
  apiUrl: process.env.REACT_APP_API_URL,
  supabaseUrl: process.env.REACT_APP_SUPABASE_URL,
  supabaseAnonKey: process.env.REACT_APP_SUPABASE_ANON_KEY,
};

// 環境別の設定ファイル
// .env.development
// .env.staging  
// .env.production
```

### 9.2 デプロイ手順
```bash
# ビルド
yarn build

# テスト実行
yarn test

# Cloudflare Pagesへのデプロイ
wrangler pages deploy dist/

# Cloudflare Workersへのデプロイ
wrangler deploy
```

## 10. トラブルシューティング

### 10.1 よくある問題と解決方法

**問題**: 開発サーバーが起動しない
```bash
# node_modulesとlockファイルを削除して再インストール
rm -rf node_modules yarn.lock
yarn install
```

**問題**: TypeScriptのエラーが発生する
```bash
# TypeScriptのキャッシュをクリア
yarn tsc --build --clean
```

**問題**: Supabaseへの接続エラー
```bash
# 環境変数を確認
echo $REACT_APP_SUPABASE_URL
echo $REACT_APP_SUPABASE_ANON_KEY

# Supabaseのダッシュボードで設定を確認
```

### 10.2 デバッグ方法
```typescript
// React Developer Tools
// Redux DevTools（使用している場合）
// Network タブでAPIリクエストを確認
// Console.logの適切な使用

if (process.env.NODE_ENV === 'development') {
  console.log('Debug info:', data);
}
```

---

*作成日：2025年1月10日*
*更新日：2025年1月10日*