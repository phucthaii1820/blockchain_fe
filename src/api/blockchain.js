import { pathApiUrl } from 'consts/pathApiUrl'
import HttpUtility from './HttpUtility'

const apiUrl = process.env.REACT_APP_API_URL

export const getBlocks = async () => {
  return HttpUtility.get(apiUrl + pathApiUrl.blocks)
}

export const getBlock = async (blockHash) => {
  return HttpUtility.get(`${apiUrl}${pathApiUrl.block}/${blockHash}`)
}
