import type { RouteObject } from 'react-router-dom'
import ProtectedRoute from './ProtectedRoute'
import PublicRoute from './PublicRoute'
import AuthContainer from '../containers/AuthContainer'
import DashboardContainer from '../containers/DashboardContainer'
import ItemsListContainer from '../containers/ItemsListContainer'
import ItemRegisterContainer from '../containers/ItemRegisterContainer'
import ReportsContainer from '../containers/ReportsContainer'
import NotFound from '../components/NotFound'

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <ProtectedRoute />,
    children: [
      {
        index: true,
        element: <DashboardContainer />
      },
      {
        path: 'dashboard',
        element: <DashboardContainer />
      },
      {
        path: 'items',
        element: <ItemsListContainer />
      },
      {
        path: 'items/register',
        element: <ItemRegisterContainer />
      },
      {
        path: 'reports',
        element: <ReportsContainer />
      },
      {
        path: 'analytics',
        element: <NotFound />
      },
      {
        path: 'users',
        element: <NotFound />
      },
      {
        path: 'departments',
        element: <NotFound />
      }
    ]
  },
  {
    path: '/login',
    element: <PublicRoute />,
    children: [
      {
        index: true,
        element: <AuthContainer />
      }
    ]
  },
  {
    path: '*',
    element: <NotFound />
  }
]