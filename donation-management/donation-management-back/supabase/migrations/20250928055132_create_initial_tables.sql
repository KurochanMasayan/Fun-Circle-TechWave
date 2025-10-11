-- =================================================
-- 社内寄贈物管理システム 完全スキーマ（最終版）
-- 開発環境のCASCADE設定に完全対応
-- =================================================

-- =================================================
-- Phase 1: 独立テーブル作成（依存関係なし）
-- =================================================

-- 1. users テーブル
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(100) NOT NULL,
    role VARCHAR(20) NOT NULL DEFAULT 'user',
    avatar_url VARCHAR(500),
    department VARCHAR(100),
    is_active BOOLEAN NOT NULL DEFAULT true,
    last_login_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP WITH TIME ZONE
);

-- 2. categories テーブル
CREATE TABLE categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(50) UNIQUE NOT NULL,
    description TEXT,
    display_order INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- 3. locations テーブル
CREATE TABLE locations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) UNIQUE NOT NULL,
    building VARCHAR(50),
    floor VARCHAR(20),
    room VARCHAR(50),
    shelf VARCHAR(50),
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- 4. tags テーブル
CREATE TABLE tags (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(50) UNIQUE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- =================================================
-- Phase 2: 依存テーブル作成（外部キー制約あり）
-- =================================================

-- 5. sub_categories テーブル（categories依存）
CREATE TABLE sub_categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    category_id UUID NOT NULL,
    name VARCHAR(50) NOT NULL,
    description TEXT,
    display_order INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_sub_categories_category FOREIGN KEY (category_id) REFERENCES categories(id)
);

-- 6. donations テーブル（複数テーブル依存）
CREATE TABLE donations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(255) NOT NULL,
    category_id UUID NOT NULL,
    sub_category_id UUID,
    donor_name VARCHAR(100),
    donated_date DATE NOT NULL,
    location_id UUID NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'available',
    description TEXT,
    isbn VARCHAR(20),
    author VARCHAR(200),
    publisher VARCHAR(100),
    published_year INTEGER,
    manufacturer VARCHAR(100),
    model_number VARCHAR(100),
    condition VARCHAR(20),
    created_by UUID NOT NULL,
    updated_by UUID,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP WITH TIME ZONE,
    CONSTRAINT fk_donations_category FOREIGN KEY (category_id) REFERENCES categories(id),
    CONSTRAINT fk_donations_sub_category FOREIGN KEY (sub_category_id) REFERENCES sub_categories(id),
    CONSTRAINT fk_donations_location FOREIGN KEY (location_id) REFERENCES locations(id),
    CONSTRAINT fk_donations_created_by FOREIGN KEY (created_by) REFERENCES users(id),
    CONSTRAINT fk_donations_updated_by FOREIGN KEY (updated_by) REFERENCES users(id)
);

-- 7. donation_images テーブル（donations依存）
CREATE TABLE donation_images (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    donation_id UUID NOT NULL,
    image_url VARCHAR(500) NOT NULL,
    display_order INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_donation_images_donation FOREIGN KEY (donation_id) REFERENCES donations(id) ON DELETE CASCADE
);

-- 8. donation_tags テーブル（donations + tags依存）
CREATE TABLE donation_tags (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    donation_id UUID NOT NULL,
    tag_id UUID NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_donation_tags_donation FOREIGN KEY (donation_id) REFERENCES donations(id) ON DELETE CASCADE,
    CONSTRAINT fk_donation_tags_tag FOREIGN KEY (tag_id) REFERENCES tags(id),
    UNIQUE(donation_id, tag_id)
);

-- 9. lendings テーブル（donations + users依存）
CREATE TABLE lendings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    donation_id UUID NOT NULL,
    user_id UUID NOT NULL,
    borrowed_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    due_date DATE NOT NULL,
    returned_at TIMESTAMP WITH TIME ZONE,
    status VARCHAR(20) NOT NULL DEFAULT 'active',
    purpose TEXT,
    extension_count INTEGER NOT NULL DEFAULT 0,
    approved_by UUID,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_lendings_donation FOREIGN KEY (donation_id) REFERENCES donations(id),
    CONSTRAINT fk_lendings_user FOREIGN KEY (user_id) REFERENCES users(id),
    CONSTRAINT fk_lendings_approved_by FOREIGN KEY (approved_by) REFERENCES users(id)
);

-- 10. reviews テーブル（donations + users依存）
CREATE TABLE reviews (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    donation_id UUID NOT NULL,
    user_id UUID NOT NULL,
    rating INTEGER NOT NULL,
    comment TEXT,
    helpful_count INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP WITH TIME ZONE,
    CONSTRAINT fk_reviews_donation FOREIGN KEY (donation_id) REFERENCES donations(id),
    CONSTRAINT fk_reviews_user FOREIGN KEY (user_id) REFERENCES users(id),
    UNIQUE(donation_id, user_id)
);

-- 11. favorites テーブル（donations + users依存）
CREATE TABLE favorites (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    donation_id UUID NOT NULL,
    user_id UUID NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_favorites_donation FOREIGN KEY (donation_id) REFERENCES donations(id) ON DELETE CASCADE,
    CONSTRAINT fk_favorites_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    UNIQUE(donation_id, user_id)
);

-- =================================================
-- インデックス作成
-- =================================================

-- users テーブル
CREATE UNIQUE INDEX idx_users_email ON users(email) WHERE deleted_at IS NULL;
CREATE INDEX idx_users_role ON users(role);
CREATE INDEX idx_users_department ON users(department);

-- categories テーブル
CREATE UNIQUE INDEX idx_categories_name ON categories(name);
CREATE INDEX idx_categories_display_order ON categories(display_order);

-- sub_categories テーブル
CREATE INDEX idx_sub_categories_category_id ON sub_categories(category_id);
CREATE INDEX idx_sub_categories_display_order ON sub_categories(display_order);

-- locations テーブル
CREATE UNIQUE INDEX idx_locations_name ON locations(name);

-- tags テーブル
CREATE UNIQUE INDEX idx_tags_name ON tags(name);

-- donations テーブル
CREATE INDEX idx_donations_title ON donations(title);
CREATE INDEX idx_donations_category_id ON donations(category_id);
CREATE INDEX idx_donations_sub_category_id ON donations(sub_category_id);
CREATE INDEX idx_donations_location_id ON donations(location_id);
CREATE INDEX idx_donations_status ON donations(status);
CREATE INDEX idx_donations_donated_date ON donations(donated_date);
CREATE INDEX idx_donations_created_by ON donations(created_by);

-- lendings テーブル
CREATE INDEX idx_lendings_donation_id ON lendings(donation_id);
CREATE INDEX idx_lendings_user_id ON lendings(user_id);
CREATE INDEX idx_lendings_status ON lendings(status);
CREATE INDEX idx_lendings_due_date ON lendings(due_date);

-- reviews テーブル
CREATE INDEX idx_reviews_donation_id ON reviews(donation_id);
CREATE INDEX idx_reviews_user_id ON reviews(user_id);
CREATE INDEX idx_reviews_rating ON reviews(rating);

-- =================================================
-- 制約追加
-- =================================================

-- ユーザーロール制約
ALTER TABLE users ADD CONSTRAINT chk_users_role 
    CHECK (role IN ('user', 'admin', 'system'));

-- 寄贈物ステータス制約
ALTER TABLE donations ADD CONSTRAINT chk_donations_status 
    CHECK (status IN ('available', 'lending', 'maintenance', 'lost'));

-- 寄贈物状態制約
ALTER TABLE donations ADD CONSTRAINT chk_donations_condition 
    CHECK (condition IN ('new', 'good', 'fair', 'poor'));

-- 貸出ステータス制約
ALTER TABLE lendings ADD CONSTRAINT chk_lendings_status 
    CHECK (status IN ('active', 'returned', 'overdue', 'cancelled'));

-- 貸出延長回数制約
ALTER TABLE lendings ADD CONSTRAINT chk_lendings_extension_count 
    CHECK (extension_count >= 0 AND extension_count <= 2);

-- レビュー評価制約
ALTER TABLE reviews ADD CONSTRAINT chk_reviews_rating 
    CHECK (rating >= 1 AND rating <= 5);

-- =================================================
-- Row Level Security (RLS) 有効化
-- =================================================

ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE sub_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE locations ENABLE ROW LEVEL SECURITY;
ALTER TABLE tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE donations ENABLE ROW LEVEL SECURITY;
ALTER TABLE donation_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE donation_tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE lendings ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE favorites ENABLE ROW LEVEL SECURITY;

-- =================================================
-- RLS ポリシー設定
-- =================================================

-- users ポリシー
CREATE POLICY "Users can view all active users" ON users
    FOR SELECT USING (deleted_at IS NULL);

CREATE POLICY "Users can update own profile" ON users
    FOR UPDATE USING (auth.uid() = id);

-- categories ポリシー（全員閲覧可能）
CREATE POLICY "All users can view categories" ON categories
    FOR SELECT USING (true);

CREATE POLICY "Admins can manage categories" ON categories
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM users
            WHERE users.id = auth.uid() AND users.role IN ('admin', 'system')
        )
    );

-- sub_categories ポリシー
CREATE POLICY "All users can view sub_categories" ON sub_categories
    FOR SELECT USING (true);

-- locations ポリシー（全員閲覧可能）
CREATE POLICY "All users can view locations" ON locations
    FOR SELECT USING (true);

-- tags ポリシー（全員閲覧可能）
CREATE POLICY "All users can view tags" ON tags
    FOR SELECT USING (true);

-- donations ポリシー
CREATE POLICY "All users can view active donations" ON donations
    FOR SELECT USING (deleted_at IS NULL);

CREATE POLICY "Users can create donations" ON donations
    FOR INSERT WITH CHECK (auth.uid() = created_by);

CREATE POLICY "Donors and admins can update donations" ON donations
    FOR UPDATE USING (
        auth.uid() = created_by OR 
        EXISTS (
            SELECT 1 FROM users
            WHERE users.id = auth.uid() AND users.role IN ('admin', 'system')
        )
    );

-- lendings ポリシー
CREATE POLICY "Users can view own lendings" ON lendings
    FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Users can create own lendings" ON lendings
    FOR INSERT WITH CHECK (user_id = auth.uid());

CREATE POLICY "Admins can view all lendings" ON lendings
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM users
            WHERE users.id = auth.uid() AND users.role IN ('admin', 'system')
        )
    );

-- reviews ポリシー
CREATE POLICY "All users can view reviews" ON reviews
    FOR SELECT USING (deleted_at IS NULL);

CREATE POLICY "Users can create own reviews" ON reviews
    FOR INSERT WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update own reviews" ON reviews
    FOR UPDATE USING (user_id = auth.uid());

-- favorites ポリシー
CREATE POLICY "Users can manage own favorites" ON favorites
    FOR ALL USING (user_id = auth.uid());

-- =================================================
-- 更新日時自動更新トリガー
-- =================================================

-- 更新日時自動更新関数
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 各テーブルにトリガー適用
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_categories_updated_at BEFORE UPDATE ON categories
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_sub_categories_updated_at BEFORE UPDATE ON sub_categories
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_locations_updated_at BEFORE UPDATE ON locations
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_donations_updated_at BEFORE UPDATE ON donations
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_lendings_updated_at BEFORE UPDATE ON lendings
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_reviews_updated_at BEFORE UPDATE ON reviews
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- =================================================
-- ビジネスロジックトリガー
-- =================================================

-- 貸出時の寄贈物ステータス更新トリガー
CREATE OR REPLACE FUNCTION update_donation_status_on_lending()
RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP = 'INSERT' AND NEW.status = 'active' THEN
        UPDATE donations SET status = 'lending' WHERE id = NEW.donation_id;
    ELSIF TG_OP = 'UPDATE' AND NEW.status = 'returned' THEN
        UPDATE donations SET status = 'available' WHERE id = NEW.donation_id;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_donation_status AFTER INSERT OR UPDATE ON lendings
    FOR EACH ROW EXECUTE FUNCTION update_donation_status_on_lending();