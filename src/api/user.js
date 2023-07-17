import { pathApiUrl } from 'consts/pathApiUrl'
import HttpUtility from './HttpUtility'

const apiUrl = process.env.REACT_APP_API_URL

export const login = async (username, password) => {
  return HttpUtility.post(apiUrl + pathApiUrl.login, { username, password })
}

export const register = async (username, password) => {
  return HttpUtility.post(apiUrl + pathApiUrl.register, { username, password })
}

export const getWallet = async (publicKey) => {
  return HttpUtility.get(`${apiUrl}${pathApiUrl.getWallet}?publicKey=${publicKey}`)
}
