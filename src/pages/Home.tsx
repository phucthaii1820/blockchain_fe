import React from 'react'

import LayoutMain from 'components/Layouts'

import ListBlock from 'components/Cards/ListBlock'
import { getBlocks } from 'api/blockchain'
import { IBlock } from 'types/block'
import { Divider } from 'antd'
import DetailTransaction from 'components/Transaction/DetailTransaction'

const Home = () => {
  const [dataBlocks, setDataBlocks] = React.useState<IBlock[]>([])
  const [hashChoose, setHashChoose] = React.useState<string>('')

  const getDataBlocks = async () => {
    const { data } = await getBlocks()
    if (data?.success) {
      setDataBlocks(data?.data?.map((item: any) => ({ ...item, key: item.index })).reverse())
    }
  }

  React.useEffect(() => {
    getDataBlocks()
  }, [])

  return (
    <LayoutMain>
      <ListBlock blocks={dataBlocks} setHashChoose={setHashChoose} />
      <Divider
        style={{
          backgroundColor: 'white',
        }}
      />
      <DetailTransaction hashChoose={hashChoose} />
    </LayoutMain>
  )
}

export default Home
