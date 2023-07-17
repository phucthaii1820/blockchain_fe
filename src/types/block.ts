export interface IBlock {
  index: number
  timestamp: number
  previousHash: string
  hash: string
  nonce: number
}

export interface IBlocks {
  blocks: IBlock[]
  // eslint-disable-next-line no-unused-vars
  setHashChoose: (hashChoose: string) => void
}
