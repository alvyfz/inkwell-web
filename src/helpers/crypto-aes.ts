import CryptoJS from 'crypto-js'
import { isEmpty } from 'lodash'
import nextConfig from '../../next.config'

export const encryptAES = (text: string) =>
  CryptoJS.AES.encrypt(text, nextConfig?.env?.AES_SECRET as string).toString()

export const decryptAES = (text: string) => {
  if (isEmpty(text)) return undefined
  return CryptoJS.AES.decrypt(text, nextConfig?.env?.AES_SECRET as string)?.toString(
    CryptoJS.enc.Utf8
  )
}
