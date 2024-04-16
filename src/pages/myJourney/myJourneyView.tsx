import { Card, Grid, Box, Stack, Typography } from '@mui/material'
import BreadCrumberStyle from '../../components/breadcrumb/Index'
import { IconMenus } from '../../components/icon'
import { useNavigate } from 'react-router-dom'

export default function MyJourneyView() {
  const navigation = useNavigate()

  return (
    <Box>
      <BreadCrumberStyle
        navigation={[
          {
            label: 'My Journey',
            link: '/',
            icon: <IconMenus.myJourney fontSize='small' />
          }
        ]}
      />

      <Grid container spacing={3}>
        <Grid item md={4} sm={6} xs={12}>
          <Card
            sx={{ p: 3, minWidth: 200 }}
            onClick={() => navigation('/my-journey/daily-moods')}
          >
            <Stack direction='row' spacing={2}>
              <IconMenus.dailyMood fontSize='large' color={'inherit'} />
              <Stack justifyContent='center'>
                <Typography fontSize='large' fontWeight='bold'>
                  Daily Mood
                </Typography>
              </Stack>
            </Stack>
          </Card>
        </Grid>
        <Grid item md={4} sm={6} xs={12}>
          <Card
            sx={{ p: 3, minWidth: 200 }}
            onClick={() => navigation('/my-journey/daily-journals')}
          >
            <Stack direction='row' spacing={2}>
              <IconMenus.dailyJournal fontSize='large' color={'inherit'} />
              <Stack justifyContent='center'>
                <Typography fontSize='large' fontWeight='bold'>
                  Daily Journal
                </Typography>
              </Stack>
            </Stack>
          </Card>
        </Grid>
        <Grid item md={4} sm={6} xs={12}>
          <Card
            sx={{ p: 3, minWidth: 200 }}
            onClick={() => navigation('/my-journey/meditations')}
          >
            <Stack direction='row' spacing={2}>
              <IconMenus.meditaion fontSize='large' color={'inherit'} />
              <Stack justifyContent='center'>
                <Typography fontSize='large' fontWeight='bold'>
                  Meditation
                </Typography>
              </Stack>
            </Stack>
          </Card>
        </Grid>
        <Grid item md={4} sm={6} xs={12}>
          <Card
            sx={{ p: 3, minWidth: 200 }}
            onClick={() => navigation('/my-journey/couple-exercises')}
          >
            <Stack direction='row' spacing={2}>
              <IconMenus.coupleExercise fontSize='large' color={'inherit'} />
              <Stack justifyContent='center'>
                <Typography fontSize='large' fontWeight='bold'>
                  Couple Exercise
                </Typography>
              </Stack>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </Box>
  )
}
