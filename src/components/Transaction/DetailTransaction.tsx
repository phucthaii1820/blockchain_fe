import React from 'react'
import { Box, Typography } from '@mui/material'
import { Table, Tooltip } from 'antd'
import type { ColumnsType } from 'antd/es/table'

import { getBlock } from 'api/blockchain'
import userStore from 'stores/user'
import { toast } from 'react-toastify'

interface PropsDetailTransaction {
  hashChoose: string
}

interface ITransaction {
  key: number
  amount: number
  fromAddress: string
  toAddress: string
}

const DetailTransaction = ({ hashChoose }: PropsDetailTransaction) => {
  const { getUser } = userStore()
  const user = getUser()
  const [dataBlock, setDataBlock] = React.useState<any>({
    index: 0,
    transactions: [],
  })

  const getDataTransaction = async (hash: string) => {
    const { data } = await getBlock(hash)

    if (data?.success) {
      setDataBlock({
        index: data?.data?.index,
        transactions: data?.data?.transactions?.map((item: any, index: number) => ({
          ...item,
          key: index + 1,
        })),
      })
    }
  }

  const columns: ColumnsType<ITransaction> = [
    {
      title: '#',
      dataIndex: 'key',
      key: 'key',
      render: (_, record) => (
        <Box
          sx={{
            color: 'primary.main',
            cursor: 'pointer',
          }}
        >
          {record.key}
        </Box>
      ),
    },
    {
      title: 'From address',
      dataIndex: 'fromAddress',
      key: 'fromAddress',
      render: (text) => (
        <Box>
          <Tooltip title="Click để copy">
            <Typography
              sx={{
                maxWidth: '400px',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                color: text !== null ? 'blue' : 'none',
                cursor: 'pointer',
              }}
              onClick={() => {
                navigator.clipboard
                  .writeText(text)
                  .then(() => {
                    toast.success('Đã copy địa chỉ ví')
                  })
                  .catch((err) => {
                    toast.error(err)
                  })
              }}
            >
              {text !== null ? text : 'System'}
            </Typography>
          </Tooltip>

          {text === null && (
            <Typography variant="subtitle2" color="gray">
              (Reward)
            </Typography>
          )}
          {text === user?.publicKey && (
            <Typography variant="subtitle2" color="gray">
              (That`&apos;`s yours!)
            </Typography>
          )}
        </Box>
      ),
    },
    {
      title: 'To address',
      dataIndex: 'toAddress',
      key: 'toAddress',
      render: (text) => (
        <Box>
          <Tooltip title="Click để copy">
            <Typography
              sx={{
                maxWidth: '400px',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                color: text !== null ? 'blue' : 'none',
                cursor: 'pointer',
              }}
              onClick={() => {
                navigator.clipboard
                  .writeText(text)
                  .then(() => {
                    toast.success('Đã copy địa chỉ ví')
                  })
                  .catch((err) => {
                    toast.error(err)
                  })
              }}
            >
              {text !== null ? text : 'System'}
            </Typography>
          </Tooltip>
          {text === user?.publicKey && (
            <Typography variant="subtitle2" color="gray">
              (That&apos;s yours!)
            </Typography>
          )}
        </Box>
      ),
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      render: (text) => <div>{text}</div>,
    },
    {
      title: 'Timestamp',
      dataIndex: 'timestamp',
      key: 'timestamp',
      render: (text) => (
        <div>
          <Typography>{text}</Typography>
          <Typography variant="subtitle2" color="gray">
            ({new Date(text).toLocaleString()})
          </Typography>
        </div>
      ),
    },
  ]

  React.useEffect(() => {
    if (hashChoose) getDataTransaction(hashChoose)
  }, [hashChoose])

  return (
    <Box>
      <Typography variant="h4" fontWeight="700" color="white" mb={1}>
        Transactions inside block {dataBlock?.index}
      </Typography>
      <Table columns={columns} dataSource={dataBlock?.transactions} />
    </Box>
  )
}

export default DetailTransaction
