import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import AppLayout from '../layouts/AppLayout'
import ErrorPage from '../pages/error-page'
import LoginView from '../pages/auth/Login'
import ProfileView from '../pages/profile/Index'
import AuthLayout from '../layouts/AuthLayout'
import { useToken } from '../hooks/token'
import ListNotificationView from '../pages/notification/ListNotificationView'
import EditProfileView from '../pages/profile/EditProfileView'
import MyJourneyView from '../pages/myJourney/myJourneyView'
import ListChatView from '../pages/chat/listChatView'
import ListSelfCareView from '../pages/selfCare/listSelfCareView'

export default function AppRouters() {
  const routers: { path: string; element: JSX.Element }[] = []
  const authRouters: { path: string; element: JSX.Element }[] = [
    {
      path: '/',
      element: <LoginView />
    },
    {
      path: '/login',
      element: <LoginView />
    }
  ]

  const mainRouters: { path: string; element: JSX.Element }[] = [
    {
      path: '/',
      element: <MyJourneyView />
    },
    {
      path: '/chats',
      element: <ListChatView />
    },
    {
      path: '/self-cares',
      element: <ListSelfCareView />
    },

    {
      path: '/notifications',
      element: <ListNotificationView />
    },
    {
      path: '/my-profile',
      element: <ProfileView />
    },
    {
      path: '/my-profile/edit/:userId',
      element: <EditProfileView />
    }
  ]

  const { getToken } = useToken()

  const isAuth = getToken()

  if (isAuth) {
    routers.push(...mainRouters)
  } else {
    routers.push(...authRouters)
  }

  const appRouters = createBrowserRouter([
    {
      path: '/',
      element: isAuth ? <AppLayout /> : <AuthLayout />,
      errorElement: <ErrorPage />,
      children: routers
    }
  ])

  return <RouterProvider router={appRouters} />
}
