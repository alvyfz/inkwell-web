'use client'

import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { useForm } from '@mantine/form'
import toast from '@/helpers/toast'
import useOrientation from '@/hooks/useOrientation'
import { Button, Image, Input, Spinner } from '@heroui/react'
import ThemeModeButton from '@/components/ThemeModeButton'
import { PATH_API } from '@/helpers/api-uri'
import { requestAPI } from '@/helpers/api-request'
import { isValidEmail, isValidPassword, isValidUsername } from '@/helpers/utils'
import { isEmpty } from 'lodash'
import { useDebounce } from 'react-haiku'

type SignupFormType = {
  email: string
  name: string
  password: string
  password2: string
  username: string
}

export default function Signup() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [usernameForm, setUsernameForm] = useState<any>({ isFocus: false })
  const orientation = useOrientation()
  const searchParams = useSearchParams()
  const redirect = searchParams.get('redirect') as string
  const isPortrait = orientation === 'portrait'

  const form = useForm({
    initialValues: {
      username: '',
      email: '',
      name: '',
      password: '',
      password2: ''
    } as SignupFormType,
    validate: {
      username: (value) => (isValidUsername(value) ? null : 'Invalid username'),
      email: (value) => (isValidEmail(value) ? null : 'Invalid email'),
      name: (value) => (value.length < 2 ? 'Name must have at least 2 letters' : null),
      password2: (value, prev) => (value !== prev.password ? 'Password not same' : null),
      password: (value) =>
        isValidPassword(value)
          ? null
          : 'Minimum eight characters, at least one uppercase letter, one lowercase letter and one number'
    }
  })

  const handleSubmit = async (values: SignupFormType) => {
    if (form.isValid()) {
      setIsLoading(true)

      const response = await requestAPI.post(PATH_API.SIGNUP, {
        params: {
          username: '@' + values.username,
          email: values.email,
          name: values.name,
          password: values.password
        }
      })

      if (!response.isSuccess) {
        toast.error(response.message)
      } else {
        router.push(
          `/signup/verify-email?email=${form.values.email}${
            !isEmpty(redirect) ? `&redirect=${redirect}` : ''
          }`
        )
      }
      setIsLoading(false)
    }
  }

  const usernameValue = useDebounce(form.values.username, 500)

  const checkUsername = async () => {
    setUsernameForm({ ...usernameForm, isLoading: true })
    const username = form.values.username

    const response = await requestAPI.get(
      `${PATH_API.USERNAME_VALIDATION}?username=${'@' + username}`
    )
    if (!response.isSuccess) {
      form.setFieldError('username', response.message)
    } else {
      form.setFieldError('username', null)
    }
    setUsernameForm({ ...usernameForm, isLoading: false })
  }

  useEffect(() => {
    const validateUsername = async () => {
      if (isEmpty(usernameValue)) {
        form.setFieldError('username', null)
        return
      }
      if (!isValidUsername(usernameValue) && !isEmpty(usernameValue)) {
        form.setFieldError('username', 'Invalid username')
      } else {
        form.setFieldError('username', null)
        await checkUsername()
      }
    }
    validateUsername()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [usernameValue])

  return orientation ? (
    <div className="w-screen h-screen bg-black">
      <div className="fixed right-0 top-0 z-index-50">
        <div className="m-4">
          <ThemeModeButton />
        </div>
      </div>
      <div className={`flex h-screen ${isPortrait ? 'flex-col' : 'flex-row'} `}>
        <div
          className={`${isPortrait ? 'grow  pt-8 pb-4' : 'w-[50%] '} flex flex-col items-center justify-center  text-white h-full  `}
        >
          <h6 className={isPortrait ? 'text-sm sm:text-base md:text-lg' : 'text-lg'}>
            Hi! Welcome to
          </h6>
          <Image
            src={'/brand/brand-full-white.png'}
            height={80}
            alt="brand"
            radius="none"
            className="my-8"
          />{' '}
          <h6 className={isPortrait ? 'text-base sm:text-lg md:text-xl' : 'text-xl'}>
            Where Ideas Flow.
          </h6>
        </div>
        <div
          className={`bg-background ${isPortrait ? 'rounded-t-xl  h-fit' : 'w-[50%] h-full rounded-l-xl'} `}
        >
          <div className={`flex h-full justify-center ${isPortrait ? 'py-8' : 'items-center'}`}>
            <form
              className="flex flex-col gap-4 w-[80%] md:w-[60%] lg:w-[50%] "
              onSubmit={form.onSubmit((values) => handleSubmit(values))}
            >
              <Input
                label="Full Name"
                {...form.getInputProps('name')}
                type="text"
                errorMessage={form.errors.name}
                isInvalid={!!form.errors.name}
                isRequired
                size={isPortrait ? 'md' : 'lg'}
                classNames={{ label: 'text-foreground', input: 'text-foreground' }}
                variant="bordered"
              />
              <Input
                label="Username"
                {...form.getInputProps('username')}
                type="text"
                errorMessage={form.errors.username}
                isInvalid={!!form.errors.username}
                isRequired
                size={isPortrait ? 'md' : 'lg'}
                classNames={{ label: 'text-foreground', input: 'text-foreground' }}
                variant="bordered"
                startContent={
                  usernameForm.isFocus || !isEmpty(form.values.username) ? <span>@</span> : null
                }
                onFocus={() => setUsernameForm({ ...usernameForm, isFocus: true })}
                onBlur={() => setUsernameForm({ ...usernameForm, isFocus: false })}
                endContent={usernameForm.isLoading ? <Spinner size="sm" /> : null}
              />
              <Input
                label="Email Address"
                type="email"
                {...form.getInputProps('email')}
                errorMessage={form.errors.email}
                isInvalid={!!form.errors.email}
                isRequired
                size={isPortrait ? 'md' : 'lg'}
                classNames={{ label: 'text-foreground', input: 'text-foreground' }}
                variant="bordered"
              />
              <Input
                autoComplete="off"
                label="Password"
                type="password"
                {...form.getInputProps('password')}
                errorMessage={form.errors.password}
                isInvalid={!!form.errors.password}
                isRequired
                size={isPortrait ? 'md' : 'lg'}
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
                size={isPortrait ? 'md' : 'lg'}
                classNames={{ label: 'text-foreground', input: 'text-foreground' }}
                variant="bordered"
              />
              <Button
                color="primary"
                type="submit"
                size={isPortrait ? 'md' : 'lg'}
                isLoading={isLoading}
              >
                SIGN UP
              </Button>
              <h3 className="text-center text-foreground">
                Have an account?{' '}
                <Link className="text-primary font-medium" href="/login">
                  Sign In
                </Link>
              </h3>
            </form>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <></>
  )
}
