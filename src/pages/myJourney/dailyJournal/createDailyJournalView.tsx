import { useState } from 'react'
import { Button, Card, Typography, Box, TextField, Stack } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useHttp } from '../../../hooks/http'
import { IDailyJournaCreateRequestModel } from '../../../models/dailyJournalModel'
import BreadCrumberStyle from '../../../components/breadcrumb/Index'
import { IconMenus } from '../../../components/icon'
import { useQuill } from 'react-quilljs'
import 'quill/dist/quill.snow.css'

export default function CreateDailyJournalView() {
  const { handlePostRequest } = useHttp()
  const navigate = useNavigate()
  const { quill, quillRef } = useQuill()

  const [dailyJournalTitle, setDailyJournalTitle] = useState('')

  const handleSubmit = async () => {
    try {
      const payload: IDailyJournaCreateRequestModel = {
        dailyJournalTitle,
        dailyJournalDescription: quill.root.innerHTML
      }

      await handlePostRequest({
        path: '/daily-journals',
        body: payload
      })

      navigate('/my-journey/daily-journals')
    } catch (error: unknown) {
      console.log(error)
    }
  }

  return (
    <>
      <BreadCrumberStyle
        navigation={[
          {
            label: 'My Journey',
            link: '/',
            icon: <IconMenus.myJourney fontSize='small' />
          },
          {
            label: 'Daily Journal',
            link: '/my-journey/daily-journals',
            icon: <IconMenus.dailyJournal fontSize='small' />
          },
          {
            label: 'Create',
            link: '/my-journey/daily-journals/create'
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
          Create Daily Journal
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
            sx={{ marginBottom: 2 }}
            value={dailyJournalTitle}
            type='text'
            onChange={(e) => {
              setDailyJournalTitle(e.target.value)
            }}
          />

          <div style={{ minHeight: '200px' }}>
            <div ref={quillRef} />
          </div>

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
