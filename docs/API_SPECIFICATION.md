# 社内寄贈物管理システム - API仕様書

## 1. 概要

### 1.1 API基本情報
- **ベースURL**: `https://api.donation-management.example.com/v1`
- **プロトコル**: HTTPS
- **データフォーマット**: JSON
- **文字エンコーディング**: UTF-8
- **認証方式**: Bearer Token (JWT)

### 1.2 共通仕様

#### リクエストヘッダー
```http
Content-Type: application/json
Authorization: Bearer {jwt_token}
Accept: application/json
```

#### レスポンスヘッダー
```http
Content-Type: application/json; charset=utf-8
X-Request-ID: {request_id}
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 99
X-RateLimit-Reset: 1704067200
```

#### エラーレスポンス形式
```json
{
  "error": {
    "code": "ERROR_CODE",
    "message": "エラーメッセージ",
    "details": [
      {
        "field": "field_name",
        "message": "フィールド固有のエラーメッセージ"
      }
    ],
    "request_id": "req_123456789"
  }
}
```

#### ページネーション
```json
{
  "data": [...],
  "pagination": {
    "page": 1,
    "per_page": 20,
    "total": 100,
    "total_pages": 5
  }
}
```

## 2. 認証API

### 2.1 Google OAuth認証開始
**Endpoint**: `GET /auth/google`

**Description**: Google OAuth認証フローを開始

**Response**:
```json
{
  "redirect_url": "https://accounts.google.com/o/oauth2/v2/auth?..."
}
```

### 2.2 認証コールバック
**Endpoint**: `POST /auth/callback`

**Description**: Google認証後のコールバック処理

**Request Body**:
```json
{
  "code": "google_auth_code",
  "state": "csrf_token"
}
```

**Response**:
```json
{
  "access_token": "jwt_token",
  "token_type": "Bearer",
  "expires_in": 3600,
  "user": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "email": "user@example.com",
    "name": "山田太郎",
    "role": "user"
  }
}
```

### 2.3 トークンリフレッシュ
**Endpoint**: `POST /auth/refresh`

**Description**: アクセストークンの更新

**Request Headers**:
```http
Authorization: Bearer {refresh_token}
```

**Response**:
```json
{
  "access_token": "new_jwt_token",
  "token_type": "Bearer",
  "expires_in": 3600
}
```

### 2.4 ログアウト
**Endpoint**: `POST /auth/logout`

**Description**: ログアウト処理

**Response**:
```json
{
  "message": "ログアウトしました"
}
```

## 3. ユーザーAPI

### 3.1 現在のユーザー情報取得
**Endpoint**: `GET /users/me`

**Description**: 認証済みユーザーの情報を取得

**Response**:
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "email": "user@example.com",
  "name": "山田太郎",
  "role": "user",
  "department": "開発部",
  "avatar_url": "https://example.com/avatar.jpg",
  "created_at": "2025-01-01T00:00:00Z"
}
```

### 3.2 ユーザー情報更新
**Endpoint**: `PATCH /users/me`

**Description**: ユーザー情報の更新

**Request Body**:
```json
{
  "name": "山田太郎",
  "department": "開発部"
}
```

**Response**:
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "email": "user@example.com",
  "name": "山田太郎",
  "role": "user",
  "department": "開発部",
  "updated_at": "2025-01-10T10:00:00Z"
}
```

### 3.3 ユーザー一覧取得（管理者のみ）
**Endpoint**: `GET /users`

**Description**: 全ユーザーの一覧を取得

**Query Parameters**:
- `page` (integer): ページ番号
- `per_page` (integer): 1ページあたりの件数
- `role` (string): ロールでフィルター
- `department` (string): 部署でフィルター

**Response**:
```json
{
  "data": [
    {
      "id": "550e8400-e29b-41d4-a716-446655440000",
      "email": "user@example.com",
      "name": "山田太郎",
      "role": "user",
      "department": "開発部",
      "is_active": true,
      "last_login_at": "2025-01-10T09:00:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "per_page": 20,
    "total": 100,
    "total_pages": 5
  }
}
```

## 4. 寄贈物API

### 4.1 寄贈物一覧取得
**Endpoint**: `GET /donations`

**Description**: 寄贈物の一覧を取得

**Query Parameters**:
- `page` (integer): ページ番号
- `per_page` (integer): 1ページあたりの件数（最大100）
- `category_id` (uuid): カテゴリID
- `sub_category_id` (uuid): サブカテゴリID
- `status` (string): ステータス（available/lending/maintenance/lost）
- `location_id` (uuid): 保管場所ID
- `keyword` (string): キーワード検索
- `sort` (string): ソート順（created_at/-created_at/title/-title/popular）

**Response**:
```json
{
  "data": [
    {
      "id": "550e8400-e29b-41d4-a716-446655440001",
      "title": "リーダブルコード",
      "category": {
        "id": "550e8400-e29b-41d4-a716-446655440010",
        "name": "書籍"
      },
      "sub_category": {
        "id": "550e8400-e29b-41d4-a716-446655440020",
        "name": "プログラミング"
      },
      "status": "available",
      "location": {
        "id": "550e8400-e29b-41d4-a716-446655440030",
        "name": "本社3F共有書棚A"
      },
      "donor_name": "田中一郎",
      "donated_date": "2025-01-01",
      "avg_rating": 4.5,
      "review_count": 10,
      "image_urls": [
        "https://example.com/image1.jpg"
      ]
    }
  ],
  "pagination": {
    "page": 1,
    "per_page": 20,
    "total": 100,
    "total_pages": 5
  }
}
```

### 4.2 寄贈物詳細取得
**Endpoint**: `GET /donations/{id}`

**Description**: 特定の寄贈物の詳細情報を取得

**Response**:
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440001",
  "title": "リーダブルコード",
  "category": {
    "id": "550e8400-e29b-41d4-a716-446655440010",
    "name": "書籍"
  },
  "sub_category": {
    "id": "550e8400-e29b-41d4-a716-446655440020",
    "name": "プログラミング"
  },
  "status": "available",
  "location": {
    "id": "550e8400-e29b-41d4-a716-446655440030",
    "name": "本社3F共有書棚A",
    "building": "本社",
    "floor": "3F",
    "room": "共有スペース",
    "shelf": "A"
  },
  "donor_name": "田中一郎",
  "donated_date": "2025-01-01",
  "description": "より良いコードを書くための実践的なテクニックが満載の本です。",
  "isbn": "978-4873115658",
  "author": "Dustin Boswell, Trevor Foucher",
  "publisher": "オライリージャパン",
  "published_year": 2012,
  "condition": "good",
  "avg_rating": 4.5,
  "review_count": 10,
  "total_lending_count": 25,
  "image_urls": [
    "https://example.com/image1.jpg",
    "https://example.com/image2.jpg"
  ],
  "tags": ["初心者向け", "人気"],
  "created_by": {
    "id": "550e8400-e29b-41d4-a716-446655440040",
    "name": "管理者"
  },
  "created_at": "2025-01-01T10:00:00Z",
  "updated_at": "2025-01-05T15:00:00Z"
}
```

### 4.3 寄贈物登録（管理者のみ）
**Endpoint**: `POST /donations`

**Description**: 新規寄贈物を登録

**Request Body**:
```json
{
  "title": "リーダブルコード",
  "category_id": "550e8400-e29b-41d4-a716-446655440010",
  "sub_category_id": "550e8400-e29b-41d4-a716-446655440020",
  "donor_name": "田中一郎",
  "donated_date": "2025-01-01",
  "location_id": "550e8400-e29b-41d4-a716-446655440030",
  "description": "より良いコードを書くための実践的なテクニックが満載の本です。",
  "isbn": "978-4873115658",
  "author": "Dustin Boswell, Trevor Foucher",
  "publisher": "オライリージャパン",
  "published_year": 2012,
  "condition": "good",
  "tags": ["初心者向け", "人気"]
}
```

**Response**:
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440001",
  "title": "リーダブルコード",
  "status": "available",
  "created_at": "2025-01-10T10:00:00Z"
}
```

### 4.4 寄贈物更新（管理者のみ）
**Endpoint**: `PATCH /donations/{id}`

**Description**: 寄贈物情報を更新

**Request Body**:
```json
{
  "title": "リーダブルコード 改訂版",
  "location_id": "550e8400-e29b-41d4-a716-446655440031",
  "condition": "fair"
}
```

**Response**:
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440001",
  "title": "リーダブルコード 改訂版",
  "updated_at": "2025-01-10T11:00:00Z"
}
```

### 4.5 寄贈物削除（管理者のみ）
**Endpoint**: `DELETE /donations/{id}`

**Description**: 寄贈物を論理削除

**Response**:
```json
{
  "message": "寄贈物を削除しました"
}
```

### 4.6 寄贈物画像アップロード（管理者のみ）
**Endpoint**: `POST /donations/{id}/images`

**Description**: 寄贈物の画像をアップロード

**Request Headers**:
```http
Content-Type: multipart/form-data
```

**Request Body**:
- `image` (file): 画像ファイル（最大5MB）
- `display_order` (integer): 表示順

**Response**:
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440050",
  "image_url": "https://example.com/images/donation_001.jpg",
  "display_order": 1
}
```

## 5. 貸出API

### 5.1 貸出申請
**Endpoint**: `POST /lendings`

**Description**: 寄贈物の貸出申請

**Request Body**:
```json
{
  "donation_id": "550e8400-e29b-41d4-a716-446655440001",
  "due_date": "2025-02-01",
  "purpose": "業務で参考にするため"
}
```

**Response**:
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440060",
  "donation_id": "550e8400-e29b-41d4-a716-446655440001",
  "user_id": "550e8400-e29b-41d4-a716-446655440000",
  "borrowed_at": "2025-01-10T10:00:00Z",
  "due_date": "2025-02-01",
  "status": "active"
}
```

### 5.2 貸出履歴取得
**Endpoint**: `GET /lendings`

**Description**: 貸出履歴の一覧を取得

**Query Parameters**:
- `user_id` (uuid): ユーザーIDでフィルター（管理者のみ）
- `donation_id` (uuid): 寄贈物IDでフィルター
- `status` (string): ステータスでフィルター（active/returned/overdue）
- `page` (integer): ページ番号
- `per_page` (integer): 1ページあたりの件数

**Response**:
```json
{
  "data": [
    {
      "id": "550e8400-e29b-41d4-a716-446655440060",
      "donation": {
        "id": "550e8400-e29b-41d4-a716-446655440001",
        "title": "リーダブルコード"
      },
      "user": {
        "id": "550e8400-e29b-41d4-a716-446655440000",
        "name": "山田太郎",
        "email": "yamada@example.com"
      },
      "borrowed_at": "2025-01-10T10:00:00Z",
      "due_date": "2025-02-01",
      "returned_at": null,
      "status": "active",
      "extension_count": 0
    }
  ],
  "pagination": {
    "page": 1,
    "per_page": 20,
    "total": 50,
    "total_pages": 3
  }
}
```

### 5.3 返却処理
**Endpoint**: `PATCH /lendings/{id}/return`

**Description**: 寄贈物の返却処理

**Response**:
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440060",
  "returned_at": "2025-01-20T10:00:00Z",
  "status": "returned"
}
```

### 5.4 貸出期間延長
**Endpoint**: `PATCH /lendings/{id}/extend`

**Description**: 貸出期間の延長申請（最大2回まで）

**Request Body**:
```json
{
  "new_due_date": "2025-02-15"
}
```

**Response**:
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440060",
  "due_date": "2025-02-15",
  "extension_count": 1
}
```

## 6. レビューAPI

### 6.1 レビュー投稿
**Endpoint**: `POST /reviews`

**Description**: 寄贈物へのレビュー投稿

**Request Body**:
```json
{
  "donation_id": "550e8400-e29b-41d4-a716-446655440001",
  "rating": 5,
  "comment": "非常に参考になる本でした。初心者にもおすすめです。"
}
```

**Response**:
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440070",
  "donation_id": "550e8400-e29b-41d4-a716-446655440001",
  "user": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "name": "山田太郎"
  },
  "rating": 5,
  "comment": "非常に参考になる本でした。初心者にもおすすめです。",
  "created_at": "2025-01-10T10:00:00Z"
}
```

### 6.2 レビュー一覧取得
**Endpoint**: `GET /donations/{id}/reviews`

**Description**: 特定の寄贈物のレビュー一覧を取得

**Query Parameters**:
- `page` (integer): ページ番号
- `per_page` (integer): 1ページあたりの件数
- `sort` (string): ソート順（created_at/-created_at/helpful）

**Response**:
```json
{
  "data": [
    {
      "id": "550e8400-e29b-41d4-a716-446655440070",
      "user": {
        "id": "550e8400-e29b-41d4-a716-446655440000",
        "name": "山田太郎"
      },
      "rating": 5,
      "comment": "非常に参考になる本でした。初心者にもおすすめです。",
      "helpful_count": 10,
      "created_at": "2025-01-10T10:00:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "per_page": 20,
    "total": 15,
    "total_pages": 1
  }
}
```

### 6.3 レビューを役立ったと評価
**Endpoint**: `POST /reviews/{id}/helpful`

**Description**: レビューを「役立った」と評価

**Response**:
```json
{
  "helpful_count": 11
}
```

## 7. お気に入りAPI

### 7.1 お気に入り登録
**Endpoint**: `POST /favorites`

**Description**: 寄贈物をお気に入りに登録

**Request Body**:
```json
{
  "donation_id": "550e8400-e29b-41d4-a716-446655440001"
}
```

**Response**:
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440080",
  "donation_id": "550e8400-e29b-41d4-a716-446655440001",
  "created_at": "2025-01-10T10:00:00Z"
}
```

### 7.2 お気に入り一覧取得
**Endpoint**: `GET /users/me/favorites`

**Description**: 自分のお気に入り一覧を取得

**Response**:
```json
{
  "data": [
    {
      "id": "550e8400-e29b-41d4-a716-446655440080",
      "donation": {
        "id": "550e8400-e29b-41d4-a716-446655440001",
        "title": "リーダブルコード",
        "status": "available",
        "avg_rating": 4.5
      },
      "created_at": "2025-01-10T10:00:00Z"
    }
  ]
}
```

### 7.3 お気に入り削除
**Endpoint**: `DELETE /favorites/{id}`

**Description**: お気に入りから削除

**Response**:
```json
{
  "message": "お気に入りから削除しました"
}
```

## 8. カテゴリAPI

### 8.1 カテゴリ一覧取得
**Endpoint**: `GET /categories`

**Description**: カテゴリの一覧を取得

**Response**:
```json
{
  "data": [
    {
      "id": "550e8400-e29b-41d4-a716-446655440010",
      "name": "書籍",
      "description": "技術書、ビジネス書など",
      "display_order": 1,
      "sub_categories": [
        {
          "id": "550e8400-e29b-41d4-a716-446655440020",
          "name": "プログラミング",
          "display_order": 1
        }
      ]
    }
  ]
}
```

## 9. 保管場所API

### 9.1 保管場所一覧取得
**Endpoint**: `GET /locations`

**Description**: 保管場所の一覧を取得

**Response**:
```json
{
  "data": [
    {
      "id": "550e8400-e29b-41d4-a716-446655440030",
      "name": "本社3F共有書棚A",
      "building": "本社",
      "floor": "3F",
      "room": "共有スペース",
      "shelf": "A"
    }
  ]
}
```

## 10. 統計API（管理者のみ）

### 10.1 利用統計取得
**Endpoint**: `GET /statistics/usage`

**Description**: システムの利用統計を取得

**Query Parameters**:
- `from` (date): 開始日
- `to` (date): 終了日

**Response**:
```json
{
  "period": {
    "from": "2025-01-01",
    "to": "2025-01-31"
  },
  "total_lendings": 150,
  "unique_users": 50,
  "popular_items": [
    {
      "id": "550e8400-e29b-41d4-a716-446655440001",
      "title": "リーダブルコード",
      "lending_count": 10
    }
  ],
  "category_breakdown": [
    {
      "category": "書籍",
      "count": 120,
      "percentage": 80
    }
  ]
}
```

## 11. HTTPステータスコード

| コード | 説明 | 使用例 |
|--------|------|--------|
| 200 | OK | 正常な取得・更新 |
| 201 | Created | リソースの作成成功 |
| 204 | No Content | 削除成功 |
| 400 | Bad Request | 不正なリクエスト |
| 401 | Unauthorized | 認証エラー |
| 403 | Forbidden | 権限エラー |
| 404 | Not Found | リソースが見つからない |
| 409 | Conflict | リソースの競合 |
| 422 | Unprocessable Entity | バリデーションエラー |
| 429 | Too Many Requests | レート制限超過 |
| 500 | Internal Server Error | サーバーエラー |

## 12. エラーコード一覧

| エラーコード | 説明 |
|-------------|------|
| AUTH_REQUIRED | 認証が必要です |
| INVALID_TOKEN | 無効なトークンです |
| TOKEN_EXPIRED | トークンの有効期限が切れています |
| PERMISSION_DENIED | 権限がありません |
| RESOURCE_NOT_FOUND | リソースが見つかりません |
| VALIDATION_ERROR | 入力値が不正です |
| DUPLICATE_ENTRY | 既に登録されています |
| LENDING_LIMIT_EXCEEDED | 貸出上限を超えています |
| ITEM_NOT_AVAILABLE | 貸出できない状態です |
| EXTENSION_LIMIT_EXCEEDED | 延長回数の上限を超えています |
| RATE_LIMIT_EXCEEDED | APIリクエスト数の上限を超えています |

## 13. レート制限

- **認証なし**: 10リクエスト/分
- **一般ユーザー**: 100リクエスト/分
- **管理者**: 300リクエスト/分

レート制限情報はレスポンスヘッダーで確認できます。

---

*作成日：2025年1月10日*
*更新日：2025年1月10日*