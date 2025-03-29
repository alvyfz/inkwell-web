import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  env: {
    API_DOMAIN: process.env.API_DOMAIN,
    AES_SECRET: process.env.AES_SECRET,
    SECRET_TOKEN: process.env.SECRET_TOKEN,
    APPWRITE_STORAGE_ENDPOINT: process.env.APPWRITE_STORAGE_ENDPOINT,
    ENV: process.env.ENV,
  },
  images: {
    domains: ['cloud.appwrite.io']
  },
}

export default nextConfig
