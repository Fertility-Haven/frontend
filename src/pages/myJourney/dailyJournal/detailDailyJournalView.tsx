import { useParams } from 'react-router-dom'
import { useHttp } from '../../../hooks/http'
import { useEffect, useState } from 'react'
import { Card, Typography } from '@mui/material'
import { convertTime } from '../../../utilities/convertTime'
import { IDailyJournalModel } from '../../../models/dailyJournalModel'
import BreadCrumberStyle from '../../../components/breadcrumb/Index'
import { IconMenus } from '../../../components/icon'

export default function DetailDailyJournalView() {
  const { handleGetRequest } = useHttp()
  const { dailyJournalId } = useParams()

  const [detailDailyJournal, setDetailDailyJournal] = useState<IDailyJournalModel>()

  const getDetaiDailyJournal = async () => {
    const result: IDailyJournalModel = await handleGetRequest({
      path: '/daily-journals/detail/' + dailyJournalId
    })
    if (result) {
      setDetailDailyJournal(result)
    }
  }

  useEffect(() => {
    getDetaiDailyJournal()
  }, [])

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
            label: 'Detail',
            link: '/my-journey/daily-journals/detail/' + dailyJournalId
          }
        ]}
      />
      <Card sx={{ p: 5 }}>
        <table>
          <thead>
            <th></th>
            <th></th>
            <th></th>
          </thead>
          <tbody>
            <tr>
              <td>
                <Typography fontWeight={'Bold'}>Title</Typography>
              </td>
              <td>:</td>
              <td>
                <Typography>{detailDailyJournal?.dailyJournalTitle}</Typography>
              </td>
            </tr>

            <tr>
              <td>
                <Typography fontWeight={'Bold'}>Description</Typography>
              </td>
              <td>:</td>
              <td>
                <Typography>{detailDailyJournal?.dailyJournalDescription}</Typography>
              </td>
            </tr>
            <tr>
              <td>
                <Typography fontWeight={'Bold'}>Created At</Typography>
              </td>
              <td>:</td>
              <td>
                <Typography>
                  {convertTime(detailDailyJournal?.createdAt ?? '')}
                </Typography>
              </td>
            </tr>
          </tbody>
        </table>
      </Card>
    </>
  )
}
