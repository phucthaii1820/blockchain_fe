import React from 'react'

import { motion } from 'framer-motion'
import { Box, InputAdornment, TextField, Typography } from '@mui/material'

import LayoutMain from 'components/Layouts'
import Icon from 'consts/icon'
import { ButtonPrimary } from 'styles/Button'
import { paths } from 'consts/paths'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { register } from 'api/user'

const Register = () => {
  const navigate = useNavigate()
  const { EmailIcon, LockIcon, ArrowForwardIcon } = Icon()
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [confirmPassword, setConfirmPassword] = React.useState('')

  const hanldeRegister = async () => {
    if (password !== confirmPassword) {
      toast.error('Mật khẩu không khớp')
      return
    }

    const { data } = await register(email, password)
    if (data.success) {
      toast.success('Đăng ký thành công')
      navigate(paths.login)
    } else {
      toast.error(data.message)
    }
  }

  return (
    <LayoutMain>
      <motion.div animate={{ y: [-1200, 0] }} transition={{ ease: 'easeOut', duration: 0.6 }}>
        <Box
          sx={{
            background: 'white',
            opacity: '0.6',
            maxWidth: '500px',
            mx: 'auto',
            mt: '100px',
            p: '32px',
            borderRadius: '8px',
          }}
        >
          <Typography variant="h6" sx={{ mb: '16px' }}>
            Register
          </Typography>
          <Typography variant="subtitle2">Email</Typography>
          <TextField
            type="email"
            variant="outlined"
            fullWidth
            sx={{ mb: '16px' }}
            InputProps={{
              style: {
                borderRadius: '8px',
              },
              startAdornment: (
                <InputAdornment position="start">
                  <EmailIcon />
                </InputAdornment>
              ),
            }}
            onChange={(e) => {
              setEmail(e.target.value)
            }}
          />

          <Typography variant="subtitle2">Password</Typography>
          <TextField
            type="password"
            variant="outlined"
            fullWidth
            sx={{ mb: '16px' }}
            InputProps={{
              style: {
                borderRadius: '8px',
              },
              startAdornment: (
                <InputAdornment position="start">
                  <LockIcon />
                </InputAdornment>
              ),
            }}
            onChange={(e) => {
              setPassword(e.target.value)
            }}
          />

          <Typography variant="subtitle2">Confirm password</Typography>
          <TextField
            type="password"
            variant="outlined"
            fullWidth
            sx={{ mb: '16px' }}
            InputProps={{
              style: {
                borderRadius: '8px',
              },
              startAdornment: (
                <InputAdornment position="start">
                  <LockIcon />
                </InputAdornment>
              ),
            }}
            onChange={(e) => {
              setConfirmPassword(e.target.value)
            }}
          />

          <ButtonPrimary variant="contained" fullWidth onClick={hanldeRegister}>
            Register
          </ButtonPrimary>

          <Box
            sx={{
              mt: '16px',
              display: 'flex',
              justifyContent: 'flex-end',
              alignItems: 'center',
              cursor: 'pointer',

              '&:hover': {
                transform: 'translateY(-2px)',
                transition: 'all 0.2s ease-in-out',
              },
            }}
            onClick={() => {
              navigate(paths.login)
            }}
          >
            <Typography
              variant="subtitle2"
              sx={{
                textAlign: 'end',
              }}
            >
              Have a wallet?
            </Typography>
            <ArrowForwardIcon
              sx={{
                fontSize: '14px',
              }}
            />
          </Box>
        </Box>
      </motion.div>
    </LayoutMain>
  )
}

export default Register
