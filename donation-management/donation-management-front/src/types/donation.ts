export interface Donation {
  id: string;
  title: string;
  category: {
    id: string;
    name: string;
  };
  sub_category?: {
    id: string;
    name: string;
  };
  status: 'available' | 'lending' | 'maintenance' | 'lost';
  location: {
    id: string;
    name: string;
  };
  donor_name?: string;
  donated_date: string;
  avg_rating?: number;
  review_count?: number;
  image_urls?: string[];
}

export interface Category {
  id: string;
  name: string;
  description?: string;
  display_order: number;
  sub_categories: SubCategory[];
}

export interface SubCategory {
  id: string;
  name: string;
  description?: string;
  display_order: number;
}

export interface Location {
  id: string;
  name: string;
  building?: string;
  floor?: string;
  room?: string;
  shelf?: string;
}

export interface SearchFilters {
  keyword: string;
  category_id?: string;
  sub_category_id?: string;
  status?: 'available' | 'lending' | 'maintenance' | 'lost';
  location_id?: string;
  sort: 'created_at' | '-created_at' | 'title' | '-title' | 'popular';
  page: number;
  per_page: number;
}

export interface PaginationInfo {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
}