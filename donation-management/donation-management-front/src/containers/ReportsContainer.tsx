import { useState, useMemo, useCallback } from 'react'
import type { ReportsStats, CategoryStats, DepartmentStats, MonthlyTrend, PopularItem } from '../types'
import Reports from '../components/Reports'

// TODO: 実際のAPIからレポートデータを取得
// サンプルデータ（将来的にはAPIから取得）
const SAMPLE_STATS: ReportsStats = {
  totalItems: 156,
  totalUsers: 23,
  activeItems: 89,
  monthlyDonations: 12,
}

const SAMPLE_CATEGORIES: CategoryStats[] = [
  { name: '書籍', count: 89, percentage: 57 },
  { name: 'PC・モニター', count: 34, percentage: 22 },
  { name: 'その他備品', count: 33, percentage: 21 },
]

const SAMPLE_DEPARTMENTS: DepartmentStats[] = [
  { name: '開発部', donations: 45, usage: 67 },
  { name: 'デザイン部', donations: 23, usage: 34 },
  { name: '営業部', donations: 12, usage: 28 },
  { name: 'マーケティング部', donations: 8, usage: 15 },
]

const SAMPLE_TRENDS: MonthlyTrend[] = [
  { month: '10月', donations: 8, usage: 23 },
  { month: '11月', donations: 12, usage: 31 },
  { month: '12月', donations: 15, usage: 28 },
  { month: '1月', donations: 12, usage: 35 },
]

const SAMPLE_POPULAR: PopularItem[] = [
  { name: 'Clean Code', category: '書籍', count: 15 },
  { name: 'Dell モニター', category: '備品', count: 12 },
  { name: 'JavaScript入門', category: '書籍', count: 8 },
]

export default function ReportsContainer() {
  const [period, setPeriod] = useState('month')
  const [activeTab, setActiveTab] = useState('overview')
  const [loading, setLoading] = useState(false)

  // TODO: 期間に応じたAPIコールの実装
  // 期間に応じたデータのフィルタリング（実際のAPIでは期間パラメータを送信）
  const filteredData = useMemo(() => {
    // TODO: 本来はperiodに応じてAPIからデータを取得
    // const response = await fetch(`/api/reports?period=${period}`)
    return {
      stats: SAMPLE_STATS,
      categories: SAMPLE_CATEGORIES,
      departments: SAMPLE_DEPARTMENTS,
      trends: SAMPLE_TRENDS,
      popular: SAMPLE_POPULAR,
    }
  }, [])

  const handlePeriodChange = useCallback((newPeriod: string) => {
    setPeriod(newPeriod)
  }, [])

  const handleTabChange = useCallback((tab: string) => {
    setActiveTab(tab)
  }, [])

  const handleExport = useCallback(async () => {
    setLoading(true)
    try {
      // TODO: CSVエクスポート処理の実装
      // TODO: PDF エクスポート機能の追加
      const csv = generateCSV(filteredData)
      downloadCSV(csv, `report_${period}_${Date.now()}.csv`)
    } catch (error) {
      console.error('Export failed:', error)
      // TODO: エラートースト通知の実装
    } finally {
      setLoading(false)
    }
  }, [period, filteredData])

  return (
    <Reports
      stats={filteredData.stats}
      categories={filteredData.categories}
      departments={filteredData.departments}
      trends={filteredData.trends}
      popularItems={filteredData.popular}
      period={period}
      activeTab={activeTab}
      loading={loading}
      onPeriodChange={handlePeriodChange}
      onTabChange={handleTabChange}
      onExport={handleExport}
    />
  )
}

// CSV生成ヘルパー関数
interface CSVData {
  stats: ReportsStats
  categories: CategoryStats[]
  departments: DepartmentStats[]
  trends: MonthlyTrend[]
  popular: PopularItem[]
}

function generateCSV(data: CSVData): string {
  // 簡単なCSV生成ロジック
  const rows = [
    ['項目', '数値'],
    ['総寄贈物数', data.stats.totalItems],
    ['利用可能数', data.stats.activeItems],
    ['登録ユーザー', data.stats.totalUsers],
    ['今月の寄贈', data.stats.monthlyDonations],
  ]
  return rows.map(row => row.join(',')).join('\n')
}

// CSVダウンロードヘルパー関数
function downloadCSV(content: string, filename: string): void {
  const blob = new Blob([content], { type: 'text/csv;charset=utf-8;' })
  const link = document.createElement('a')
  const url = URL.createObjectURL(blob)

  link.setAttribute('href', url)
  link.setAttribute('download', filename)
  link.style.visibility = 'hidden'

  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}