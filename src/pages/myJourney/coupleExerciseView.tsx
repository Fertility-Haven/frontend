import { Box } from '@mui/material'
import BreadCrumberStyle from '../../components/breadcrumb/Index'
import { IconMenus } from '../../components/icon'

export default function CoupleExerciseView() {
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
            label: 'couple exercises',
            link: '/my-journey/couple-exercises',
            icon: <IconMenus.coupleExercise fontSize='small' />
          }
        ]}
      />
      coupleExerciseView
    </Box>
  )
}
