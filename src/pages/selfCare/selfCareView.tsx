import { Card, Grid, Box, Stack, Typography } from '@mui/material'
import BreadCrumberStyle from '../../components/breadcrumb/Index'
import { IconMenus } from '../../components/icon'

export default function SelfCareView() {
  return (
    <Box>
      <BreadCrumberStyle
        navigation={[
          {
            label: 'Self Care',
            link: '/self-cares',
            icon: <IconMenus.selfCare fontSize='small' />
          }
        ]}
      />

      <Grid container spacing={3}>
        <Grid item md={4} sm={6} xs={12}>
          <Card sx={{ p: 3, minWidth: 200 }}>
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
          <Card sx={{ p: 3, minWidth: 200 }}>
            <Stack direction='row' spacing={2}>
              <IconMenus.music fontSize='large' color={'inherit'} />
              <Stack justifyContent='center'>
                <Typography fontSize='large' fontWeight='bold'>
                  Music
                </Typography>
              </Stack>
            </Stack>
          </Card>
        </Grid>
        <Grid item md={4} sm={6} xs={12}>
          <Card sx={{ p: 3, minWidth: 200 }}>
            <Stack direction='row' spacing={2}>
              <IconMenus.podcast fontSize='large' color={'inherit'} />
              <Stack justifyContent='center'>
                <Typography fontSize='large' fontWeight='bold'>
                  Podcast
                </Typography>
              </Stack>
            </Stack>
          </Card>
        </Grid>
        <Grid item md={4} sm={6} xs={12}>
          <Card sx={{ p: 3, minWidth: 200 }}>
            <Stack direction='row' spacing={2}>
              <IconMenus.inspirationQuote fontSize='large' color={'inherit'} />
              <Stack justifyContent='center'>
                <Typography fontSize='large' fontWeight='bold'>
                  Inspirational Quotes
                </Typography>
              </Stack>
            </Stack>
          </Card>
        </Grid>
        <Grid item md={4} sm={6} xs={12}>
          <Card sx={{ p: 3, minWidth: 200 }}>
            <Stack direction='row' spacing={2}>
              <IconMenus.prayer fontSize='large' color={'inherit'} />
              <Stack justifyContent='center'>
                <Typography fontSize='large' fontWeight='bold'>
                  Paryer
                </Typography>
              </Stack>
            </Stack>
          </Card>
        </Grid>
        <Grid item md={4} sm={6} xs={12}>
          <Card sx={{ p: 3, minWidth: 200 }}>
            <Stack direction='row' spacing={2}>
              <IconMenus.community fontSize='large' color={'inherit'} />
              <Stack justifyContent='center'>
                <Typography fontSize='large' fontWeight='bold'>
                  Community
                </Typography>
              </Stack>
            </Stack>
          </Card>
        </Grid>
        <Grid item md={4} sm={6} xs={12}>
          <Card sx={{ p: 3, minWidth: 200 }}>
            <Stack direction='row' spacing={2}>
              <IconMenus.yoga fontSize='large' color={'inherit'} />
              <Stack justifyContent='center'>
                <Typography fontSize='large' fontWeight='bold'>
                  Yoga
                </Typography>
              </Stack>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </Box>
  )
}
