import React from 'react'
import { Table, Tooltip } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import { Box, Typography } from '@mui/material'
import { IBlock, IBlocks } from 'types/block'
import { toast } from 'react-toastify'

const hashCode = (str: string) => {
  let hash = 0
  for (let i = 0; i < str.length; i += 1) {
    // eslint-disable-next-line no-bitwise
    hash = str.charCodeAt(i) + ((hash << 5) - hash)
  }
  return hash
}

const stringToColor = (str: string) => {
  const hash = hashCode(str)
  // eslint-disable-next-line prefer-template, no-bitwise
  const color = '#' + ((hash & 0xffffff) | 0x1000000).toString(16).slice(1)
  return color
}

const ListBlock = ({ blocks, setHashChoose }: IBlocks) => {
  const columns: ColumnsType<IBlock> = [
    {
      title: 'Index block',
      dataIndex: 'index',
      key: 'index',
      render: (_, record) => (
        <Box
          sx={{
            color: 'primary.main',
            cursor: 'pointer',
          }}
          onClick={() => {
            setHashChoose(record.hash)
          }}
        >
          {record.index}
        </Box>
      ),
    },
    {
      title: 'Hash',
      dataIndex: 'hash',
      key: 'hash',
      render: (text) => (
        <Tooltip title="Click để copy">
          <Typography
            sx={{
              maxWidth: '400px',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              color: stringToColor(text),
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
      title: 'Previous hash',
      dataIndex: 'previousHash',
      key: 'previousHash',
      render: (text) => (
        <Tooltip title="Click để copy">
          <Typography
            sx={{
              maxWidth: '400px',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              color: stringToColor(text),
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
      title: 'Nonce',
      dataIndex: 'nonce',
      key: 'nonce',
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

  return (
    <Box
      sx={{
        mt: '20px',
      }}
    >
      <Typography variant="h4" fontWeight="700" color="white" mb={1}>
        Blocks on chain
      </Typography>
      <Table columns={columns} dataSource={blocks} />
    </Box>
  )
}

export default ListBlock
