import { useEffect, useState } from 'react'
import { Button, Card, Typography, Box, TextField, Stack } from '@mui/material'
import { useNavigate, useParams } from 'react-router-dom'
import { useHttp } from '../../../hooks/http'
import {
  IDailyJournalModel,
  IDailyJournalUpdateRequestModel
} from '../../../models/dailyJournalModel'
import BreadCrumberStyle from '../../../components/breadcrumb/Index'
import { IconMenus } from '../../../components/icon'
import { useQuill } from 'react-quilljs'
import 'quill/dist/quill.snow.css'

export default function EditDailyJournalView() {
  const { handleUpdateRequest, handleGetRequest } = useHttp()
  const navigate = useNavigate()
  const { dailyJournalId } = useParams()
  const { quill, quillRef } = useQuill()

  const [dailyJournal, setDailyJournal] = useState<IDailyJournalUpdateRequestModel>({
    dailyJournalId: '',
    dailyJournalTitle: '',
    dailyJournalDescription: ''
  })

  const handleSubmit = async () => {
    try {
      const payload: IDailyJournalUpdateRequestModel = {
        ...dailyJournal,
        dailyJournalDescription: quill.root.innerHTML,
        dailyJournalId: dailyJournalId ?? ''
      }
      await handleUpdateRequest({
        path: '/daily-journals',
        body: payload
      })
      navigate('/my-journey/daily-journals')
    } catch (error: unknown) {
      console.log(error)
    }
  }

  const getDetailDailyJournal = async () => {
    const result: IDailyJournalModel = await handleGetRequest({
      path: '/daily-journals/detail/' + dailyJournalId
    })
    if (result !== null) {
      setDailyJournal(result)
      if (quill) {
        quill.root.innerHTML = result.dailyJournalDescription
      }
    }
  }

  useEffect(() => {
    getDetailDailyJournal()
  }, [quill])

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
            label: 'Edit',
            link: '/my-journey/daily-journals/edit/' + dailyJournalId
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
          Edit Daily Journal
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
            value={dailyJournal?.dailyJournalTitle}
            sx={{ marginBottom: 3 }}
            type='text'
            onChange={(e) => {
              setDailyJournal({
                ...dailyJournal,
                dailyJournalTitle: e.target.value
              })
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
              Update
            </Button>
          </Stack>
        </Box>
      </Card>
    </>
  )
}
