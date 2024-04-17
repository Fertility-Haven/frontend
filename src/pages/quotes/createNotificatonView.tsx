import { useState } from 'react'
import { Button, Card, Typography, Box, TextField, Stack } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useHttp } from '../../hooks/http'
import BreadCrumberStyle from '../../components/breadcrumb/Index'
import { IconMenus } from '../../components/icon'
import { IQuotesCreateRequestModel } from '../../models/quotesModel'

export default function CreateQuotesView() {
  const { handlePostRequest } = useHttp()
  const navigate = useNavigate()

  const [quoteText, setQuoteText] = useState('')

  const handleSubmit = async () => {
    try {
      const payload: IQuotesCreateRequestModel = {
        quoteText
      }
      await handlePostRequest({
        path: '/quotes',
        body: payload
      })
      navigate('/quotes')
    } catch (error: unknown) {
      console.log(error)
    }
  }

  return (
    <>
      <BreadCrumberStyle
        navigation={[
          {
            label: 'Quotes',
            link: '/quotes',
            icon: <IconMenus.inspirationQuote fontSize='small' />
          },
          {
            label: 'Create',
            link: '/quotes/create'
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
          Create Quotes
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
            label='Quotes'
            id='outlined-start-adornment'
            sx={{ m: 1 }}
            value={quoteText}
            type='text'
            onChange={(e) => {
              setQuoteText(e.target.value)
            }}
          />

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
