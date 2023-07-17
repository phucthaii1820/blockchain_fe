import React from 'react'
import { motion } from 'framer-motion'
import { Box, Button, TextField, Typography } from '@mui/material'

import LayoutMain from 'components/Layouts'
import userStore from 'stores/user'
import { getWallet } from 'api/user'
import { transaction } from 'api/blockchain'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { paths } from 'consts/paths'

const Transaction = () => {
  const navigate = useNavigate()
  const { getUser } = userStore()
  const user = getUser()
  const [dataWallet, setDataWallet] = React.useState<any>({
    balance: 0,
    publicKey: '',
    privateKey: '',
    username: '',
  })
  const [dataTransaction, setDataTransaction] = React.useState<any>({
    toAddress: '',
    amount: 0,
  })

  const getDataWallet = async () => {
    const { data } = await getWallet(user?.publicKey)
    if (data?.success) {
      setDataWallet(data?.data)
    }
  }

  const handleTransaction = async () => {
    if (!dataTransaction?.toAddress || !dataTransaction?.amount) {
      toast.error('Vui lòng nhập đầy đủ thông tin')
      return
    }
    if (dataTransaction?.amount > dataWallet?.balance) {
      toast.error('Số dư không đủ')
      return
    }
    if (dataTransaction?.amount < 1) {
      toast.error('Số tiền phải lớn hơn 0')
      return
    }

    if (dataTransaction?.toAddress === user?.publicKey) {
      toast.error('Không thể gửi cho chính mình')
      return
    }

    const { data } = await transaction(
      dataWallet?.privateKey,
      dataWallet?.publicKey,
      dataTransaction?.toAddress,
      dataTransaction?.amount,
    )
    if (data?.success) {
      toast.success('Tạo giao dịch thành công')
      navigate(paths.pendingTransaction)
    } else {
      toast.error(data?.message)
    }
  }

  React.useEffect(() => {
    getDataWallet()
  }, [])
  return (
    <LayoutMain>
      <motion.div animate={{ y: [-1200, 0] }} transition={{ ease: 'easeOut', duration: 0.6 }}>
        <Box
          sx={{
            background: 'white',
            opacity: '0.6',
            maxWidth: '1200px',
            mt: '100px',
            p: '32px',
            borderRadius: '8px',
            mx: 'auto',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Typography variant="h5" fontWeight={700}>
              Create Transaction
            </Typography>
            <Typography variant="body1" fontWeight={700}>
              Coin in wallet: {dataWallet?.balance} coin
            </Typography>
          </Box>
          <Typography fontWeight={700} mb={1} mt={4}>
            From address
          </Typography>
          <TextField fullWidth disabled value={user?.publicKey} />
          <Typography fontWeight={700} mb={1} mt={2}>
            To address
          </Typography>
          <TextField
            fullWidth
            value={dataTransaction?.toAddress}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setDataTransaction({ ...dataTransaction, toAddress: e.target.value })
            }
          />
          <Typography fontWeight={700} mb={1} mt={2}>
            Amount
          </Typography>
          <TextField
            fullWidth
            type="number"
            InputProps={{ inputProps: { min: 1 } }}
            value={dataTransaction?.amount}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setDataTransaction({ ...dataTransaction, amount: e.target.value })
            }
          />

          <Button
            variant="contained"
            fullWidth
            sx={{
              mt: 2,
            }}
            onClick={handleTransaction}
          >
            Sign & Transaction
          </Button>
        </Box>
      </motion.div>
    </LayoutMain>
  )
}

export default Transaction
