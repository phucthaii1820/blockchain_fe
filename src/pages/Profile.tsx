import React from 'react'

import { Grid, Typography } from '@mui/material'
import { motion } from 'framer-motion'

import LayoutMain from 'components/Layouts'
import { getWallet } from 'api/user'
import userStore from 'stores/user'
import { Tooltip } from 'antd'
import { toast } from 'react-toastify'

const Profile = () => {
  const { getUser } = userStore()
  const user = getUser()
  const [dataWallet, setDataWallet] = React.useState<any>({
    balance: 0,
    publicKey: '',
    privateKey: '',
    username: '',
  })

  const getDataWallet = async () => {
    const { data } = await getWallet(user?.publicKey)

    if (data?.success) {
      setDataWallet(data?.data)
    }
  }

  React.useEffect(() => {
    getDataWallet()
  }, [])
  return (
    <LayoutMain>
      <motion.div animate={{ y: [-1200, 0] }} transition={{ ease: 'easeOut', duration: 0.6 }}>
        <Grid
          container
          spacing={2}
          sx={{
            background: 'white',
            opacity: '0.6',
            maxWidth: '800px',
            mt: '100px',
            p: '32px',
            borderRadius: '8px',
            mx: 'auto',
          }}
        >
          <Grid item xs={4}>
            <Typography>Email</Typography>
          </Grid>
          <Grid item xs={8}>
            <Typography>{dataWallet?.username}</Typography>
          </Grid>

          <Grid item xs={4}>
            <Typography>Balance</Typography>
          </Grid>
          <Grid item xs={8}>
            <Typography>{dataWallet?.balance} coin</Typography>
          </Grid>

          <Grid item xs={4}>
            <Typography>Public key</Typography>
          </Grid>
          <Grid item xs={8}>
            <Tooltip title="Click để copy">
              <Typography
                sx={{
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  cursor: 'pointer',
                }}
                onClick={() => {
                  navigator.clipboard
                    .writeText(dataWallet?.publicKey)
                    .then(() => {
                      toast.success('Đã copy public key')
                    })
                    .catch((err) => {
                      toast.error(err)
                    })
                }}
              >
                {dataWallet?.publicKey}
              </Typography>
            </Tooltip>
          </Grid>

          <Grid item xs={4}>
            <Typography>Private key</Typography>
          </Grid>
          <Grid item xs={8}>
            <Tooltip title="Click để copy">
              <Typography
                sx={{
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  cursor: 'pointer',
                }}
                onClick={() => {
                  navigator.clipboard
                    .writeText(dataWallet?.privateKey)
                    .then(() => {
                      toast.success('Đã copy private key')
                    })
                    .catch((err) => {
                      toast.error(err)
                    })
                }}
              >
                {dataWallet?.privateKey}
              </Typography>
            </Tooltip>
          </Grid>
        </Grid>
      </motion.div>
    </LayoutMain>
  )
}

export default Profile
