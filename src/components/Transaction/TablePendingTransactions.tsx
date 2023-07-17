import React from 'react'
import { ColumnsType } from 'antd/es/table'
import { Table, Tooltip } from 'antd'
import { Box, Typography } from '@mui/material'

import { IPendingTransactions, ITransaction } from 'types/block'
import { toast } from 'react-toastify'

const TablePendingTransactions = ({ transactions }: IPendingTransactions) => {
  const columns: ColumnsType<ITransaction> = [
    {
      title: '#',
      dataIndex: 'index',
      key: 'index',
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
        <Tooltip title="Click để copy">
          <Typography
            sx={{
              maxWidth: '400px',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              cursor: 'pointer',
              fontWeight: '900',
            }}
            onClick={() => {
              navigator.clipboard
                .writeText(text)
                .then(() => {
                  toast.success('Đã copy hash')
                })
                .catch((err) => {
                  toast.error(err)
                })
            }}
          >
            {text}
          </Typography>
        </Tooltip>
      ),
    },
    {
      title: 'To address',
      dataIndex: 'toAddress',
      key: '=toAddress',
      render: (text) => (
        <Tooltip title="Click để copy">
          <Typography
            sx={{
              maxWidth: '400px',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              cursor: 'pointer',
              fontWeight: '900',
            }}
            onClick={() => {
              navigator.clipboard
                .writeText(text)
                .then(() => {
                  toast.success('Đã copy previous hash')
                })
                .catch((err) => {
                  toast.error(err)
                })
            }}
          >
            {text}
          </Typography>
        </Tooltip>
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
  return <Table columns={columns} dataSource={transactions} />
}

export default TablePendingTransactions
