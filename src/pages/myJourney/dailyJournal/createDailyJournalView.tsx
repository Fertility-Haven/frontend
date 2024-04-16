import { useState } from 'react'
import { Button, Card, Typography, Box, TextField, Stack } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useHttp } from '../../../hooks/http'
import { IDaylyJournaCreateRequestModel } from '../../../models/dailyJournalModel'

export default function CreateDailyJournalView() {
  const { handlePostRequest } = useHttp()
  const navigate = useNavigate()

  const [daylyJournalPayload, setDaylyJournalPayload] =
    useState<IDaylyJournaCreateRequestModel>({
      dailyJournalTitle: '',
      dailyJournalDescription: ''
    })

  const handleSubmit = async () => {
    try {
      await handlePostRequest({
        path: '/daily-journals',
        body: daylyJournalPayload
      })
      navigate('/my-journey/daily-journals')
    } catch (error: unknown) {
      console.log(error)
    }
  }

  return (
    <>
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
            sx={{ m: 1 }}
            value={daylyJournalPayload?.dailyJournalTitle}
            type='text'
            onChange={(e) => {
              setDaylyJournalPayload({
                ...daylyJournalPayload,
                dailyJournalTitle: e.target.value
              })
            }}
          />

          <TextField
            label='Description'
            id='outlined-start-adornment'
            sx={{ m: 1 }}
            value={daylyJournalPayload?.dailyJournalDescription}
            type='text'
            onChange={(e) => {
              setDaylyJournalPayload({
                ...daylyJournalPayload,
                dailyJournalDescription: e.target.value
              })
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
