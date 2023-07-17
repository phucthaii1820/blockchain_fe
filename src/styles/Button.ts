import { Button, styled } from '@mui/material'
import { theme } from 'theme/theme.config'

export const ButtonPrimary = styled(Button)({
  borderRadius: '8px',
  backgroundColor: theme.palette.primary.main,
  color: 'white',
  // '&:hover': {
  //   opacity: 1,
  // },
})

export const ButtonHeader = styled(Button)({
  borderRadius: '8px',
  border: '1px solid white',
  backgroundColor: 'rgba(255, 0, 0, 0)',
  color: 'white',
  '&:hover': {
    opacity: 1,
  },
})
