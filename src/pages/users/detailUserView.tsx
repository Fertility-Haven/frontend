import { useParams } from 'react-router-dom'
import { useHttp } from '../../hooks/http'
import { useEffect, useState } from 'react'
import { Card, Typography } from '@mui/material'
import { IUserModel } from '../../models/userModel'
import { convertTime } from '../../utilities/convertTime'
import BreadCrumberStyle from '../../components/breadcrumb/Index'
import { IconMenus } from '../../components/icon'

export default function DetailUserView() {
  const { handleGetRequest } = useHttp()
  const { userId } = useParams()

  const [userDetail, setuserDetail] = useState<IUserModel>()

  const getDetailUser = async () => {
    const result: IUserModel = await handleGetRequest({
      path: '/users/detail/' + userId
    })
    setuserDetail(result)
  }

  useEffect(() => {
    getDetailUser()
  }, [])

  return (
    <>
      <BreadCrumberStyle
        navigation={[
          {
            label: 'Users',
            link: '/users',
            icon: <IconMenus.users fontSize='small' />
          },
          {
            label: 'Detail',
            link: '/users/detail' + userId
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
                <Typography fontWeight={'Bold'}>Nama</Typography>
              </td>
              <td>:</td>
              <td>
                <Typography>{userDetail?.userName}</Typography>
              </td>
            </tr>

            <tr>
              <td>
                <Typography fontWeight={'Bold'}>Email</Typography>
              </td>
              <td>:</td>
              <td>
                <Typography>{userDetail?.userEmail}</Typography>
              </td>
            </tr>

            <tr>
              <td>
                <Typography fontWeight={'Bold'}>Role</Typography>
              </td>
              <td>:</td>
              <td>
                <Typography>{userDetail?.userRole}</Typography>
              </td>
            </tr>

            <tr>
              <td>
                <Typography fontWeight={'Bold'}>Join At</Typography>
              </td>
              <td>:</td>
              <td>
                <Typography>{convertTime(userDetail?.createdAt ?? '')}</Typography>
              </td>
            </tr>
          </tbody>
        </table>
      </Card>
    </>
  )
}
