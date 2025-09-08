export type {
  DatabaseUser,
  DatabaseDonation,
  DatabaseLending,
  CreateDonationRequest,
  UpdateDonationRequest,
  CreateLendingRequest,
  UpdateLendingRequest,
  SearchDonationsParams,
  DonationResponse,
  LendingResponse,
  UserDashboardResponse,
  AdminDashboardResponse,
  PaginationParams,
  PaginatedResponse,
  ApiError,
  ErrorDetail,
  ApiErrorResponse,
  ApiErrorCode,
  LoginRequest,
  LoginResponse,
  AuthenticatedUser,
  JwtPayload,
  RefreshTokenRequest,
  RefreshTokenResponse,
  Permission,
  AuthContext,
  GoogleProfile,
  SupabaseUser,
  SuccessResponse,
  PaginatedSuccessResponse,
  ApiResponse,
  ApiPaginatedResponse,
} from '../../../donation-management-back/src/types';

export interface ComponentProps {
  className?: string;
  children?: React.ReactNode;
}

export interface FormFieldProps {
  label: string;
  error?: string;
  required?: boolean;
}

export interface SelectOption {
  value: string;
  label: string;
}

export interface TableColumn<T = any> {
  key: keyof T;
  label: string;
  sortable?: boolean;
  render?: (value: any, row: T) => React.ReactNode;
}

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}

export interface LoadingState {
  isLoading: boolean;
  error?: string;
}

export interface UseApiResponse<T = any> extends LoadingState {
  data: T | null;
  refetch: () => void;
}

export interface UsePaginatedApiResponse<T = any> extends LoadingState {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  } | null;
  refetch: () => void;
  nextPage: () => void;
  prevPage: () => void;
  goToPage: (page: number) => void;
}

export interface NotificationState {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message?: string;
  duration?: number;
}