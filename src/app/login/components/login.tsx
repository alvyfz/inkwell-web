'use client'

import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { useForm } from '@mantine/form'
import toast from '@/helpers/toast'
import Link from 'next/link'
import { Button, Input } from '@heroui/react'
import ThemeModeButton from '@/components/ThemeModeButton'
import { requestAPI } from '@/helpers/api-request'
import { PATH_API } from '@/helpers/api-uri'
import Cookies from 'js-cookie'
import { decodeJwt, isValidEmail } from '@/helpers/utils'
import { BrandLogo } from '@/components/BrandLogo'
import useOrientation from '@/hooks/useOrientation'

type LoginFormType = {
  email: string
  password: string
}

export default function Login() {
  const orientation = useOrientation() ?? 'portrait'
  const isPortrait = orientation === 'portrait'

  const router = useRouter()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const form = useForm({
    initialValues: {
      email: '',
      password: ''
    } as LoginFormType,
    validate: {
      email: (value: string) => (isValidEmail(value) ? null : 'Invalid email'),
      password: (value: string) => (value.length >= 8 ? null : 'Minimum eight characters')
    }
  })

  const handleSubmit = async (values: LoginFormType) => {
    if (form.isValid()) {
      setIsLoading(true)

      const response = await requestAPI.post(PATH_API.LOGIN, {
        params: {
          email: values.email,
          password: values.password
        }
      })

      if (!response.isSuccess) {
        if (response.code === 402) {
          toast.error('Please verify your email first.')
          router.replace('/signup/verify-email?email=' + values.email)
        } else {
          toast.error(response.message)
        }
      } else {
        const jwtData = decodeJwt(response.payload.token)
        Cookies.set('Authorization', response.payload.token, {
          expires: jwtData.expire,
          secure: true,
          path: '/'
        })
        router.replace('/app')
      }
      setIsLoading(false)
    }
  }

  return (
    <div className="w-screen h-screen bg-black">
      <div className="fixed right-0 top-0 z-index-50">
        <ThemeModeButton />
      </div>

      <div className={`flex h-screen ${isPortrait ? 'flex-col' : 'flex-row'} `}>
        <div
          className={`${isPortrait ? 'grow  pt-8 pb-4' : 'w-[50%] '} flex flex-col items-center justify-center  text-white h-full  `}
        >
          <h6 className={isPortrait ? 'text-sm sm:text-base md:text-lg' : 'text-lg'}>
            Hi! Welcome Back to
          </h6>
          <BrandLogo color={'white'} size={60} className={'py-8'} />
          <h6 className={isPortrait ? 'text-base sm:text-lg md:text-xl' : 'text-xl'}>
            Where Ideas Flow.
          </h6>
        </div>
        <div
          className={`bg-background  ${isPortrait ? 'rounded-t-xl  h-fit' : 'w-[50%] h-full rounded-l-xl'} `}
        >
          <div className={`flex h-full justify-center ${isPortrait ? 'py-8' : 'items-center'}`}>
            <form
              className="flex flex-col gap-4 w-[80%] md:w-[60%] lg:w-[50%] "
              onSubmit={form.onSubmit((values: LoginFormType) => handleSubmit(values))}
            >
              <Input
                size={isPortrait ? 'md' : 'lg'}
                label="Email Address"
                type="email"
                {...form.getInputProps('email')}
                errorMessage={form.errors.email}
                isInvalid={!!form.errors.email}
                isRequired
                variant="bordered"
              />
              <div>
                <Input
                  size={isPortrait ? 'md' : 'lg'}
                  label="Password"
                  type="password"
                  {...form.getInputProps('password')}
                  errorMessage={form.errors.password}
                  isInvalid={!!form.errors.password}
                  isRequired
                  variant="bordered"
                />
                <Link className="text-primary font-medium text-sm pt-1" href="/forgot-password">
                  Forgot password?
                </Link>
              </div>

              <Button
                type="submit"
                color="primary"
                size={isPortrait ? 'md' : 'lg'}
                isLoading={isLoading}
              >
                SIGN IN
              </Button>
              <h3 className="text-center text-foreground">
                Don&#39;t have an account?{' '}
                <Link className="text-primary font-medium" href="/signup">
                  Sign Up
                </Link>
              </h3>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
