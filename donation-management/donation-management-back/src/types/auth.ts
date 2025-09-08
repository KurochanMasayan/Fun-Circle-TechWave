import { z } from 'zod';
import { DatabaseUser } from './database';

export interface LoginRequest {
  token: string;
}

export interface LoginResponse {
  user: AuthenticatedUser;
  access_token: string;
  refresh_token?: string;
  expires_in: number;
}

export interface AuthenticatedUser extends Omit<DatabaseUser, 'created_at' | 'updated_at' | 'deleted_at'> {
  permissions: Permission[];
}

export interface JwtPayload {
  sub: string;
  email: string;
  name: string;
  role: 'user' | 'admin' | 'system';
  department?: string;
  iat: number;
  exp: number;
}

export interface RefreshTokenRequest {
  refresh_token: string;
}

export interface RefreshTokenResponse {
  access_token: string;
  expires_in: number;
}

export type Permission = 
  | 'donations:read'
  | 'donations:create'
  | 'donations:update'
  | 'donations:delete'
  | 'categories:read'
  | 'categories:create'
  | 'categories:update'
  | 'categories:delete'
  | 'locations:read'
  | 'locations:create'
  | 'locations:update'
  | 'locations:delete'
  | 'lendings:read'
  | 'lendings:create'
  | 'lendings:update'
  | 'lendings:delete'
  | 'lendings:approve'
  | 'reviews:read'
  | 'reviews:create'
  | 'reviews:update'
  | 'reviews:delete'
  | 'favorites:read'
  | 'favorites:create'
  | 'favorites:delete'
  | 'users:read'
  | 'users:update'
  | 'users:delete'
  | 'admin:dashboard'
  | 'admin:reports'
  | 'system:maintenance';

export const RolePermissions: Record<'user' | 'admin' | 'system', Permission[]> = {
  user: [
    'donations:read',
    'categories:read',
    'locations:read',
    'lendings:read',
    'lendings:create',
    'lendings:update',
    'reviews:read',
    'reviews:create',
    'reviews:update',
    'favorites:read',
    'favorites:create',
    'favorites:delete',
  ],
  admin: [
    'donations:read',
    'donations:create',
    'donations:update',
    'donations:delete',
    'categories:read',
    'categories:create',
    'categories:update',
    'categories:delete',
    'locations:read',
    'locations:create',
    'locations:update',
    'locations:delete',
    'lendings:read',
    'lendings:create',
    'lendings:update',
    'lendings:delete',
    'lendings:approve',
    'reviews:read',
    'reviews:create',
    'reviews:update',
    'reviews:delete',
    'favorites:read',
    'favorites:create',
    'favorites:delete',
    'users:read',
    'users:update',
    'admin:dashboard',
    'admin:reports',
  ],
  system: [
    'donations:read',
    'donations:create',
    'donations:update',
    'donations:delete',
    'categories:read',
    'categories:create',
    'categories:update',
    'categories:delete',
    'locations:read',
    'locations:create',
    'locations:update',
    'locations:delete',
    'lendings:read',
    'lendings:create',
    'lendings:update',
    'lendings:delete',
    'lendings:approve',
    'reviews:read',
    'reviews:create',
    'reviews:update',
    'reviews:delete',
    'favorites:read',
    'favorites:create',
    'favorites:delete',
    'users:read',
    'users:update',
    'users:delete',
    'admin:dashboard',
    'admin:reports',
    'system:maintenance',
  ],
};

export interface AuthContext {
  user: AuthenticatedUser;
  isAuthenticated: boolean;
  hasPermission: (permission: Permission) => boolean;
  hasRole: (role: 'user' | 'admin' | 'system') => boolean;
  hasAnyPermission: (permissions: Permission[]) => boolean;
}

export const LoginRequestSchema = z.object({
  token: z.string().min(1),
});

export const RefreshTokenRequestSchema = z.object({
  refresh_token: z.string().min(1),
});

export interface GoogleProfile {
  id: string;
  email: string;
  name: string;
  picture?: string;
  verified_email: boolean;
}

export interface SupabaseUser {
  id: string;
  email: string;
  user_metadata: {
    name?: string;
    picture?: string;
    department?: string;
  };
  app_metadata: {
    provider?: string;
    providers?: string[];
    role?: string;
  };
}

export interface UpdateUserProfileRequest {
  name?: string;
  avatar_url?: string;
  department?: string;
}

export interface UpdateUserRoleRequest {
  role: 'user' | 'admin' | 'system';
}

export const UpdateUserProfileSchema = z.object({
  name: z.string().min(1).max(100).optional(),
  avatar_url: z.string().url().optional(),
  department: z.string().max(100).optional(),
});

export const UpdateUserRoleSchema = z.object({
  role: z.enum(['user', 'admin', 'system']),
});