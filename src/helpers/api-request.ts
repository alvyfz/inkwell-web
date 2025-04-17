import { METHOD } from '@/helpers/api-uri'
import Axios from 'axios'
import Cookies from 'js-cookie'
import { encryptAES } from '@/helpers/crypto-aes'
import nextConfig from '../../next.config'

const request = async (
  method: string,
  url: string,
  request?: { params?: any; headers?: any },
  timeout?: number
) => {
  const apiKey = {
    key: nextConfig?.env?.SECRET_TOKEN,
    expiry: Date.now() + 1000 * 60 * 5
  }
  let headers: any = {
    'Content-Type': 'application/json',
    'Api-Key': encryptAES(JSON.stringify(apiKey))
  }
  const token = Cookies.get('Authorization')
  if (token) {
    headers.Authorization = 'Bearer ' + token
  }
  if (request?.headers) {
    headers = {
      ...headers,
      ...request.headers
    }
  }

  const config = {
    url,
    method,
    data: request?.params ?? undefined,
    timeout: timeout ?? 25000,
    headers
  }

  console.log(config)

  Axios.defaults.timeout = timeout ?? 25000

  return Axios(config)
}

export const findJsonInString = (string: any) => {
  let toObj = string.toString().match(/\{(?:[^{}]|(\?R))*\}/g)
  if (toObj === null) return string
  toObj = JSON.parse(toObj[0])
  return toObj
}

const requestResource = async (
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE',
  url: string,
  data?: { params?: any; headers?: any },
  timeout?: number
) => {
  const _url = `${url}${
    method === 'GET' && data?.params ? `?${new URLSearchParams(data.params)}` : ''
  }`
  try {
    const res = await request(method, _url, data, timeout)
    if (res.status === 200) {
      return res.data
    } else {
      return {
        isSuccess: false,
        code: res?.status || res?.data?.code || 500,
        message: res?.data?.message || 'Unknown error'
      }
    }
  } catch (err: any) {
    console.log(`API ${_url} ERROR: `, err)
    // const parseError = findJsonInString(err as any);
    return {
      isSuccess: false,
      code: err?.response?.data?.code || err?.status || err?.response?.status || 500,
      message: err?.response?.data?.message || 'Unknown error'
    }
  }
}

const post = async (path: string, data?: { params?: any; headers?: any }, timeout?: number) =>
  requestResource(METHOD.POST, nextConfig?.env?.API_DOMAIN + path, data, timeout)

const put = async (path: string, data?: { params?: any; headers?: any }, timeout?: number) =>
  requestResource(METHOD.PUT, nextConfig?.env?.API_DOMAIN + path, data, timeout)

const get = async (path: string, data?: { params?: any; headers?: any }, timeout?: number) =>
  requestResource(METHOD.GET, nextConfig?.env?.API_DOMAIN + path, data, timeout)

const patch = async (path: string, data?: { params?: any; headers?: any }, timeout?: number) =>
  requestResource(METHOD.PATCH, nextConfig?.env?.API_DOMAIN + path, data, timeout)

const deleteApi = async (path: string, data?: { params?: any; headers?: any }, timeout?: number) =>
  requestResource(METHOD.DELETE, nextConfig?.env?.API_DOMAIN + path, data, timeout)

export const requestAPI = {
  post,
  put,
  get,
  patch,
  delete: deleteApi
}
