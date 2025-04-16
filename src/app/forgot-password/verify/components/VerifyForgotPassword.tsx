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
import { isValidPassword } from '@/helpers/utils'
import { useForm } from '@mantine/form'

type SignupFormType = {
  otp: string
  password: string
  password2: string
}

export default function VerifyForgotPassword() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const email = searchParams.get('email') as string

  const [requestAction, setRequestAction] = useState('initial')
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm({
    initialValues: {
      otp: '',
      password: '',
      password2: ''
    } as SignupFormType,
    validate: {
      otp: (value) => (value.length !== 6 ? 'OTP must be 6 number ' : null),
      password2: (value, prev) => (value !== prev.password ? 'Password not same' : null),
      password: (value) =>
        isValidPassword(value)
          ? null
          : 'Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character'
    }
  })

  useEffect(() => {
    if (isEmpty(email)) {
      router.push('/forgot-password')
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

  const handleVerify = async (values: any) => {
    if (form.isValid()) {
      setIsLoading(true)
      const response = await requestAPI.get(PATH_API.VERIFY_EMAIL, {
        params: {
          action: 'forgot-password',
          otp: values.otp,
          email,
          password: values.password
        }
      })
      if (response.isSuccess) {
        toast.success('Password updated successfully, Please login.')
        router.replace('/login')
      } else {
        toast.error(response.message)
      }
      setIsLoading(false)
    }
  }

  return (
    <div className=" flex flex-col h-screen w-screen">
      <div className="flex flex-row justify-center   ">
        <BrandLogo color={'white'} size={80} className={'py-8'} />
      </div>

      <div
        className={`flex flex-col items-center justify-center mt-[10%] md:mt-[10%] lg:mt-[10%] xl:mt-[5%] 2xl:mt-[5%]`}
      >
        <div className="bg-content1 w-[95%] sm:w-[85%] md:w-[70%] lg:w-[50%] xl:w-[35%] 2xl:w-[25%] flex flex-col gap-4  p-6 rounded-lg ">
          <h1 className={'text-2xl font-medium'}>Verify your email and update your password</h1>
          <p>
            We sent you a six digit confirmation code to <b>{email}</b>. Please enter it below to
            confirm your email address.
          </p>
          <form
            className="flex flex-col gap-4"
            onSubmit={form.onSubmit((values) => handleVerify(values))}
          >
            <Input
              name="otp"
              value={form.values.otp}
              onValueChange={(value) => {
                if (value.length <= 6) {
                  form.setFieldValue('otp', value)
                }
              }}
              variant="bordered"
              size={'lg'}
              type="number"
              label="OTP - Enter 6-digit code"
              maxLength={6}
              errorMessage={form.errors.otp}
              isInvalid={!!form.errors.otp}
              classNames={{ label: 'text-foreground', input: 'text-foreground' }}
              isRequired
            />
            <Input
              autoComplete="off"
              label="Password"
              type="password"
              {...form.getInputProps('password')}
              errorMessage={form.errors.password}
              isInvalid={!!form.errors.password}
              isRequired
              size={'lg'}
              classNames={{ label: 'text-foreground', input: 'text-foreground' }}
              variant="bordered"
            />
            <Input
              autoComplete="off"
              label="Password Confirmation"
              type="password"
              {...form.getInputProps('password2')}
              errorMessage={form.errors.password2}
              isInvalid={!!form.errors.password2}
              isRequired
              size={'lg'}
              classNames={{ label: 'text-foreground', input: 'text-foreground' }}
              variant="bordered"
            />
            <Button isLoading={isLoading} color="primary" type="submit">
              VERIFY OTP & CHANGE PASSWORD
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
