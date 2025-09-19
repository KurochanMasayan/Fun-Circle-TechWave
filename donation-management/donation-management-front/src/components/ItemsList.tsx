import type { DonationItem, ItemStatus } from '../types'
import PageLayout from './PageLayout'
import Button from './ui/Button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/Card'
import Badge from './ui/Badge'
import Select from './ui/Select'
import Input from './ui/Input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/Table'
import styles from './ItemsList.module.css'

interface ItemsListProps {
  items: DonationItem[]
  loading: boolean
  searchQuery: string
  categoryFilter: string
  statusFilter: string
  onRegister: () => void
  onSearch: (query: string) => void
  onCategoryChange: (category: string) => void
  onStatusChange: (status: string) => void
  onItemClick: (itemId: number) => void
}

export default function ItemsList({
  items,
  loading,
  searchQuery,
  categoryFilter,
  statusFilter,
  onRegister,
  onSearch,
  onCategoryChange,
  onStatusChange,
  onItemClick,
}: ItemsListProps) {
  const getStatusVariant = (status: ItemStatus): 'default' | 'success' | 'warning' | 'danger' => {
    switch (status) {
      case '利用可能':
        return 'success'
      case '使用中':
        return 'warning'
      case '廃棄予定':
        return 'danger'
      default:
        return 'default'
    }
  }

  return (
    <PageLayout
      title="寄贈物一覧"
      description="登録されている寄贈物の管理"
      headerAction={
        <Button onClick={onRegister}>
          新規登録
        </Button>
      }
    >
      <Card className={styles.filterCard}>
        <CardContent>
          <div className={styles.filterContainer}>
            <div className={styles.searchBox}>
              <Input
                placeholder="寄贈物名、寄贈者名で検索..."
                value={searchQuery}
                onChange={(e) => onSearch(e.target.value)}
                fullWidth
              />
            </div>
            <div className={styles.filterControls}>
              <Select
                value={categoryFilter}
                onChange={(e) => onCategoryChange(e.target.value)}
              >
                <option value="all">全カテゴリ</option>
                <option value="書籍">書籍</option>
                <option value="備品">備品</option>
                <option value="電子機器">電子機器</option>
                <option value="家具">家具</option>
                <option value="その他">その他</option>
              </Select>
              <Select
                value={statusFilter}
                onChange={(e) => onStatusChange(e.target.value)}
              >
                <option value="all">全ステータス</option>
                <option value="利用可能">利用可能</option>
                <option value="使用中">使用中</option>
                <option value="廃棄予定">廃棄予定</option>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>寄贈物一覧 ({items.length}件)</CardTitle>
          <CardDescription>登録されている寄贈物の詳細情報</CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className={styles.loading}>読み込み中...</div>
          ) : items.length === 0 ? (
            <div className={styles.noData}>該当する寄贈物がありません</div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>品名</TableHead>
                  <TableHead>カテゴリ</TableHead>
                  <TableHead>寄贈者</TableHead>
                  <TableHead>状態</TableHead>
                  <TableHead>保管場所</TableHead>
                  <TableHead>登録日</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {items.map((item) => (
                  <TableRow
                    key={item.id}
                    onClick={() => onItemClick(item.id)}
                  >
                    <TableCell>
                      <div className={styles.itemName}>
                        <strong>{item.name}</strong>
                        <span className={styles.condition}>状態: {item.condition}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="default">{item.category}</Badge>
                    </TableCell>
                    <TableCell>
                      <div className={styles.donor}>
                        <span>{item.donor}</span>
                        <span className={styles.department}>{item.department}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={getStatusVariant(item.status)}>{item.status}</Badge>
                    </TableCell>
                    <TableCell>{item.location}</TableCell>
                    <TableCell>{item.addedDate}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </PageLayout>
  )
}