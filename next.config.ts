import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  env: {
    API_DOMAIN: process.env.API_DOMAIN,
    AES_SECRET: process.env.AES_SECRET,
    SECRET_TOKEN: process.env.SECRET_TOKEN,
    APPWRITE_STORAGE_ENDPOINT: process.env.APPWRITE_STORAGE_ENDPOINT,
    ENV: process.env.ENV,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID,
    GITHUB_CLIENT_SECRET: process.env.GITHUB_CLIENT_SECRET,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET
  },
  images: {
    domains: ['cloud.appwrite.io']
  }
}

export default nextConfig
