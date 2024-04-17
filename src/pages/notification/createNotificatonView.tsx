import { useState } from 'react'
import { Button, Card, Typography, Box, TextField, Stack } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useHttp } from '../../hooks/http'
import { type INotificationCreateRequestModel } from '../../models/notificationsModel'
import BreadCrumberStyle from '../../components/breadcrumb/Index'
import { IconMenus } from '../../components/icon'

export default function CreateNotificationView() {
  const { handlePostRequest } = useHttp()
  const navigate = useNavigate()

  const [notificationName, setnotificationName] = useState('')
  const [notificationMessage, setnotificationMessage] = useState('')

  const handleSubmit = async () => {
    try {
      const payload: INotificationCreateRequestModel = {
        notificationName,
        notificationMessage
      }
      await handlePostRequest({
        path: '/notifications',
        body: payload
      })
      navigate('/notifications')
    } catch (error: unknown) {
      console.log(error)
    }
  }

  return (
    <>
      <BreadCrumberStyle
        navigation={[
          {
            label: 'Notification',
            link: '/notifications',
            icon: <IconMenus.notification fontSize='small' />
          },
          {
            label: 'Create',
            link: '/notifications/create'
          }
        ]}
      />
      <Card
        sx={{
          mt: 5,
          p: 8
        }}
      >
        <Typography variant='h4' marginBottom={5} color='primary' fontWeight={'bold'}>
          Create Notification
        </Typography>
        <Box
          component='form'
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center'
          }}
        >
          <TextField
            label='Title'
            id='outlined-start-adornment'
            sx={{ m: 1 }}
            value={notificationName}
            type='text'
            onChange={(e) => {
              setnotificationName(e.target.value)
            }}
          />

          <TextField
            label='Message'
            id='outlined-start-adornment'
            sx={{ m: 1 }}
            value={notificationMessage}
            type='text'
            onChange={(e) => {
              setnotificationMessage(e.target.value)
            }}
          />

          <Stack direction={'row'} justifyContent='flex-end'>
            <Button
              sx={{
                m: 1,
                width: '25ch',
                backgroundColor: 'dodgerblue',
                color: '#FFF',
                fontWeight: 'bold'
              }}
              variant={'contained'}
              onClick={handleSubmit}
            >
              Submit
            </Button>
          </Stack>
        </Box>
      </Card>
    </>
  )
}
