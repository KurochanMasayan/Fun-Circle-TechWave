import type { ReactNode } from 'react'
import styles from './Table.module.css'

interface TableProps {
  children: ReactNode
  className?: string
}

interface TableHeaderProps {
  children: ReactNode
  className?: string
}

interface TableBodyProps {
  children: ReactNode
  className?: string
}

interface TableRowProps {
  children: ReactNode
  className?: string
  onClick?: () => void
}

interface TableHeadProps {
  children: ReactNode
  className?: string
}

interface TableCellProps {
  children: ReactNode
  className?: string
  colSpan?: number
}

export function Table({ children, className = '' }: TableProps) {
  return (
    <div className={`${styles.tableWrapper} ${className}`}>
      <table className={styles.table}>
        {children}
      </table>
    </div>
  )
}

export function TableHeader({ children, className = '' }: TableHeaderProps) {
  return (
    <thead className={`${styles.tableHeader} ${className}`}>
      {children}
    </thead>
  )
}

export function TableBody({ children, className = '' }: TableBodyProps) {
  return (
    <tbody className={`${styles.tableBody} ${className}`}>
      {children}
    </tbody>
  )
}

export function TableRow({ children, className = '', onClick }: TableRowProps) {
  return (
    <tr 
      className={`${styles.tableRow} ${onClick ? styles.tableRowClickable : ''} ${className}`}
      onClick={onClick}
    >
      {children}
    </tr>
  )
}

export function TableHead({ children, className = '' }: TableHeadProps) {
  return (
    <th className={`${styles.tableHead} ${className}`}>
      {children}
    </th>
  )
}

export function TableCell({ children, className = '', colSpan }: TableCellProps) {
  return (
    <td className={`${styles.tableCell} ${className}`} colSpan={colSpan}>
      {children}
    </td>
  )
}