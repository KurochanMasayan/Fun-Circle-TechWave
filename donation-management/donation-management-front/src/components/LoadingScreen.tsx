import styles from './LoadingScreen.module.css'

export default function LoadingScreen() {
  return (
    <div className={styles.loadingScreen}>
      <div className={styles.loadingContent}>
        <div className={styles.loadingSpinner} />
        <p className={styles.loadingText}>読み込み中...</p>
      </div>
    </div>
  )
}