import type { Donation, PaginationInfo } from '../types/donation';
import './DonationList.css';

interface DonationListProps {
  donations: Donation[];
  pagination: PaginationInfo;
  loading: boolean;
  error?: string;
  onPageChange: (page: number) => void;
}

export default function DonationList({ 
  donations, 
  pagination, 
  loading, 
  error, 
  onPageChange 
}: DonationListProps) {
  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'available': return '利用可能';
      case 'lending': return '貸出中';
      case 'maintenance': return 'メンテナンス中';
      case 'lost': return '紛失';
      default: return status;
    }
  };

  const getStatusClass = (status: string) => {
    switch (status) {
      case 'available': return 'status-available';
      case 'lending': return 'status-lending';
      case 'maintenance': return 'status-maintenance';
      case 'lost': return 'status-lost';
      default: return 'status-default';
    }
  };

  const renderPagination = () => {
    if (pagination.total_pages <= 1) return null;

    const pages = [];
    const maxVisiblePages = 5;
    let startPage = Math.max(1, pagination.page - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(pagination.total_pages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    // Previous button
    pages.push(
      <button
        key="prev"
        className="pagination-btn"
        onClick={() => onPageChange(pagination.page - 1)}
        disabled={pagination.page === 1}
      >
        ← 前
      </button>
    );

    // First page
    if (startPage > 1) {
      pages.push(
        <button
          key={1}
          className="pagination-btn"
          onClick={() => onPageChange(1)}
        >
          1
        </button>
      );
      if (startPage > 2) {
        pages.push(<span key="ellipsis1" className="pagination-ellipsis">...</span>);
      }
    }

    // Page numbers
    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          className={`pagination-btn ${i === pagination.page ? 'active' : ''}`}
          onClick={() => onPageChange(i)}
        >
          {i}
        </button>
      );
    }

    // Last page
    if (endPage < pagination.total_pages) {
      if (endPage < pagination.total_pages - 1) {
        pages.push(<span key="ellipsis2" className="pagination-ellipsis">...</span>);
      }
      pages.push(
        <button
          key={pagination.total_pages}
          className="pagination-btn"
          onClick={() => onPageChange(pagination.total_pages)}
        >
          {pagination.total_pages}
        </button>
      );
    }

    // Next button
    pages.push(
      <button
        key="next"
        className="pagination-btn"
        onClick={() => onPageChange(pagination.page + 1)}
        disabled={pagination.page === pagination.total_pages}
      >
        次 →
      </button>
    );

    return <div className="pagination">{pages}</div>;
  };

  if (loading) {
    return (
      <div className="donation-list">
        <div className="loading-state">
          <div className="spinner"></div>
          <p>寄贈物を検索しています...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="donation-list">
        <div className="error-state">
          <p>エラーが発生しました: {error}</p>
        </div>
      </div>
    );
  }

  if (donations.length === 0) {
    return (
      <div className="donation-list">
        <div className="empty-state">
          <p>条件に一致する寄贈物が見つかりませんでした。</p>
        </div>
      </div>
    );
  }

  return (
    <div className="donation-list">
      <div className="results-summary">
        <p>
          {pagination.total}件中 {((pagination.page - 1) * pagination.per_page) + 1}〜
          {Math.min(pagination.page * pagination.per_page, pagination.total)}件を表示
        </p>
      </div>

      <div className="donation-grid">
        {donations.map((donation) => (
          <div key={donation.id} className="donation-card">
            <div className="donation-header">
              <h3 className="donation-title">{donation.title}</h3>
              <span className={`status-badge ${getStatusClass(donation.status)}`}>
                {getStatusLabel(donation.status)}
              </span>
            </div>
            
            <div className="donation-meta">
              <div className="meta-item">
                <span className="meta-label">カテゴリ:</span>
                <span className="meta-value">
                  {donation.category.name}
                  {donation.sub_category && ` > ${donation.sub_category.name}`}
                </span>
              </div>
              
              <div className="meta-item">
                <span className="meta-label">保管場所:</span>
                <span className="meta-value">{donation.location.name}</span>
              </div>
              
              {donation.donor_name && (
                <div className="meta-item">
                  <span className="meta-label">寄贈者:</span>
                  <span className="meta-value">{donation.donor_name}</span>
                </div>
              )}
              
              <div className="meta-item">
                <span className="meta-label">寄贈日:</span>
                <span className="meta-value">{donation.donated_date}</span>
              </div>
            </div>

            {(donation.avg_rating || donation.review_count) && (
              <div className="donation-ratings">
                {donation.avg_rating && (
                  <span className="rating">
                    ⭐ {donation.avg_rating.toFixed(1)}
                  </span>
                )}
                {donation.review_count && (
                  <span className="review-count">
                    ({donation.review_count}件のレビュー)
                  </span>
                )}
              </div>
            )}

            <div className="donation-actions">
              <button 
                className="btn-primary"
                disabled={donation.status !== 'available'}
              >
                {donation.status === 'available' ? '詳細を見る' : '利用不可'}
              </button>
            </div>
          </div>
        ))}
      </div>

      {renderPagination()}
    </div>
  );
}