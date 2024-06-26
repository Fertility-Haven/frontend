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
import ListUserView from '../pages/users/listUserView'
import DetailUserView from '../pages/users/detailUserView'
import EditUserView from '../pages/users/editUserView'
import CreateUserView from '../pages/users/createUser'
import ListNotificationView from '../pages/notification/listNotificationView'
import CreateNotificationView from '../pages/notification/createNotificatonView'
import ListQuotesView from '../pages/quotes/listNotificationView'
import CreateQuotesView from '../pages/quotes/createNotificatonView'

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

    //users routes
    {
      path: '/users',
      element: <ListUserView />
    },
    {
      path: '/users/create',
      element: <CreateUserView />
    },
    {
      path: '/users/detail/:userId',
      element: <DetailUserView />
    },
    {
      path: '/users/edit/:userId',
      element: <EditUserView />
    },

    //quotes routes
    {
      path: '/quotes',
      element: <ListQuotesView />
    },
    {
      path: '/quotes/create',
      element: <CreateQuotesView />
    },
    //self care routes
    {
      path: '/self-cares',
      element: <SelfCareView />
    },

    {
      path: '/notifications',
      element: <ListNotificationView />
    },
    {
      path: '/notifications/create',
      element: <CreateNotificationView />
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
