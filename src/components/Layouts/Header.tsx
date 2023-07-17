import React from 'react'
import { paths } from 'consts/paths'
import { ButtonHeader } from 'styles/Button'
import { TypographyHeader } from 'styles/Typography'
import { useNavigate } from 'react-router-dom'
import { Box, CardMedia } from '@mui/material'
import userStore from 'stores/user'
import DropdownHeader from './DropdownHeader'

const Header = () => {
  const navigate = useNavigate()
  const { user } = userStore()

  return (
    <Box
      sx={{
        display: 'flex',
        p: '32px 16px',
      }}
    >
      <CardMedia
        component="img"
        image="https://www.myetherwallet.com/img/logo-mew.f6482e98.svg"
        alt="Logo"
        sx={{
          maxHeight: '36px',
          maxWidth: '130px',
          mr: '16px',
          cursor: 'pointer',
        }}
        onClick={() => {
          navigate(paths.home)
        }}
      />
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '300px',
        }}
      >
        <TypographyHeader
          variant="subtitle2"
          sx={{
            cursor: 'pointer',
          }}
        >
          What is MEW
        </TypographyHeader>
        <TypographyHeader variant="subtitle2">Wallet actions</TypographyHeader>
        <TypographyHeader variant="subtitle2">Buy ETH</TypographyHeader>
      </Box>

      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          width: 'calc(100% - 430px)',
          justifyContent: 'flex-end',
        }}
      >
        {!user ? (
          <>
            <ButtonHeader
              sx={{
                fontWeight: 'bold',
                mr: '16px',
              }}
              onClick={() => {
                navigate(paths.login)
              }}
            >
              Login
            </ButtonHeader>

            <ButtonHeader
              sx={{
                fontWeight: 'bold',
              }}
              onClick={() => {
                navigate(paths.register)
              }}
            >
              Create a new wallet
            </ButtonHeader>
          </>
        ) : (
          <DropdownHeader />
        )}
      </Box>
    </Box>
  )
}

export default Header
