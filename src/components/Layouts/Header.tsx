import React from 'react'
import { paths } from 'consts/paths'
import { ButtonHeader } from 'styles/Button'
import { useNavigate, useLocation } from 'react-router-dom'
import { Box, CardMedia } from '@mui/material'
import { Badge, Space } from 'antd'

import userStore from 'stores/user'
import { checkMining } from 'api/blockchain'
import DropdownHeader from './DropdownHeader'

const Header = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { user } = userStore()
  const [countCheckMine, setCountCheckMine] = React.useState<number>(0)

  const handleCheckMine = async () => {
    const { data } = await checkMining()
    if (data?.success) {
      setCountCheckMine(data?.data)
    }
  }

  React.useEffect(() => {
    handleCheckMine()
  }, [location.pathname])

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
      <Space>
        <ButtonHeader
          onClick={() => {
            navigate(paths.transaction)
          }}
        >
          Transaction
        </ButtonHeader>
        <Badge style={{ backgroundColor: '#52c41a' }} count={countCheckMine}>
          <ButtonHeader
            onClick={() => {
              navigate(paths.pendingTransaction)
            }}
          >
            Pending Transactions
          </ButtonHeader>
        </Badge>
      </Space>

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
