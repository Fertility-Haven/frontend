import { Box } from '@mui/material'
import BreadCrumberStyle from '../../../components/breadcrumb/Index'
import { IconMenus } from '../../../components/icon'

export default function MeditationView() {
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
            label: 'Meditation',
            link: '/my-journey/meditations',
            icon: <IconMenus.meditaion fontSize='small' />
          }
        ]}
      />
      Meditation
    </Box>
  )
}
