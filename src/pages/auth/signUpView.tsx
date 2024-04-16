import { useState } from 'react'
import {
  Button,
  Card,
  Typography,
  Container,
  Stack,
  Box,
  TextField,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup
} from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'
import { useHttp } from '../../hooks/http'
import { IUserCreateRequestModel } from '../../models/userModel'

export default function SignUpView() {
  const { handlePostRequest } = useHttp()
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [userName, setUserName] = useState('')
  const [userRole, setUserRole] = useState('')

  const handleSubmit = async () => {
    try {
      const payload: IUserCreateRequestModel = {
        userName: userName,
        userEmail: email,
        userPassword: password,
        userRole
      }
      await handlePostRequest({
        path: '/users/register',
        body: payload
      })
      navigate('/')
    } catch (error: unknown) {
      console.log(error)
    }
  }

  return (
    <>
      <Container maxWidth='xs'>
        <Card
          sx={{
            mt: 5,
            p: 8,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <Typography variant='h4' marginBottom={5} color='primary' fontWeight={'bold'}>
            Sign Up
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
              label='User Name'
              id='outlined-start-adornment'
              sx={{ m: 1, width: '36ch' }}
              value={userName}
              onChange={(e) => {
                setUserName(e.target.value)
              }}
            />
            <TextField
              label='E-mail'
              id='outlined-start-adornment'
              sx={{ m: 1, width: '36ch' }}
              value={email}
              type='email'
              onChange={(e) => {
                setEmail(e.target.value)
              }}
            />

            <TextField
              label='Password'
              id='outlined-start-adornment'
              sx={{ m: 1, width: '36ch' }}
              value={password}
              type='password'
              onChange={(e) => {
                setPassword(e.target.value)
              }}
            />

            <FormControl sx={{ m: 1, width: '36ch' }}>
              <FormLabel id='demo-radio-buttons-group-label'>register as</FormLabel>

              <RadioGroup
                aria-labelledby='demo-radio-buttons-group-label'
                defaultValue='female'
                name='radio-buttons-group'
              >
                <Stack direction={'row'} flexWrap={'wrap'} spacing={2}>
                  {['patient', 'therapist'].map((mood) => (
                    <FormControlLabel
                      key={mood}
                      value={mood}
                      control={<Radio onChange={(e) => setUserRole(e.target.value)} />}
                      label={mood}
                    />
                  ))}
                </Stack>
              </RadioGroup>
            </FormControl>

            <Button
              sx={{
                m: 1,
                width: '39ch',
                backgroundColor: 'dodgerblue',
                color: '#FFF',
                fontWeight: 'bold'
              }}
              variant={'contained'}
              onClick={handleSubmit}
            >
              Sign Up
            </Button>
          </Box>
          <Stack direction='row' alignItems='center' mt={5}>
            <Typography>Sudah punya akun?</Typography>
            <Link style={{ paddingLeft: '10px', textDecoration: 'none' }} to='login'>
              Login
            </Link>
          </Stack>
        </Card>
      </Container>
    </>
  )
}
