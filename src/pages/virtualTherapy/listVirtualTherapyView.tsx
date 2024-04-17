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
import { MoreOutlined } from '@mui/icons-material'
import { useEffect, useState } from 'react'
import { useHttp } from '../../hooks/http'
import { Button, Stack, TextField } from '@mui/material'
import BreadCrumberStyle from '../../components/breadcrumb/Index'
import { IconMenus } from '../../components/icon'
// import { useNavigate } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode'
import { useToken } from '../../hooks/token'
import { IUserModel } from '../../models/userModel'
import CallIcon from '@mui/icons-material/Call'

export default function ListVirtualTherapyView() {
  // const navigation = useNavigate()
  const [tableData, setTableData] = useState<GridRowsProp[]>([])
  const { handleGetTableDataRequest } = useHttp()

  const { getToken } = useToken()
  const token = getToken()
  const user: IUserModel = jwtDecode(token ?? '')

  const [paginationModel, setPaginationModel] = useState({
    pageSize: 25,
    page: 0
  })

  const getTableData = async ({ search }: { search: string }) => {
    try {
      const result = await handleGetTableDataRequest({
        path: '/users',
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
      field: 'userName',
      flex: 1,
      renderHeader: () => <strong>{'Name'}</strong>,
      editable: true
    },
    {
      field: 'userRole',
      flex: 1,
      renderHeader: () => <strong>{'Role'}</strong>,
      editable: true
    },
    {
      field: 'userEmail',
      flex: 1,
      renderHeader: () => <strong>{'E-mail'}</strong>,
      editable: true
    },
    {
      field: 'actions',
      type: 'actions',
      renderHeader: () => <strong>{'ACTION'}</strong>,
      flex: 1,
      cellClassName: 'actions',
      getActions: ({ row }) => {
        const actionButtons = []

        if (user.userRole === 'patient') {
          actionButtons.push(
            <GridActionsCellItem
              icon={<CallIcon color='info' />}
              label='Booking'
              // onClick={() => navigation('detail/' + row.dailyJournalId)}
              color='inherit'
            />
          )
        }

        actionButtons.push(
          <GridActionsCellItem
            icon={<MoreOutlined color='info' />}
            label='Detail'
            // onClick={() => navigation('detail/' + row.dailyJournalId)}
            color='inherit'
          />
        )
        return actionButtons
      }
    }
  ]

  function CustomToolbar() {
    const [search, setSearch] = useState<string>('')
    return (
      <GridToolbarContainer sx={{ justifyContent: 'space-between', mb: 2 }}>
        <Stack direction='row' spacing={2}>
          <GridToolbarExport />
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
    <Box>
      <BreadCrumberStyle
        navigation={[
          {
            label: 'Virtual Therapy',
            link: '/virtual-therapy',
            icon: <IconMenus.therapy fontSize='small' />
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
    </Box>
  )
}
