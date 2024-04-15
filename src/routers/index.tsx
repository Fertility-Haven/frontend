import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import AppLayout from '../layouts/AppLayout'
import ErrorPage from '../pages/error-page'
import AuthLayout from '../layouts/AuthLayout'
import { useToken } from '../hooks/token'
import LoginView from '../pages/auth/Login'
import ProfileView from '../pages/profile/profileView'
import EditProfileView from '../pages/profile/editProfileView'
import MyJourneyView from '../pages/myJourney/myJourneyView'
import ChatView from '../pages/chat/chatView'
import SelfCareView from '../pages/selfCare/selfCareView'
import NotificationView from '../pages/notification/notificationView'

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
      element: <ChatView />
    },
    {
      path: '/self-cares',
      element: <SelfCareView />
    },

    {
      path: '/notifications',
      element: <NotificationView />
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
