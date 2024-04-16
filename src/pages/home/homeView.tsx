import { Card, Grid, Box, Stack, Typography } from '@mui/material'
import ReactApexChart from 'react-apexcharts'
import BreadCrumberStyle from '../../components/breadcrumb/Index'
import { IconMenus } from '../../components/icon'
import { useHttp } from '../../hooks/http'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function HomeView() {
  const { handleGetRequest } = useHttp()
  const [quote, setQuote] = useState('')
  const navigation = useNavigate()

  const getQuotes = async () => {
    const result = await handleGetRequest({
      path: '/quotes'
    })

    if (result) {
      const randomIndex = Math.floor(Math.random() * 10)
      setQuote(result.items[randomIndex ?? 0]?.quotesText)
    }
  }

  //   const [statisticTotal, setStatisticTotal] = useState<IStatisticTotalModel>()

  //   const getStatistic = async () => {
  //     const result: IStatisticTotalModel = await handleGetRequest({
  //       path: '/statistic/total'
  //     })
  //     console.log(result)
  //     setStatisticTotal(result)
  //   }

  useEffect(() => {
    getQuotes()
  }, [])

  return (
    <Box>
      <BreadCrumberStyle
        navigation={[
          {
            label: 'Home',
            link: '/',
            icon: <IconMenus.home fontSize='small' />
          }
        ]}
      />

      <Card sx={{ p: 3, minWidth: 200, marginBottom: 2 }}>
        <Stack direction='row' spacing={2}>
          <IconMenus.inspirationQuote fontSize='large' color={'inherit'} />
          <Stack justifyContent='center'>
            <Typography fontSize='large' fontWeight='bold'>
              quotes for today "{quote}"
            </Typography>
          </Stack>
        </Stack>
      </Card>

      <Grid container spacing={2} mb={2}>
        <Grid item sm={4} xs={12}>
          <Card
            sx={{ p: 3, minWidth: 200, cursor: 'pointer' }}
            onClick={() => navigation('/my-journey/daily-moods')}
          >
            <Stack direction='row' spacing={2}>
              <IconMenus.dailyMood fontSize='large' color={'inherit'} />
              <Stack justifyContent='center'>
                <Typography fontSize='large' fontWeight='bold'>
                  Your Previous Mood Is Sad
                </Typography>
              </Stack>
            </Stack>
          </Card>
        </Grid>

        <Grid item sm={4} xs={12}>
          <Card
            sx={{ p: 3, minWidth: 200, cursor: 'pointer' }}
            onClick={() => navigation('/my-journey/daily-journals')}
          >
            <Stack direction='row' spacing={2}>
              <IconMenus.dailyJournal fontSize='large' color={'inherit'} />
              <Stack justifyContent='center'>
                <Typography fontSize='large' fontWeight='bold'>
                  {30} Daily Journal
                </Typography>
              </Stack>
            </Stack>
          </Card>
        </Grid>

        <Grid item sm={4} xs={12}>
          <Card
            sx={{ p: 3, minWidth: 200, cursor: 'pointer' }}
            onClick={() => navigation('/notifications')}
          >
            <Stack direction='row' spacing={2}>
              <IconMenus.notification fontSize='large' color={'inherit'} />
              <Stack justifyContent='center'>
                <Typography fontSize='large' fontWeight='bold'>
                  {30} Notifications
                </Typography>
              </Stack>
            </Stack>
          </Card>
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        <Grid item md={7} xs={12}>
          <Card sx={{ p: { md: 5 } }}>
            <ReactApexChart
              options={{
                chart: {
                  height: 350,
                  type: 'area'
                },
                dataLabels: {
                  enabled: true
                },
                stroke: {
                  curve: 'smooth'
                },
                xaxis: {
                  type: 'datetime',
                  categories: [
                    '2018-09-19T00:00:00.000Z',
                    '2018-09-19T01:30:00.000Z',
                    '2018-09-19T02:30:00.000Z',
                    '2018-09-19T03:30:00.000Z',
                    '2018-09-19T04:30:00.000Z',
                    '2018-09-19T05:30:00.000Z',
                    '2018-09-19T06:30:00.000Z'
                  ]
                },
                tooltip: {
                  x: {
                    format: 'dd/MM/yy HH:mm'
                  }
                }
              }}
              series={[
                {
                  name: 'series1',
                  data: [31, 40, 28, 51, 42, 109, 100]
                },
                {
                  name: 'series2',
                  data: [11, 32, 45, 32, 34, 52, 41]
                }
              ]}
              type='area'
              height={350}
            />
          </Card>
        </Grid>
        <Grid item md={5} xs={12}>
          <Card sx={{ p: 5 }}>
            <div id='chart'>
              <ReactApexChart
                options={{
                  chart: {
                    width: 380,
                    type: 'pie'
                  },
                  labels: ['Team A', 'Team B', 'Team C', 'Team D', 'Team E'],
                  responsive: [
                    {
                      breakpoint: 480,
                      options: {
                        chart: {
                          width: 230
                        },
                        legend: {
                          position: 'bottom'
                        }
                      }
                    }
                  ]
                }}
                series={[44, 55, 13, 43, 22]}
                type='pie'
                width={380}
              />
            </div>
          </Card>
        </Grid>
        <Grid item xs={12}></Grid>
      </Grid>
    </Box>
  )
}
