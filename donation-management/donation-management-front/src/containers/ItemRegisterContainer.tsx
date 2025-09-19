import { useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import type { ItemFormData } from '../types'
import ItemRegister from '../components/ItemRegister'

export default function ItemRegisterContainer() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const [formData, setFormData] = useState<ItemFormData>({
    itemName: '',
    category: '',
    modelNumber: '',
    manufacturer: '',
    acquisitionDate: '',
    acquisitionPrice: '',
    condition: '',
    location: '',
    quantity: '1',
    description: '',
  })
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<Partial<ItemFormData>>({})

  const handleInputChange = useCallback((field: keyof ItemFormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))

    // Clear error for this field when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: undefined
      }))
    }
  }, [errors])

  const validateForm = useCallback((): boolean => {
    const newErrors: Partial<ItemFormData> = {}

    if (!formData.itemName.trim()) {
      newErrors.itemName = '品名は必須です'
    }

    if (!formData.category) {
      newErrors.category = 'カテゴリを選択してください'
    }

    if (!formData.condition) {
      newErrors.condition = '状態を選択してください'
    }

    if (!formData.location) {
      newErrors.location = '保管場所を選択してください'
    }

    if (formData.acquisitionPrice && isNaN(Number(formData.acquisitionPrice))) {
      newErrors.acquisitionPrice = '数値を入力してください'
    }

    if (formData.quantity && (isNaN(Number(formData.quantity)) || Number(formData.quantity) < 1)) {
      newErrors.quantity = '1以上の数値を入力してください'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }, [formData])

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setLoading(true)

    try {
      // TODO: 実際のAPIエンドポイント /api/items を実装
      // const response = await fetch('/api/items', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(formData)
      // })

      // 仮の遅延
      await new Promise(resolve => setTimeout(resolve, 1000))

      // TODO: 成功通知の実装
      // toast.success('寄贈物を登録しました')

      // 成功後、一覧ページへ遷移
      navigate('/items')
    } catch (error) {
      console.error('Error submitting form:', error)
      // TODO: エラーハンドリングの改善
      setErrors({ itemName: 'エラーが発生しました' })
    } finally {
      setLoading(false)
    }
  }, [navigate, validateForm])

  const handleCancel = useCallback(() => {
    navigate('/items')
  }, [navigate])

  const handleBack = useCallback(() => {
    navigate('/items')
  }, [navigate])

  // ユーザー情報がない場合は処理しない
  if (!user) {
    return null
  }

  return (
    <ItemRegister
      user={user}
      formData={formData}
      errors={errors}
      loading={loading}
      onInputChange={handleInputChange}
      onSubmit={handleSubmit}
      onCancel={handleCancel}
      onBack={handleBack}
    />
  )
}