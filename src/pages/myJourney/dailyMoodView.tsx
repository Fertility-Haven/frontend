import { Box } from '@mui/material'
import BreadCrumberStyle from '../../components/breadcrumb/Index'
import { IconMenus } from '../../components/icon'

export default function DailyMoodView() {
  return (
    <Box>
      <BreadCrumberStyle
        navigation={[
          {
            label: 'My Journey',
            link: '/',
            icon: <IconMenus.myJourney fontSize='small' />
          },
          {
            label: 'Daily Mood',
            link: '/my-journey/daily-moods',
            icon: <IconMenus.dailyMood fontSize='small' />
          }
        ]}
      />
      Daily Mood
    </Box>
  )
}
