# Feature-Sliced Design (FSD) アーキテクチャ

## 概要

このプロジェクトは Feature-Sliced Design (FSD) メソドロジーに基づいて構築されています。FSDは、フロントエンドアプリケーションのスケーラブルで保守可能なアーキテクチャを提供します。

## フォルダ構造

```
src/
├── app/              # アプリケーション初期化とプロバイダー
│   ├── providers/    # すべてのプロバイダー
│   ├── styles/      # グローバルスタイル
│   ├── App.tsx      # メインアプリケーションコンポーネント
│   └── index.tsx    # アプリケーションエントリーポイント
│
├── pages/           # ページレイヤー
│   ├── home/       # ホームページ
│   └── login/      # ログインページ
│
├── widgets/         # 複雑なUIコンポーネント
│   └── auth/       # 認証ウィジェット
│
├── features/        # ビジネス機能
│   └── (今後追加)
│
├── entities/        # ビジネスエンティティ
│   └── (今後追加)
│
└── shared/          # 共有リソース
    ├── api/        # API設定とユーティリティ
    ├── config/     # 設定ファイル
    ├── lib/        # ライブラリとヘルパー
    └── ui/         # 共有UIコンポーネント
```

## レイヤーの責務

### 1. App Layer
- アプリケーションの初期化
- プロバイダーの設定
- グローバルスタイル
- ルーティング設定

### 2. Pages Layer
- ページコンポーネント
- ページ固有のロジック
- レイアウト構成

### 3. Widgets Layer
- 複雑なUIコンポーネント
- 複数のfeaturesを組み合わせたコンポーネント
- ページ間で再利用可能な大きなコンポーネント

### 4. Features Layer
- ビジネス機能の実装
- ユーザーアクション
- ビジネスロジック

### 5. Entities Layer
- ビジネスエンティティの定義
- データモデル
- エンティティ関連のロジック

### 6. Shared Layer
- 共有ユーティリティ
- 設定ファイル
- APIクライアント
- 共通UIコンポーネント

## 依存関係のルール

レイヤー間の依存関係は以下のルールに従います：

- **上位レイヤーは下位レイヤーのみをインポートできる**
- **同一レイヤー内での相互依存は避ける**
- **Sharedレイヤーはどこからでもインポート可能**

依存関係の流れ：
```
app → pages → widgets → features → entities → shared
```

## パスエイリアス

TypeScriptとViteで`@/`エイリアスが設定されており、絶対パスでのインポートが可能です：

```typescript
import { supabase } from '@/shared/api/supabase'
import { AuthWidget } from '@/widgets/auth'
```

## 移行計画

現在、既存のコードをFSD構造に段階的に移行中です：

### 完了した作業
- [x] FSDフォルダ構造の作成
- [x] パスエイリアスの設定（@/）
- [x] 基本的なレイヤー構造の準備

### 今後の作業
- [ ] 既存コンポーネントのFSD構造への移行
- [ ] ESLint設定のFSD対応
- [ ] featuresレイヤーの実装（寄付管理機能など）
- [ ] entitiesレイヤーの実装（寄付者、寄付記録など）

## 参考リンク

- [Feature-Sliced Design 公式ドキュメント](https://feature-sliced.design/)
- [FSD ベストプラクティス](https://feature-sliced.design/docs/guides)