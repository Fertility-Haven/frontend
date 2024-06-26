import { useState } from 'react'
import {
  Button,
  Card,
  Typography,
  Box,
  TextField,
  Stack,
  Select,
  MenuItem,
  InputLabel,
  Grid,
  FormControl
} from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useHttp } from '../../hooks/http'
import { IUserCreateRequestModel } from '../../models/userModel'
import BreadCrumberStyle from '../../components/breadcrumb/Index'
import { IconMenus } from '../../components/icon'

export default function CreateUserView() {
  const { handlePostRequest } = useHttp()
  const navigate = useNavigate()

  const [userEmail, setUserEmail] = useState('')
  const [userName, setUserName] = useState('')
  const [userPassword, setUserPassword] = useState('')
  const [userRole, setUserRole] = useState('')

  const handleSubmit = async () => {
    try {
      const payload: IUserCreateRequestModel = {
        userName,
        userEmail,
        userPassword,
        userRole
      }

      await handlePostRequest({
        path: '/users/register',
        body: payload
      })

      navigate('/users')
    } catch (error: unknown) {
      console.log(error)
    }
  }

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
            label: 'Create',
            link: '/users/create'
          }
        ]}
      />
      <Card
        sx={{
          mt: 5,
          p: { xs: 3, md: 5 }
        }}
      >
        <Typography variant='h4' marginBottom={5} color='primary' fontWeight={'bold'}>
          Create User
        </Typography>
        <Box
          component='form'
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center'
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                label='Nama'
                id='outlined-start-adornment'
                sx={{ m: 1 }}
                value={userName}
                type='text'
                fullWidth
                onChange={(e) => {
                  setUserName(e.target.value)
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label='E-mail'
                id='outlined-start-adornment'
                sx={{ m: 1 }}
                value={userEmail}
                fullWidth
                type='email'
                onChange={(e) => {
                  setUserEmail(e.target.value)
                }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label='Password'
                id='outlined-start-adornment'
                sx={{ m: 1 }}
                value={userPassword}
                type='password'
                fullWidth
                onChange={(e) => {
                  setUserPassword(e.target.value)
                }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel id='demo-multiple-name-label'>Choice Role</InputLabel>
                <Select
                  labelId='demo-select-small-label'
                  id='demo-select-small'
                  value={userRole}
                  fullWidth
                  sx={{ m: 1 }}
                  onChange={(e) => setUserRole(e.target.value)}
                >
                  <MenuItem selected value={'patient'}>
                    Patient
                  </MenuItem>
                  <MenuItem selected value={'therapist'}>
                    Therapist
                  </MenuItem>
                  <MenuItem selected value={'admin'}>
                    Admin
                  </MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
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
