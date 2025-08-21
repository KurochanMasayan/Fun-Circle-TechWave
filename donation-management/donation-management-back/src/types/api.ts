import { z } from 'zod';
import type {
  DatabaseDonation,
  DatabaseLending,
  DatabaseUser,
  DatabaseCategory,
  DatabaseSubCategory,
  DatabaseLocation,
  DatabaseReview,
  DatabaseTag,
  DatabaseDonationImage
} from './database';

export interface PaginationParams {
  page?: number;
  limit?: number;
  sort?: string;
  order?: 'asc' | 'desc';
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface CreateCategoryRequest {
  name: string;
  description?: string;
  display_order?: number;
}

export interface UpdateCategoryRequest {
  name?: string;
  description?: string;
  display_order?: number;
}

export interface CreateSubCategoryRequest {
  category_id: string;
  name: string;
  description?: string;
  display_order?: number;
}

export interface UpdateSubCategoryRequest {
  name?: string;
  description?: string;
  display_order?: number;
}

export interface CreateLocationRequest {
  name: string;
  building?: string;
  floor?: string;
  room?: string;
  shelf?: string;
}

export interface UpdateLocationRequest {
  name?: string;
  building?: string;
  floor?: string;
  room?: string;
  shelf?: string;
}

export interface CreateDonationRequest {
  title: string;
  category_id: string;
  sub_category_id?: string;
  donor_name?: string;
  donated_date: string;
  location_id: string;
  description?: string;
  isbn?: string;
  author?: string;
  publisher?: string;
  published_year?: number;
  manufacturer?: string;
  model_number?: string;
  condition?: 'new' | 'good' | 'fair' | 'poor';
  images?: string[];
  tags?: string[];
}

export interface UpdateDonationRequest {
  title?: string;
  category_id?: string;
  sub_category_id?: string;
  donor_name?: string;
  donated_date?: string;
  location_id?: string;
  status?: 'available' | 'lending' | 'maintenance' | 'lost';
  description?: string;
  isbn?: string;
  author?: string;
  publisher?: string;
  published_year?: number;
  manufacturer?: string;
  model_number?: string;
  condition?: 'new' | 'good' | 'fair' | 'poor';
}

export interface CreateLendingRequest {
  donation_id: string;
  due_date: string;
  purpose?: string;
}

export interface UpdateLendingRequest {
  due_date?: string;
  status?: 'active' | 'returned' | 'overdue' | 'cancelled';
  returned_at?: string;
  extension_count?: number;
}

export interface CreateReviewRequest {
  donation_id: string;
  rating: number;
  comment?: string;
}

export interface UpdateReviewRequest {
  rating?: number;
  comment?: string;
}

export interface SearchDonationsParams extends PaginationParams {
  title?: string;
  category_id?: string;
  sub_category_id?: string;
  status?: 'available' | 'lending' | 'maintenance' | 'lost';
  location_id?: string;
  author?: string;
  publisher?: string;
  manufacturer?: string;
  condition?: 'new' | 'good' | 'fair' | 'poor';
  tags?: string[];
}

export interface DonationDetailResponse extends DatabaseDonation {
  category: DatabaseCategory;
  sub_category?: DatabaseSubCategory;
  location: DatabaseLocation;
  created_by_user: Pick<DatabaseUser, 'id' | 'name' | 'email'>;
  updated_by_user?: Pick<DatabaseUser, 'id' | 'name' | 'email'>;
  images: DatabaseDonationImage[];
  tags: DatabaseTag[];
  reviews: ReviewResponse[];
  current_lending?: LendingResponse;
  avg_rating: number;
  review_count: number;
  total_lending_count: number;
  is_favorited: boolean;
}

export interface DonationListResponse extends Pick<DatabaseDonation, 'id' | 'title' | 'status' | 'donated_date' | 'created_at'> {
  category: Pick<DatabaseCategory, 'id' | 'name'>;
  sub_category?: Pick<DatabaseSubCategory, 'id' | 'name'>;
  location: Pick<DatabaseLocation, 'id' | 'name'>;
  primary_image?: string;
  avg_rating: number;
  review_count: number;
  is_favorited: boolean;
}

export interface LendingResponse extends DatabaseLending {
  donation: Pick<DatabaseDonation, 'id' | 'title' | 'category_id'>;
  user: Pick<DatabaseUser, 'id' | 'name' | 'email' | 'department'>;
  approved_by_user?: Pick<DatabaseUser, 'id' | 'name' | 'email'>;
}

export interface ReviewResponse extends DatabaseReview {
  user: Pick<DatabaseUser, 'id' | 'name' | 'avatar_url'>;
  donation?: Pick<DatabaseDonation, 'id' | 'title'>;
}

export interface UserDashboardResponse {
  user: DatabaseUser;
  active_lendings: LendingResponse[];
  overdue_lendings: LendingResponse[];
  recent_lendings: LendingResponse[];
  favorite_donations: DonationListResponse[];
  lending_stats: {
    total_borrowed: number;
    currently_borrowed: number;
    overdue_count: number;
  };
}

export interface AdminDashboardResponse {
  stats: {
    total_donations: number;
    available_donations: number;
    lending_donations: number;
    active_lendings: number;
    overdue_lendings: number;
    total_users: number;
    new_donations_this_month: number;
    popular_categories: Array<{
      category: DatabaseCategory;
      count: number;
    }>;
  };
  recent_donations: DonationListResponse[];
  recent_lendings: LendingResponse[];
  overdue_lendings: LendingResponse[];
}

export const CreateCategorySchema = z.object({
  name: z.string().min(1).max(50),
  description: z.string().optional(),
  display_order: z.number().int().min(0).optional(),
});

export const UpdateCategorySchema = z.object({
  name: z.string().min(1).max(50).optional(),
  description: z.string().optional(),
  display_order: z.number().int().min(0).optional(),
});

export const CreateSubCategorySchema = z.object({
  category_id: z.string().uuid(),
  name: z.string().min(1).max(50),
  description: z.string().optional(),
  display_order: z.number().int().min(0).optional(),
});

export const UpdateSubCategorySchema = z.object({
  name: z.string().min(1).max(50).optional(),
  description: z.string().optional(),
  display_order: z.number().int().min(0).optional(),
});

export const CreateLocationSchema = z.object({
  name: z.string().min(1).max(100),
  building: z.string().max(50).optional(),
  floor: z.string().max(20).optional(),
  room: z.string().max(50).optional(),
  shelf: z.string().max(50).optional(),
});

export const UpdateLocationSchema = z.object({
  name: z.string().min(1).max(100).optional(),
  building: z.string().max(50).optional(),
  floor: z.string().max(20).optional(),
  room: z.string().max(50).optional(),
  shelf: z.string().max(50).optional(),
});

export const CreateDonationSchema = z.object({
  title: z.string().min(1).max(255),
  category_id: z.string().uuid(),
  sub_category_id: z.string().uuid().optional(),
  donor_name: z.string().max(100).optional(),
  donated_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  location_id: z.string().uuid(),
  description: z.string().optional(),
  isbn: z.string().max(20).optional(),
  author: z.string().max(200).optional(),
  publisher: z.string().max(100).optional(),
  published_year: z.number().int().min(1900).max(new Date().getFullYear()).optional(),
  manufacturer: z.string().max(100).optional(),
  model_number: z.string().max(100).optional(),
  condition: z.enum(['new', 'good', 'fair', 'poor']).optional(),
  images: z.array(z.string().url()).optional(),
  tags: z.array(z.string()).optional(),
});

export const UpdateDonationSchema = z.object({
  title: z.string().min(1).max(255).optional(),
  category_id: z.string().uuid().optional(),
  sub_category_id: z.string().uuid().optional(),
  donor_name: z.string().max(100).optional(),
  donated_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
  location_id: z.string().uuid().optional(),
  status: z.enum(['available', 'lending', 'maintenance', 'lost']).optional(),
  description: z.string().optional(),
  isbn: z.string().max(20).optional(),
  author: z.string().max(200).optional(),
  publisher: z.string().max(100).optional(),
  published_year: z.number().int().min(1900).max(new Date().getFullYear()).optional(),
  manufacturer: z.string().max(100).optional(),
  model_number: z.string().max(100).optional(),
  condition: z.enum(['new', 'good', 'fair', 'poor']).optional(),
});

export const CreateLendingSchema = z.object({
  donation_id: z.string().uuid(),
  due_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  purpose: z.string().optional(),
});

export const UpdateLendingSchema = z.object({
  due_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
  status: z.enum(['active', 'returned', 'overdue', 'cancelled']).optional(),
  returned_at: z.string().datetime().optional(),
  extension_count: z.number().int().min(0).max(2).optional(),
});

export const CreateReviewSchema = z.object({
  donation_id: z.string().uuid(),
  rating: z.number().int().min(1).max(5),
  comment: z.string().optional(),
});

export const UpdateReviewSchema = z.object({
  rating: z.number().int().min(1).max(5).optional(),
  comment: z.string().optional(),
});

export const PaginationSchema = z.object({
  page: z.coerce.number().min(1).default(1),
  limit: z.coerce.number().min(1).max(100).default(20),
  sort: z.string().optional(),
  order: z.enum(['asc', 'desc']).default('desc'),
});

export const SearchDonationsSchema = PaginationSchema.extend({
  title: z.string().optional(),
  category_id: z.string().uuid().optional(),
  sub_category_id: z.string().uuid().optional(),
  status: z.enum(['available', 'lending', 'maintenance', 'lost']).optional(),
  location_id: z.string().uuid().optional(),
  author: z.string().optional(),
  publisher: z.string().optional(),
  manufacturer: z.string().optional(),
  condition: z.enum(['new', 'good', 'fair', 'poor']).optional(),
  tags: z.array(z.string()).optional(),
});