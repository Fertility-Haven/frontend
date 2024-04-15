import { Box } from '@mui/material'
import BreadCrumberStyle from '../../components/breadcrumb/Index'
import { IconMenus } from '../../components/icon'

export default function MyJourneyView() {
  return (
    <Box>
      <BreadCrumberStyle
        navigation={[
          {
            label: 'My Journey',
            link: '/my-journey',
            icon: <IconMenus.myJourney fontSize='small' />
          }
        ]}
      />
      my journe
    </Box>
  )
}
