/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import React, { useState, useEffect } from 'react'
import { BrandLogo } from '@/components/BrandLogo'
import { Input } from '@heroui/react'
import { requestAPI } from '@/helpers/api-request'
import { PATH_API } from '@/helpers/api-uri'
import toast from '@/helpers/toast'
import { Button } from '@heroui/button'
import { isEmpty } from 'lodash'
import { decodeJwt } from '@/helpers/utils'
import Cookies from 'js-cookie'

export default function SignupVerifyEmail() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const email = searchParams.get('email') as string

  const [otp, setOtp] = useState('')
  const [requestAction, setRequestAction] = useState('initial')
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (isEmpty(email)) {
      router.push('/signup')
    }
  }, [email])

  const handleResend = async () => {
    setRequestAction('loading')
    await requestAPI.get(PATH_API.SEND_OTP, {
      params: {
        email
      }
    })
    setRequestAction('resent')
  }

  const handleVerify = async (e: any) => {
    e.preventDefault()
    setIsLoading(true)
    const response = await requestAPI.get(PATH_API.VERIFY_EMAIL, {
      params: {
        action: 'verify-email',
        otp,
        email
      }
    })
    if (response.isSuccess) {
      const jwtData = decodeJwt(response.payload.data)
      Cookies.set('Authorization', response.payload.data, {
        expires: jwtData.expire,
        secure: true,
        path: '/'
      })
      router.push('/app')
    } else {
      toast.error(response.message)
    }
    setIsLoading(false)
  }

  return (
    <div className="overflow-hidden flex flex-col h-screen w-screen">
      <div className="flex flex-row justify-center   ">
        <BrandLogo color={'white'} size={60} className={'py-8'} />
      </div>

      <div
        className={`flex flex-col items-center justify-center mt-[40%] md:mt-[30%] lg:mt-[20%] xl:mt-[10%] 2xl:mt-[5%]`}
      >
        <div className="bg-content1 w-[95%] sm:w-[85%] md:w-[70%] lg:w-[50%] xl:w-[35%] 2xl:w-[25%] flex flex-col gap-4  p-6 rounded-lg ">
          <h1 className={'text-2xl font-medium'}>Verify your email</h1>
          <p>
            We sent you a six digit confirmation code to <b>{email}</b>. Please enter it below to
            confirm your email address.
          </p>
          <form className="flex flex-col gap-4" onSubmit={handleVerify}>
            <Input
              value={otp}
              onValueChange={(value) => {
                if (value.length <= 6) {
                  setOtp(value)
                }
              }}
              variant="bordered"
              size={'lg'}
              type="number"
              label="OTP - Enter 6-digit code"
              maxLength={6}
            />
            <Button
              isLoading={isLoading}
              isDisabled={otp?.length !== 6}
              color="primary"
              type="submit"
            >
              VERIFY OTP
            </Button>
          </form>
          {requestAction === 'initial' && (
            <p>
              Didn&#39;t receive a code?{' '}
              <button onClick={handleResend} className="font-medium text-primary">
                Send code again.
              </button>
            </p>
          )}
          {requestAction === 'resent' && <p>A new code was sent - check your email.</p>}
          {requestAction === 'loading' && <p>Resending verify code...</p>}
        </div>
      </div>
    </div>
  )
}
