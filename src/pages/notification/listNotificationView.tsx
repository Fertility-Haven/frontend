/* eslint-disable @typescript-eslint/no-explicit-any */
import Box from '@mui/material/Box'
import {
  GridRowsProp,
  DataGrid,
  GridColDef,
  GridActionsCellItem,
  GridToolbarContainer,
  GridToolbarExport
} from '@mui/x-data-grid'
import { Add } from '@mui/icons-material'
import { useEffect, useState } from 'react'
import { useHttp } from '../../hooks/http'
import { Button, Stack, TextField } from '@mui/material'
import BreadCrumberStyle from '../../components/breadcrumb/Index'
import { IconMenus } from '../../components/icon'
import { useNavigate } from 'react-router-dom'
import { convertTime } from '../../utilities/convertTime'
import { INotificationModel } from '../../models/notificationsModel'
import DeleteIcon from '@mui/icons-material/DeleteOutlined'
import Modal from '../../components/modal'
import { useToken } from '../../hooks/token'
import { jwtDecode } from 'jwt-decode'
import { IUserModel } from '../../models/userModel'

export default function ListNotificationView() {
  const navigation = useNavigate()
  const { getToken } = useToken()
  const token = getToken()
  const user: IUserModel = jwtDecode(token ?? '')

  const [tableData, setTableData] = useState<GridRowsProp[]>([])
  const { handleGetTableDataRequest, handleRemoveRequest } = useHttp()

  const [modalDeleteData, setModalDeleteData] = useState<INotificationModel>()
  const [openModalDelete, setOpenModalDelete] = useState<boolean>(false)

  const [paginationModel, setPaginationModel] = useState({
    pageSize: 25,
    page: 0
  })

  const handleDeleteNotification = async (notificationId: string) => {
    await handleRemoveRequest({
      path: '/notifications?notificationId=' + notificationId
    })
    window.location.reload()
  }

  const handleOpenModalDelete = (data: INotificationModel) => {
    setModalDeleteData(data)
    setOpenModalDelete(!openModalDelete)
  }

  const getTableData = async ({ search }: { search: string }) => {
    try {
      const result = await handleGetTableDataRequest({
        path: '/notifications',
        page: paginationModel.page ?? 0,
        size: paginationModel.pageSize ?? 10,
        filter: { search }
      })
      if (result) {
        console.log(result)
        setTableData(result.items)
      }
    } catch (error: any) {
      console.log(error)
    }
  }

  useEffect(() => {
    getTableData({ search: '' })
  }, [paginationModel])

  const columns: GridColDef[] = [
    {
      field: 'notificationName',
      flex: 1,
      renderHeader: () => <strong>{'Nama'}</strong>,
      editable: true
    },
    {
      field: 'notificationMessage',
      flex: 1,
      renderHeader: () => <strong>{'Pesan'}</strong>,
      editable: true
    },
    {
      field: 'createdAt',
      flex: 1,
      renderHeader: () => <strong>{'Created At'}</strong>,
      editable: true,
      valueFormatter: (item) => convertTime(item.value)
    }
  ]

  if (user.userRole === 'admin') {
    columns.push({
      field: 'actions',
      type: 'actions',
      renderHeader: () => <strong>{'ACTION'}</strong>,
      flex: 1,
      cellClassName: 'actions',
      getActions: ({ row }) => {
        return [
          <GridActionsCellItem
            icon={<DeleteIcon color='error' />}
            label='Delete'
            onClick={() => handleOpenModalDelete(row)}
            color='inherit'
          />
        ]
      }
    })
  }

  function CustomToolbar() {
    const [search, setSearch] = useState<string>('')
    return (
      <GridToolbarContainer sx={{ justifyContent: 'space-between', mb: 2 }}>
        <Stack direction='row' spacing={2}>
          <GridToolbarExport />
          {user.userRole === 'admin' && (
            <Button
              onClick={() => navigation('create')}
              startIcon={<Add />}
              variant='outlined'
            >
              Create Notification
            </Button>
          )}
        </Stack>
        <Stack direction={'row'} spacing={1} alignItems={'center'}>
          <TextField
            size='small'
            placeholder='search...'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Button variant='outlined' onClick={() => getTableData({ search })}>
            Search
          </Button>
        </Stack>
      </GridToolbarContainer>
    )
  }

  return (
    <>
      <BreadCrumberStyle
        navigation={[
          {
            label: 'Notification',
            link: '/notifications',
            icon: <IconMenus.notification fontSize='small' />
          }
        ]}
      />
      <Box
        sx={{
          width: '100%',
          '& .actions': {
            color: 'text.secondary'
          },
          '& .textPrimary': {
            color: 'text.primary'
          }
        }}
      >
        <DataGrid
          rows={tableData}
          columns={columns}
          editMode='row'
          sx={{ padding: 2 }}
          initialState={{
            pagination: { paginationModel: { pageSize: 2, page: 0 } }
          }}
          pageSizeOptions={[2, 5, 10, 25]}
          paginationModel={paginationModel}
          onPaginationModelChange={setPaginationModel}
          slots={{
            toolbar: CustomToolbar
          }}
        />
      </Box>
      <Modal
        openModal={openModalDelete}
        handleModalOnCancel={() => setOpenModalDelete(false)}
        message={
          'Apakah anda yakin ingin menghapus history notifikasi ' +
          modalDeleteData?.notificationName
        }
        handleModal={() => {
          handleDeleteNotification(modalDeleteData?.notificationId ?? '')
          setOpenModalDelete(!openModalDelete)
        }}
      />
    </>
  )
}
