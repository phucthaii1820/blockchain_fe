import { pathApiUrl } from 'consts/pathApiUrl'
import HttpUtility from './HttpUtility'

const apiUrl = process.env.REACT_APP_API_URL

export const getBlocks = async () => {
  return HttpUtility.get(apiUrl + pathApiUrl.blocks)
}

export const getBlock = async (blockHash) => {
  return HttpUtility.get(`${apiUrl}${pathApiUrl.block}/${blockHash}`)
}

export const transaction = async (privateKey, fromAddress, toAddress, amount) => {
  return HttpUtility.post(`${apiUrl}${pathApiUrl.transaction}`, {
    privateKey,
    fromAddress,
    toAddress,
    amount,
  })
}

export const checkMining = async () => {
  return HttpUtility.get(`${apiUrl}${pathApiUrl.checkMining}`)
}

export const getPendingTransactions = async () => {
  return HttpUtility.get(`${apiUrl}${pathApiUrl.pendingTransactions}`)
}

export const mining = async (publicKey) => {
  return HttpUtility.post(`${apiUrl}${pathApiUrl.mining}`, {
    publicKey,
  })
}
