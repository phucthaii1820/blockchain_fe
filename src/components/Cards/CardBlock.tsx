import React from 'react'
import { Card, Divider } from 'antd'
import { Box, Typography } from '@mui/material'
import { green, purple } from '@mui/material/colors'
import { IBlock } from 'types/block'

const DividerStyle = {
  margin: '12px 0',
}

const MyDivider = () => <Divider style={DividerStyle} />

const CardBlock = ({ index, hash, previousHash, nonce, timestamp }: IBlock) => {
  return (
    <Card title={`Block ${index + 1}`} bordered={false} style={{ width: 350, margin: '0px 10px' }}>
      <Box>
        <Typography fontWeight={700}>Hash</Typography>
        <Typography color={purple[700]}>{hash}</Typography>
        <Typography fontWeight={700} mt={2}>
          Hash of previous block
        </Typography>
        <Typography color={green[500]}>{previousHash}</Typography>
      </Box>
      <MyDivider />
      <Box>
        <Typography fontWeight={700}>Nonce</Typography>
        <Typography>{nonce}</Typography>
      </Box>
      <MyDivider />
      <Box>
        <Typography fontWeight={700}>Timestamp</Typography>
        <Typography>{timestamp}</Typography>
      </Box>
    </Card>
  )
}

export default CardBlock
