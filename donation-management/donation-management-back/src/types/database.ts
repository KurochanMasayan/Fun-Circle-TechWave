export interface DatabaseUser {
  id: string;
  email: string;
  name: string;
  role: 'user' | 'admin' | 'system';
  avatarUrl?: string;
  department?: string;
  isActive: boolean;
  lastLoginAt?: string;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
}

export interface DatabaseCategory {
  id: string;
  name: string;
  description?: string;
  displayOrder: number;
  createdAt: string;
  updatedAt: string;
}

export interface DatabaseSubCategory {
  id: string;
  categoryId: string;
  name: string;
  description?: string;
  displayOrder: number;
  createdAt: string;
  updatedAt: string;
}

export interface DatabaseLocation {
  id: string;
  name: string;
  building?: string;
  floor?: string;
  room?: string;
  shelf?: string;
  createdAt: string;
  updatedAt: string;
}

export interface DatabaseDonation {
  id: string;
  title: string;
  categoryId: string;
  subCategoryId?: string;
  donorName?: string;
  donatedDate: string;
  locationId: string;
  status: 'available' | 'lending' | 'maintenance' | 'lost';
  description?: string;
  isbn?: string;
  author?: string;
  publisher?: string;
  publishedYear?: number;
  manufacturer?: string;
  modelNumber?: string;
  condition?: 'new' | 'good' | 'fair' | 'poor';
  createdBy: string;
  updatedBy?: string;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
}

export interface DatabaseDonationImage {
  id: string;
  donationId: string;
  imageUrl: string;
  displayOrder: number;
  createdAt: string;
}

export interface DatabaseLending {
  id: string;
  donationId: string;
  userId: string;
  borrowedAt: string;
  dueDate: string;
  returnedAt?: string;
  status: 'active' | 'returned' | 'overdue' | 'cancelled';
  purpose?: string;
  extensionCount: number;
  approvedBy?: string;
  createdAt: string;
  updatedAt: string;
}

export interface DatabaseReview {
  id: string;
  donationId: string;
  userId: string;
  rating: number;
  comment?: string;
  helpfulCount: number;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
}

export interface DatabaseFavorite {
  id: string;
  donationId: string;
  userId: string;
  createdAt: string;
}

export interface DatabaseTag {
  id: string;
  name: string;
  createdAt: string;
}

export interface DatabaseDonationTag {
  id: string;
  donationId: string;
  tagId: string;
  createdAt: string;
}

export interface DatabaseTables {
  users: DatabaseUser;
  categories: DatabaseCategory;
  subCategories: DatabaseSubCategory;
  locations: DatabaseLocation;
  donations: DatabaseDonation;
  donationImages: DatabaseDonationImage;
  lendings: DatabaseLending;
  reviews: DatabaseReview;
  favorites: DatabaseFavorite;
  tags: DatabaseTag;
  donationTags: DatabaseDonationTag;
}

export type DatabaseInsert<T extends keyof DatabaseTables> = Omit<
  DatabaseTables[T],
  'id' | 'createdAt' | 'updatedAt'
> & {
  id?: string;
  createdAt?: string;
  updatedAt?: string;
};

export type DatabaseUpdate<T extends keyof DatabaseTables> = Partial<
  Omit<DatabaseTables[T], 'id' | 'createdAt'>
> & {
  updatedAt?: string;
};