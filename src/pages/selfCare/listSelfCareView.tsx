import { Box } from '@mui/material'
import BreadCrumberStyle from '../../components/breadcrumb/Index'
import { IconMenus } from '../../components/icon'

export default function ListSelfCareView() {
  return (
    <Box>
      <BreadCrumberStyle
        navigation={[
          {
            label: 'Self Care',
            link: '/self-care',
            icon: <IconMenus.selfCare fontSize='small' />
          }
        ]}
      />
      self care
    </Box>
  )
}
