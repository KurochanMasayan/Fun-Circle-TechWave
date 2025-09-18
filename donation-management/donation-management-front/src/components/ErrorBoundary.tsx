import { Component } from 'react'
import type { ErrorInfo, ReactNode } from 'react'
import Button from './ui/Button'
import styles from './ErrorBoundary.module.css'

interface ErrorBoundaryProps {
  children: ReactNode
  fallback?: ReactNode
}

interface ErrorBoundaryState {
  hasError: boolean
  error: Error | null
}

export default class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo)
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null })
    window.location.reload()
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return <>{this.props.fallback}</>
      }

      return (
        <div className={styles.errorBoundary}>
          <div className={styles.errorContent}>
            <h1 className={styles.errorTitle}>エラーが発生しました</h1>
            <p className={styles.errorMessage}>
              申し訳ございません。予期しないエラーが発生しました。
            </p>
            {import.meta.env.DEV && this.state.error && (
              <details className={styles.errorDetails}>
                <summary>エラー詳細</summary>
                <pre>{this.state.error.toString()}</pre>
              </details>
            )}
            <Button
              variant="primary"
              onClick={this.handleReset}
            >
              ページを再読み込み
            </Button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}