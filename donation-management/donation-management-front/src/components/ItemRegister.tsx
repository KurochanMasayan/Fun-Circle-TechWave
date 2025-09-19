import type { User } from '@supabase/supabase-js'
import type { ItemFormData } from '../types'
import PageLayout from './PageLayout'
import Button from './ui/Button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/Card'
import Input from './ui/Input'
import Select from './ui/Select'
import Textarea from './ui/Textarea'
import styles from './ItemRegister.module.css'

interface ItemRegisterProps {
  user: User
  formData: ItemFormData
  errors: Partial<ItemFormData>
  loading: boolean
  onInputChange: (field: keyof ItemFormData, value: string) => void
  onSubmit: (e: React.FormEvent) => void
  onCancel: () => void
  onBack: () => void
}

export default function ItemRegister({
  user,
  formData,
  errors,
  loading,
  onInputChange,
  onSubmit,
  onCancel,
  onBack,
}: ItemRegisterProps) {
  return (
    <PageLayout
      title="寄贈物登録"
      description="新しい寄贈物を登録します"
      headerAction={
        <Button variant="ghost" size="small" onClick={onBack}>
          ← 戻る
        </Button>
      }
    >
      <form onSubmit={onSubmit}>
        <div className={styles.formContainer}>
          <div className={styles.mainForm}>
            <Card>
              <CardHeader>
                <CardTitle>基本情報</CardTitle>
                <CardDescription>寄贈物の基本的な情報を入力してください</CardDescription>
              </CardHeader>
              <CardContent>
                <div className={styles.formGrid}>
                  <Input
                    label="品名 *"
                    placeholder="例: Clean Code"
                    value={formData.itemName}
                    onChange={(e) => onInputChange('itemName', e.target.value)}
                    error={errors.itemName}
                    fullWidth
                  />
                  <Select
                    label="カテゴリ *"
                    value={formData.category}
                    onChange={(e) => onInputChange('category', e.target.value)}
                    error={errors.category}
                    fullWidth
                  >
                    <option value="">カテゴリを選択</option>
                    <option value="書籍">書籍</option>
                    <option value="備品">備品</option>
                    <option value="電子機器">電子機器</option>
                    <option value="家具">家具</option>
                    <option value="その他">その他</option>
                  </Select>
                </div>

                <div className={styles.formGrid}>
                  <Input
                    label="型番"
                    placeholder="例: ABC-123"
                    value={formData.modelNumber}
                    onChange={(e) => onInputChange('modelNumber', e.target.value)}
                    error={errors.modelNumber}
                    fullWidth
                  />
                  <Input
                    label="メーカー"
                    placeholder="例: Dell"
                    value={formData.manufacturer}
                    onChange={(e) => onInputChange('manufacturer', e.target.value)}
                    error={errors.manufacturer}
                    fullWidth
                  />
                </div>

                <div className={styles.formGrid}>
                  <Input
                    label="取得日"
                    type="date"
                    value={formData.acquisitionDate}
                    onChange={(e) => onInputChange('acquisitionDate', e.target.value)}
                    error={errors.acquisitionDate}
                    fullWidth
                  />
                  <Input
                    label="取得価格（円）"
                    type="number"
                    placeholder="例: 5000"
                    value={formData.acquisitionPrice}
                    onChange={(e) => onInputChange('acquisitionPrice', e.target.value)}
                    error={errors.acquisitionPrice}
                    fullWidth
                  />
                </div>

                <div className={styles.formField}>
                  <label className={styles.label}>状態 *</label>
                  {errors.condition && (
                    <span className={styles.errorMessage}>{errors.condition}</span>
                  )}
                  <div className={styles.radioGroup}>
                    {[
                      { value: '優良', label: '優良（ほぼ新品）' },
                      { value: '良好', label: '良好（軽微な使用感）' },
                      { value: '普通', label: '普通（使用感あり）' },
                      { value: '要修理', label: '要修理（動作に問題あり）' },
                    ].map(option => (
                      <label key={option.value} className={styles.radioLabel}>
                        <input
                          type="radio"
                          name="condition"
                          value={option.value}
                          checked={formData.condition === option.value}
                          onChange={(e) => onInputChange('condition', e.target.value)}
                          className={styles.radioInput}
                        />
                        <span>{option.label}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>保管・管理情報</CardTitle>
                <CardDescription>保管場所と管理に関する情報</CardDescription>
              </CardHeader>
              <CardContent>
                <div className={styles.formGrid}>
                  <Select
                    label="保管場所 *"
                    value={formData.location}
                    onChange={(e) => onInputChange('location', e.target.value)}
                    error={errors.location}
                    fullWidth
                  >
                    <option value="">保管場所を選択</option>
                    <option value="書庫A-1">書庫A-1</option>
                    <option value="書庫A-2">書庫A-2</option>
                    <option value="書庫B-1">書庫B-1</option>
                    <option value="倉庫B-3">倉庫B-3</option>
                    <option value="倉庫C-1">倉庫C-1</option>
                  </Select>
                  <Input
                    label="数量"
                    type="number"
                    value={formData.quantity}
                    onChange={(e) => onInputChange('quantity', e.target.value)}
                    error={errors.quantity}
                    min="1"
                    fullWidth
                  />
                </div>

                <Textarea
                  label="説明・コメント"
                  placeholder="寄贈理由、使用方法、注意事項など"
                  value={formData.description}
                  onChange={(e) => onInputChange('description', e.target.value)}
                  error={errors.description}
                  rows={4}
                  fullWidth
                />
              </CardContent>
            </Card>
          </div>

          <div className={styles.sidebar}>
            <Card>
              <CardHeader>
                <CardTitle>寄贈者情報</CardTitle>
                <CardDescription>自動取得</CardDescription>
              </CardHeader>
              <CardContent>
                <div className={styles.donorInfo}>
                  <div className={styles.infoField}>
                    <label className={styles.infoLabel}>寄贈者名</label>
                    <div className={styles.infoValue}>{user.email?.split('@')[0] || '不明'}</div>
                  </div>
                  <div className={styles.infoField}>
                    <label className={styles.infoLabel}>部署</label>
                    <div className={styles.infoValue}>開発部</div>
                  </div>
                  <div className={styles.infoField}>
                    <label className={styles.infoLabel}>連絡先</label>
                    <div className={styles.infoValue}>{user.email}</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className={styles.actions}>
              <Button
                type="submit"
                fullWidth
                loading={loading}
                disabled={loading}
              >
                {loading ? '登録中...' : '登録する'}
              </Button>
              <Button
                type="button"
                variant="secondary"
                fullWidth
                onClick={onCancel}
                disabled={loading}
              >
                キャンセル
              </Button>
            </div>
          </div>
        </div>
      </form>
    </PageLayout>
  )
}