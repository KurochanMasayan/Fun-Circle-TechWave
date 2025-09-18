import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { routes } from './router/routes'
import styles from './App.module.css'

const router = createBrowserRouter(routes)

function App() {
  return (
    <div className={styles.app}>
      <RouterProvider router={router} />
    </div>
  )
}

export default App