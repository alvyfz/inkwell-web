'use client'

import { useSearchParams } from 'next/navigation'
import React from 'react'
import { Button, Image } from '@heroui/react'
import { Icon } from '@iconify/react'
import { signIn } from 'next-auth/react'
import ThemeModeButton from '@/components/ThemeModeButton'
import useOrientation from '@/hooks/useOrientation'

export default function Login() {
  const orientation = useOrientation()
  const isPortrait = orientation === 'portrait'
  const searchParams = useSearchParams()
  const redirect = searchParams.get('redirect') as string

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
            Hi! Welcome Back to
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
          className={`bg-background  ${isPortrait ? 'rounded-t-xl  h-fit' : 'w-[50%] h-full rounded-l-xl'} `}
        >
          <div className={`flex h-full justify-center ${isPortrait ? 'py-8' : 'items-center'}`}>
            <div className="flex flex-col gap-4 w-[80%] md:w-[60%] lg:w-[50%]">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold mb-2">Welcome Back</h2>
                <p className="text-gray-600">Sign in to your account using OAuth</p>
              </div>
              
              <div className="flex flex-col gap-3">
                <Button
                  variant="bordered"
                  size={isPortrait ? 'md' : 'lg'}
                  startContent={<Icon icon="mdi:github" className="text-xl" />}
                  onPress={() => signIn('github', { callbackUrl: redirect || '/app' })}
                >
                  Continue with GitHub
                </Button>
                <Button
                  variant="bordered"
                  size={isPortrait ? 'md' : 'lg'}
                  startContent={<Icon icon="mdi:google" className="text-xl" />}
                  onPress={() => signIn('google', { callbackUrl: redirect || '/app' })}
                >
                  Continue with Google
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <></>
  )
}
