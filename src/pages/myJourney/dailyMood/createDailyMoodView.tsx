import { useState } from 'react'
import {
  Button,
  Card,
  Typography,
  Box,
  Stack,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup
} from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useHttp } from '../../../hooks/http'
import BreadCrumberStyle from '../../../components/breadcrumb/Index'
import { IconMenus } from '../../../components/icon'
import { IDailyMoodCreateRequestModel } from '../../../models/dailyMoodModel'

export default function CreateDailyMoodView() {
  const { handlePostRequest } = useHttp()
  const navigate = useNavigate()

  const [dailyMoodPayload, setdailyMoodPayload] = useState<IDailyMoodCreateRequestModel>({
    dailyMoodExpression: ''
  })

  const handleSubmit = async () => {
    try {
      await handlePostRequest({
        path: '/daily-moods',
        body: dailyMoodPayload
      })
      navigate('/my-journey/daily-moods')
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
            label: 'Daily Mood',
            link: '/my-journey/daily-moods',
            icon: <IconMenus.dailyMood fontSize='small' />
          },
          {
            label: 'Create',
            link: '/my-journey/daily-moods/create'
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
          Create Daily Mood
        </Typography>
        <Box
          component='form'
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center'
          }}
        >
          <FormControl>
            <FormLabel id='demo-radio-buttons-group-label'>Your current mood</FormLabel>

            <RadioGroup
              aria-labelledby='demo-radio-buttons-group-label'
              defaultValue='female'
              name='radio-buttons-group'
            >
              <Stack direction={'row'} flexWrap={'wrap'} spacing={2}>
                {[
                  'Angry',
                  'Happy',
                  'Sad',
                  'Afraid',
                  'Anxious',
                  'Confused',
                  'Relaxed',
                  'Disappointed'
                ].map((mood) => (
                  <FormControlLabel
                    key={mood}
                    value={mood}
                    control={
                      <Radio
                        onChange={(e) =>
                          setdailyMoodPayload({
                            ...dailyMoodPayload,
                            dailyMoodExpression: e.target.value
                          })
                        }
                      />
                    }
                    label={mood}
                  />
                ))}
              </Stack>
            </RadioGroup>
          </FormControl>

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
