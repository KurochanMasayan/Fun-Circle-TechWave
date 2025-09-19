import { useState, useMemo, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import type { DonationItem } from '../types'
import ItemsList from '../components/ItemsList'

// TODO: APIからデータを取得する実装に変更
// サンプルデータ（将来的にはAPIから取得）
const SAMPLE_ITEMS: DonationItem[] = [
  {
    id: 1,
    name: 'Clean Code',
    category: '書籍',
    donor: '田中太郎',
    department: '開発部',
    status: '利用可能',
    location: '書庫A-1',
    addedDate: '2024-01-15',
    condition: '良好',
    quantity: 1,
  },
  {
    id: 2,
    name: 'Dell モニター 24インチ',
    category: '備品',
    donor: '佐藤花子',
    department: 'デザイン部',
    status: '使用中',
    location: '倉庫B-3',
    addedDate: '2024-01-10',
    condition: '良好',
    quantity: 1,
  },
  {
    id: 3,
    name: 'JavaScript入門',
    category: '書籍',
    donor: '山田次郎',
    department: '開発部',
    status: '利用可能',
    location: '書庫A-2',
    addedDate: '2024-01-08',
    condition: '普通',
    quantity: 1,
  },
  {
    id: 4,
    name: 'MacBook Pro 13インチ',
    category: '電子機器',
    donor: '鈴木一郎',
    department: '営業部',
    status: '廃棄予定',
    location: '倉庫C-1',
    addedDate: '2024-01-05',
    condition: '要修理',
    quantity: 1,
  },
  {
    id: 5,
    name: 'デザイン思考入門',
    category: '書籍',
    donor: '高橋美咲',
    department: 'デザイン部',
    status: '利用可能',
    location: '書庫B-1',
    addedDate: '2024-01-03',
    condition: '良好',
    quantity: 1,
  },
]

export default function ItemsListContainer() {
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState('')
  const [categoryFilter, setCategoryFilter] = useState<string>('all')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [items] = useState<DonationItem[]>(SAMPLE_ITEMS) // TODO: useEffectでAPIから取得
  const [loading] = useState(false) // TODO: 実際のローディング状態を管理

  const filteredItems = useMemo(() => {
    return items.filter(item => {
      const matchesSearch = searchQuery === '' ||
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.donor.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesCategory = categoryFilter === 'all' || item.category === categoryFilter
      const matchesStatus = statusFilter === 'all' || item.status === statusFilter

      return matchesSearch && matchesCategory && matchesStatus
    })
  }, [items, searchQuery, categoryFilter, statusFilter])

  const handleRegister = useCallback(() => {
    navigate('/items/register')
  }, [navigate])

  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query)
  }, [])

  const handleCategoryChange = useCallback((category: string) => {
    setCategoryFilter(category)
  }, [])

  const handleStatusChange = useCallback((status: string) => {
    setStatusFilter(status)
  }, [])

  const handleItemClick = useCallback((_itemId: number) => {
    // TODO: 詳細ページの実装
    // navigate(`/items/${_itemId}`)
    // console.log('Item clicked:', _itemId)
  }, [])

  return (
    <ItemsList
      items={filteredItems}
      loading={loading}
      searchQuery={searchQuery}
      categoryFilter={categoryFilter}
      statusFilter={statusFilter}
      onRegister={handleRegister}
      onSearch={handleSearch}
      onCategoryChange={handleCategoryChange}
      onStatusChange={handleStatusChange}
      onItemClick={handleItemClick}
    />
  )
}