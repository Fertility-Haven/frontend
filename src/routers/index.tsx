import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import AppLayout from '../layouts/AppLayout'
import ErrorPage from '../pages/error-page'
import AuthLayout from '../layouts/AuthLayout'
import { useToken } from '../hooks/token'
import LoginView from '../pages/auth/loginView'
import ProfileView from '../pages/profile/profileView'
import EditProfileView from '../pages/profile/editProfileView'
import MyJourneyView from '../pages/myJourney/myJourneyView'
import SelfCareView from '../pages/selfCare/selfCareView'
import NotificationView from '../pages/notification/notificationView'
import CoupleExerciseView from '../pages/myJourney/coupleExercise/coupleExerciseView'
import MeditationView from '../pages/myJourney/meditation/meditationView'
import ListDailyJournalView from '../pages/myJourney/dailyJournal/listDailyJournalView'
import CreateDailyJournalView from '../pages/myJourney/dailyJournal/createDailyJournalView'
import EditDailyJournalView from '../pages/myJourney/dailyJournal/editDailyJournalView'
import DetailDailyJournalView from '../pages/myJourney/dailyJournal/detailDailyJournalView'
import SignUpView from '../pages/auth/signUpView'
import ListDailyMoodView from '../pages/myJourney/dailyMood/listDailyMoodView'
import CreateDailyMoodView from '../pages/myJourney/dailyMood/createDailyMoodView'
import HomeView from '../pages/home/homeView'
import ListVirtualTherapyView from '../pages/virtualTherapy/listVirtualTherapyView'

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
    },
    {
      path: '/sign-up',
      element: <SignUpView />
    }
  ]

  const mainRouters: { path: string; element: JSX.Element }[] = [
    {
      path: '/',
      element: <HomeView />
    },
    //my journey
    {
      path: '/my-journey',
      element: <MyJourneyView />
    },
    {
      path: '/my-journey/couple-exercises',
      element: <CoupleExerciseView />
    },

    //daily mood routers
    {
      path: '/my-journey/daily-moods',
      element: <ListDailyMoodView />
    },
    {
      path: '/my-journey/daily-moods/create',
      element: <CreateDailyMoodView />
    },

    //daily journal routes
    {
      path: '/my-journey/daily-journals',
      element: <ListDailyJournalView />
    },
    {
      path: '/my-journey/daily-journals/create',
      element: <CreateDailyJournalView />
    },
    {
      path: '/my-journey/daily-journals/edit/:dailyJournalId',
      element: <EditDailyJournalView />
    },
    {
      path: '/my-journey/daily-journals/detail/:dailyJournalId',
      element: <DetailDailyJournalView />
    },

    //meditaion routes
    {
      path: '/my-journey/meditations',
      element: <MeditationView />
    },
    {
      path: '/virtual-therapy',
      element: <ListVirtualTherapyView />
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
