import { useLocation, Link } from 'react-router-dom'
import PageLayout from './PageLayout'
import Button from './ui/Button'
import { Card, CardContent } from './ui/Card'

export default function NotFound() {
  const location = useLocation()
  const isComingSoon = ['/analytics', '/users', '/departments'].includes(location.pathname)

  if (isComingSoon) {
    return (
      <PageLayout
        title="準備中"
        description="この機能は現在開発中です"
      >
        <Card>
          <CardContent style={{ textAlign: 'center', padding: '3rem' }}>
            <h2 style={{ fontSize: '1.5rem', margin: '0 0 1rem 0', color: '#374151' }}>
              🚧 機能準備中
            </h2>
            <p style={{ color: '#6b7280', marginBottom: '2rem' }}>
              この機能は現在開発中です。近日中にリリース予定です。
            </p>
            <Link to="/dashboard">
              <Button variant="primary">
                ダッシュボードに戻る
              </Button>
            </Link>
          </CardContent>
        </Card>
      </PageLayout>
    )
  }

  return (
    <PageLayout
      title="ページが見つかりません"
      description="お探しのページは存在しません"
    >
      <Card>
        <CardContent style={{ textAlign: 'center', padding: '3rem' }}>
          <h1 style={{ fontSize: '4rem', margin: '0', color: '#6b7280' }}>404</h1>
          <p style={{ fontSize: '1.25rem', color: '#4b5563', margin: '1rem 0' }}>
            ページが見つかりません
          </p>
          <p style={{ color: '#6b7280', marginBottom: '2rem' }}>
            お探しのページは存在しないか、移動された可能性があります。
          </p>
          <Link to="/dashboard">
            <Button variant="primary">
              ダッシュボードに戻る
            </Button>
          </Link>
        </CardContent>
      </Card>
    </PageLayout>
  )
}