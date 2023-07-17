import React from 'react'
import LayoutMain from 'components/Layouts'
import { motion } from 'framer-motion'
import { Box, Typography } from '@mui/material'
import LoadingButton from '@mui/lab/LoadingButton'
import { getPendingTransactions, mining } from 'api/blockchain'
import { ITransaction } from 'types/block'
import TablePendingTransactions from 'components/Transaction/TablePendingTransactions'
import userStore from 'stores/user'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const PendingTransaction = () => {
  const { getUser } = userStore()
  const user = getUser()
  const navigate = useNavigate()
  const [dataTransactions, setDataTransactions] = React.useState<ITransaction[]>([])
  const [loading, setLoading] = React.useState<boolean>(false)

  const getDataTransactions = async () => {
    const { data } = await getPendingTransactions()
    if (data?.success) {
      setDataTransactions(data?.data?.map((item: any, index: number) => ({ ...item, key: index + 1 })))
    }
  }

  const handleMining = async () => {
    setLoading(true)
    const { data } = await mining(user?.publicKey)
    if (data?.success) {
      toast.success('Đã đào thành công')
      navigate('/')
    } else {
      toast.error(data?.message)
    }
    setLoading(false)
  }

  React.useEffect(() => {
    getDataTransactions()
  }, [])

  return (
    <LayoutMain>
      <motion.div animate={{ y: [-1200, 0] }} transition={{ ease: 'easeOut', duration: 0.6 }}>
        <Box
          sx={{
            background: 'white',
            opacity: '0.6',
            width: '100%',
            mt: '100px',
            p: '32px',
            borderRadius: '8px',
            mx: 'auto',
          }}
        >
          <Typography variant="h5" fontWeight={700}>
            Pending Transactions
          </Typography>

          <TablePendingTransactions transactions={dataTransactions} />

          <LoadingButton
            variant="contained"
            fullWidth
            sx={{
              mt: 2,
            }}
            onClick={handleMining}
            loading={loading}
          >
            Start Mining
          </LoadingButton>
        </Box>
      </motion.div>
    </LayoutMain>
  )
}

export default PendingTransaction
