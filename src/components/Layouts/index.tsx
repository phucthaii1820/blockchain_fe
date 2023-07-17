import React from 'react'

import { Box, Container } from '@mui/material'

import { theme } from 'theme/theme.config'
import Header from './Header'

interface PropsLayout {
  children: React.ReactNode
}

const LayoutMain = ({ children }: PropsLayout) => {
  return (
    <Box
      sx={{
        backgroundColor: theme.palette.primary.main,
      }}
    >
      <Container maxWidth="xl">
        <Box
          sx={{
            minHeight: '100vh',
          }}
        >
          <Header />
          <Box
            sx={{
              px: '16px',
            }}
          >
            {children}
          </Box>
        </Box>
      </Container>
    </Box>
  )
}

export default LayoutMain
