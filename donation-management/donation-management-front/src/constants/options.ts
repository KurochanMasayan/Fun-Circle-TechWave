export const ITEM_CATEGORIES = [
  { value: '書籍', label: '書籍' },
  { value: '備品', label: '備品' },
  { value: '電子機器', label: '電子機器' },
  { value: '家具', label: '家具' },
  { value: 'その他', label: 'その他' }
] as const

export const ITEM_CONDITIONS = [
  { value: '優良', label: '優良（ほぼ新品）' },
  { value: '良好', label: '良好（軽微な使用感）' },
  { value: '普通', label: '普通（使用感あり）' },
  { value: '要修理', label: '要修理（動作に問題あり）' }
] as const

export const ITEM_STATUSES = [
  { value: '利用可能', label: '利用可能', color: 'success' },
  { value: '使用中', label: '使用中', color: 'primary' },
  { value: '廃棄予定', label: '廃棄予定', color: 'secondary' }
] as const

export const STORAGE_LOCATIONS = [
  { value: '書庫A-1', label: '書庫A-1' },
  { value: '書庫A-2', label: '書庫A-2' },
  { value: '書庫B-1', label: '書庫B-1' },
  { value: '倉庫B-3', label: '倉庫B-3' },
  { value: '倉庫C-1', label: '倉庫C-1' }
] as const

export const DEPARTMENTS = [
  { value: '開発部', label: '開発部' },
  { value: '営業部', label: '営業部' },
  { value: '人事部', label: '人事部' },
  { value: '総務部', label: '総務部' },
  { value: '経理部', label: '経理部' }
] as const

// Type exports for TypeScript
export type ItemCategory = typeof ITEM_CATEGORIES[number]['value']
export type ItemCondition = typeof ITEM_CONDITIONS[number]['value']
export type ItemStatus = typeof ITEM_STATUSES[number]['value']
export type StorageLocation = typeof STORAGE_LOCATIONS[number]['value']
export type Department = typeof DEPARTMENTS[number]['value']