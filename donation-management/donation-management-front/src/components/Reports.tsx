import type { ReportsStats, CategoryStats, DepartmentStats, MonthlyTrend, PopularItem } from '../types'
import PageLayout from './PageLayout'
import Button from './ui/Button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/Card'
import Badge from './ui/Badge'
import Select from './ui/Select'
import styles from './Reports.module.css'

interface ReportsProps {
  stats: ReportsStats
  categories: CategoryStats[]
  departments: DepartmentStats[]
  trends: MonthlyTrend[]
  popularItems: PopularItem[]
  period: string
  activeTab: string
  loading: boolean
  onPeriodChange: (period: string) => void
  onTabChange: (tab: string) => void
  onExport: () => void
}

export default function Reports({
  stats,
  categories,
  departments,
  trends,
  popularItems,
  period,
  activeTab,
  loading,
  onPeriodChange,
  onTabChange,
  onExport,
}: ReportsProps) {
  return (
    <PageLayout
      title="レポート・分析"
      description="寄贈物の利用状況と統計情報"
      headerAction={
        <div className={styles.headerActions}>
          <Select value={period} onChange={(e) => onPeriodChange(e.target.value)}>
            <option value="week">週間</option>
            <option value="month">月間</option>
            <option value="quarter">四半期</option>
            <option value="year">年間</option>
          </Select>
          <Button variant="primary" onClick={onExport} loading={loading}>
            エクスポート
          </Button>
        </div>
      }
    >
      <div className={styles.statsGrid}>
        <Card>
          <CardContent>
            <div className={styles.statCard}>
              <div>
                <p className={styles.statLabel}>総寄贈物数</p>
                <p className={styles.statValue}>{stats.totalItems}</p>
                <p className={styles.statChange}>+12% 前月比</p>
              </div>
              <div className={styles.statIcon}>📦</div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <div className={styles.statCard}>
              <div>
                <p className={styles.statLabel}>利用可能数</p>
                <p className={styles.statValue}>{stats.activeItems}</p>
                <p className={styles.statInfo}>
                  利用率 {Math.round((stats.activeItems / stats.totalItems) * 100)}%
                </p>
              </div>
              <div className={styles.statIcon}>📚</div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <div className={styles.statCard}>
              <div>
                <p className={styles.statLabel}>登録ユーザー</p>
                <p className={styles.statValue}>{stats.totalUsers}</p>
                <p className={styles.statChange}>+3名 今月</p>
              </div>
              <div className={styles.statIcon}>👥</div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <div className={styles.statCard}>
              <div>
                <p className={styles.statLabel}>今月の寄贈</p>
                <p className={styles.statValue}>{stats.monthlyDonations}</p>
                <p className={styles.statInfo}>平均 3件/週</p>
              </div>
              <div className={styles.statIcon}>📅</div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className={styles.tabs}>
        <div className={styles.tabList}>
          {['overview', 'categories', 'departments', 'trends'].map((tab) => (
            <button
              key={tab}
              className={`${styles.tabButton} ${activeTab === tab ? styles.tabButtonActive : ''}`}
              onClick={() => onTabChange(tab)}
            >
              {tab === 'overview' && '概要'}
              {tab === 'categories' && 'カテゴリ別'}
              {tab === 'departments' && '部署別'}
              {tab === 'trends' && 'トレンド'}
            </button>
          ))}
        </div>

        <div className={styles.tabContent}>
          {activeTab === 'overview' && (
            <div className={styles.overviewGrid}>
              <Card>
                <CardHeader>
                  <CardTitle>利用状況サマリー</CardTitle>
                  <CardDescription>現在の寄贈物利用状況</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className={styles.statusList}>
                    <div className={styles.statusItem}>
                      <span className={styles.statusLabel}>利用可能</span>
                      <div className={styles.statusBar}>
                        <div className={styles.statusBarFill} style={{ width: '57%', backgroundColor: '#10b981' }}></div>
                      </div>
                      <span className={styles.statusCount}>89件</span>
                    </div>
                    <div className={styles.statusItem}>
                      <span className={styles.statusLabel}>使用中</span>
                      <div className={styles.statusBar}>
                        <div className={styles.statusBarFill} style={{ width: '29%', backgroundColor: '#3b82f6' }}></div>
                      </div>
                      <span className={styles.statusCount}>45件</span>
                    </div>
                    <div className={styles.statusItem}>
                      <span className={styles.statusLabel}>廃棄予定</span>
                      <div className={styles.statusBar}>
                        <div className={styles.statusBarFill} style={{ width: '14%', backgroundColor: '#ef4444' }}></div>
                      </div>
                      <span className={styles.statusCount}>22件</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>人気の寄贈物</CardTitle>
                  <CardDescription>利用頻度の高い寄贈物</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className={styles.popularList}>
                    {popularItems.map((item, index) => (
                      <div key={index} className={styles.popularItem}>
                        <div className={styles.popularInfo}>
                          <span className={styles.popularIcon}>
                            {item.category === '書籍' ? '📖' : '💻'}
                          </span>
                          <span className={styles.popularName}>{item.name}</span>
                        </div>
                        <Badge variant="secondary">{item.count}回</Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === 'categories' && (
            <Card>
              <CardHeader>
                <CardTitle>カテゴリ別統計</CardTitle>
                <CardDescription>寄贈物のカテゴリ別分布</CardDescription>
              </CardHeader>
              <CardContent>
                <div className={styles.categoryList}>
                  {categories.map((category, index) => (
                    <div key={index} className={styles.categoryItem}>
                      <div className={styles.categoryHeader}>
                        <span className={styles.categoryName}>{category.name}</span>
                        <span className={styles.categoryCount}>
                          {category.count}件 ({category.percentage}%)
                        </span>
                      </div>
                      <div className={styles.progressBar}>
                        <div
                          className={styles.progressBarFill}
                          style={{ width: `${category.percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {activeTab === 'departments' && (
            <Card>
              <CardHeader>
                <CardTitle>部署別活動状況</CardTitle>
                <CardDescription>各部署の寄贈・利用状況</CardDescription>
              </CardHeader>
              <CardContent>
                <div className={styles.departmentList}>
                  {departments.map((dept, index) => (
                    <div key={index} className={styles.departmentItem}>
                      <div className={styles.departmentHeader}>
                        <h3 className={styles.departmentName}>{dept.name}</h3>
                        <div className={styles.departmentStats}>
                          <span>寄贈: {dept.donations}件</span>
                          <span>利用: {dept.usage}件</span>
                        </div>
                      </div>
                      <div className={styles.departmentBars}>
                        <div className={styles.barGroup}>
                          <span className={styles.barLabel}>寄贈数</span>
                          <div className={styles.progressBar}>
                            <div
                              className={styles.progressBarFillGreen}
                              style={{ width: `${(dept.donations / 45) * 100}%` }}
                            ></div>
                          </div>
                        </div>
                        <div className={styles.barGroup}>
                          <span className={styles.barLabel}>利用数</span>
                          <div className={styles.progressBar}>
                            <div
                              className={styles.progressBarFillBlue}
                              style={{ width: `${(dept.usage / 67) * 100}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {activeTab === 'trends' && (
            <Card>
              <CardHeader>
                <CardTitle>月別トレンド</CardTitle>
                <CardDescription>寄贈・利用の月別推移</CardDescription>
              </CardHeader>
              <CardContent>
                <div className={styles.trendList}>
                  {trends.map((data, index) => (
                    <div key={index} className={styles.trendItem}>
                      <div className={styles.trendMonth}>{data.month}</div>
                      <div className={styles.trendBars}>
                        <div className={styles.trendBar}>
                          <div className={styles.trendBarHeader}>
                            <span>寄贈</span>
                            <span>{data.donations}件</span>
                          </div>
                          <div className={styles.progressBar}>
                            <div
                              className={styles.progressBarFillGreen}
                              style={{ width: `${(data.donations / 15) * 100}%` }}
                            ></div>
                          </div>
                        </div>
                        <div className={styles.trendBar}>
                          <div className={styles.trendBarHeader}>
                            <span>利用</span>
                            <span>{data.usage}件</span>
                          </div>
                          <div className={styles.progressBar}>
                            <div
                              className={styles.progressBarFillBlue}
                              style={{ width: `${(data.usage / 35) * 100}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </PageLayout>
  )
}