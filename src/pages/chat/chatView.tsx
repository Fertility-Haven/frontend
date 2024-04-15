import { Box } from '@mui/material'
import BreadCrumberStyle from '../../components/breadcrumb/Index'
import { IconMenus } from '../../components/icon'

export default function ChatView() {
  return (
    <Box>
      <BreadCrumberStyle
        navigation={[
          {
            label: 'Chats',
            link: '/chats',
            icon: <IconMenus.chat fontSize='small' />
          }
        ]}
      />
      chats
    </Box>
  )
}
