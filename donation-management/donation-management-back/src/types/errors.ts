export interface ApiError {
  code: string;
  message: string;
  details?: ErrorDetail[];
}

export interface ErrorDetail {
  field: string;
  message: string;
}

export interface ApiErrorResponse {
  error: ApiError;
}

export type ApiErrorCode = 
  | 'VALIDATION_ERROR'
  | 'AUTHENTICATION_ERROR'
  | 'AUTHORIZATION_ERROR'
  | 'NOT_FOUND'
  | 'CONFLICT'
  | 'RATE_LIMIT_EXCEEDED'
  | 'INTERNAL_SERVER_ERROR'
  | 'SERVICE_UNAVAILABLE'
  | 'DONATION_NOT_AVAILABLE'
  | 'LENDING_ALREADY_EXISTS'
  | 'LENDING_OVERDUE'
  | 'INVALID_OPERATION';

export const ErrorMessages: Record<ApiErrorCode, string> = {
  VALIDATION_ERROR: '入力値が不正です',
  AUTHENTICATION_ERROR: '認証が必要です',
  AUTHORIZATION_ERROR: 'アクセス権限がありません',
  NOT_FOUND: 'リソースが見つかりません',
  CONFLICT: 'データの競合が発生しました',
  RATE_LIMIT_EXCEEDED: 'リクエスト制限を超過しました',
  INTERNAL_SERVER_ERROR: 'サーバーエラーが発生しました',
  SERVICE_UNAVAILABLE: 'サービスが利用できません',
  DONATION_NOT_AVAILABLE: '寄贈物は現在利用できません',
  LENDING_ALREADY_EXISTS: '既に貸出中の寄贈物です',
  LENDING_OVERDUE: '貸出期限を過ぎています',
  INVALID_OPERATION: '無効な操作です',
};

export const HttpStatusCodes: Record<ApiErrorCode, number> = {
  VALIDATION_ERROR: 400,
  AUTHENTICATION_ERROR: 401,
  AUTHORIZATION_ERROR: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  RATE_LIMIT_EXCEEDED: 429,
  INTERNAL_SERVER_ERROR: 500,
  SERVICE_UNAVAILABLE: 503,
  DONATION_NOT_AVAILABLE: 409,
  LENDING_ALREADY_EXISTS: 409,
  LENDING_OVERDUE: 400,
  INVALID_OPERATION: 400,
};

export class ApiErrorClass extends Error {
  public readonly code: ApiErrorCode;
  public readonly details?: ErrorDetail[];
  public readonly statusCode: number;

  constructor(code: ApiErrorCode, message?: string, details?: ErrorDetail[]) {
    super(message || ErrorMessages[code]);
    this.name = 'ApiError';
    this.code = code;
    this.details = details;
    this.statusCode = HttpStatusCodes[code];
  }

  toResponse(): ApiErrorResponse {
    return {
      error: {
        code: this.code,
        message: this.message,
        details: this.details,
      },
    };
  }
}