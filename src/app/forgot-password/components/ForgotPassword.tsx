'use client'

import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { useForm } from '@mantine/form'

import useOrientation from '@/hooks/useOrientation'

import Link from 'next/link'
import { Button, Input } from '@heroui/react'
import ThemeModeButton from '@/components/ThemeModeButton'
import { Icon } from '@iconify/react'
import { BrandLogo } from '@/components/BrandLogo'
import toast from '@/helpers/toast'
import { PATH_API } from '@/helpers/api-uri'
import { requestAPI } from '@/helpers/api-request'

type ForgotPasswordFormType = {
  email: string
}

export default function ForgotPassword() {
  const orientation = useOrientation()
  const isPortrait = orientation === 'portrait'

  const router = useRouter()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const form = useForm({
    initialValues: {
      email: ''
    } as ForgotPasswordFormType,
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email')
    }
  })

  const handleSubmit = async (values: ForgotPasswordFormType) => {
    if (form.isValid()) {
      setIsLoading(true)

      const response = await requestAPI.get(PATH_API.SEND_OTP, {
        params: {
          email: values.email
        }
      })

      if (!response.isSuccess) {
        toast.error(response.message)
      } else {
        router.replace('/forgot-password/verify?email=' + values.email)
      }
      setIsLoading(false)
    }
  }

  return orientation ? (
    <div className="w-screen h-screen bg-black overflow-hidden">
      <div className="fixed right-0 top-0 z-index-50">
        <div className="m-4">
          <ThemeModeButton />
        </div>
      </div>

      <div className={`flex h-screen ${isPortrait ? 'flex-col' : 'flex-row'} `}>
        <div
          className={`${isPortrait ? 'grow  pt-8 pb-4' : 'w-[50%] '} flex flex-col items-center justify-center  text-white h-full  `}
        >
          <BrandLogo size={60} color="white" />
          <h3 className={isPortrait ? 'text-sm sm:text-base md:text-lg' : 'text-lg'}>
            Where Ideas Flow.
          </h3>
          <h1
            className={`font-semibold text-center mt-[50px] ${isPortrait ? 'text-lg sm:text-xl md:text-2xl' : 'text-2xl'}`}
          >
            Forgot Password?
          </h1>
          <h2
            className={`px-8 text-center ${isPortrait ? 'text-sm sm:text-base md:text-lg' : 'text-lg'}`}
          >
            No Worries, We’ll Send Your Reset Instructions.
          </h2>
        </div>
        <div
          className={`bg-background  ${isPortrait ? 'rounded-t-xl  h-fit' : 'w-[50%] h-full rounded-l-xl'} `}
        >
          <div className={`flex h-full justify-center ${isPortrait ? 'py-8' : 'items-center'}`}>
            <form
              className="flex flex-col gap-4 w-[80%] md:w-[60%] lg:w-[50%] "
              onSubmit={form.onSubmit((values) => handleSubmit(values))}
            >
              <Input
                size={isPortrait ? 'md' : 'lg'}
                label="Email Address"
                type="email"
                {...form.getInputProps('email')}
                errorMessage={form.errors.email}
                isInvalid={!!form.errors.email}
                isRequired
                classNames={{ label: 'text-foreground', input: 'text-foreground' }}
                className={'text-black'}
                variant={'bordered'}
              />
              <Button
                type="submit"
                color="primary"
                size={isPortrait ? 'md' : 'lg'}
                isLoading={isLoading}
              >
                CHANGE PASSWORD
              </Button>
              <Button
                as={Link}
                href={'/login'}
                variant="light"
                className="text-default"
                startContent={<Icon icon="ic:round-arrow-back" />}
              >
                Back to Sign in
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <></>
  )
}
