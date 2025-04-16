import { Button } from '@heroui/button'
import React from 'react'
import { Divider } from '@heroui/react'
import Link from 'next/link'
import { cookies } from 'next/headers'
import { BrandLogo } from '@/components/BrandLogo'

export default async function Home() {
  const cookieStore = await cookies()

  const token = cookieStore.get('Authorization')

  return (
    <>
      <div className="light h-screen bg-[#f6eee3] flex flex-col justify-between overflow-hidden ">
        <header>
          <div className=" flex flex-row justify-center ">
            <div className="flex flex-col w-full max-w-[1336px] py-2 px-4 ">
              <div className="flex flex-row justify-between">
                <BrandLogo size={40} />
                {!token ? (
                  <div className="flex flex-row gap-2 items-center">
                    <Button
                      as={Link}
                      href="/login"
                      className="mr-2"
                      variant="light"
                      color="primary"
                      size="sm"
                    >
                      Login
                    </Button>
                    <Button color="primary" size="sm" as={Link} href="/signup">
                      Join
                    </Button>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
          <Divider />
        </header>
        <main>
          <div className=" flex flex-row justify-center items-center ">
            <div className="flex flex-col w-full gap-4 px-4 max-w-[1336px] ">
              <h1 className="text-primary font-serif text-7xl">Where Ideas Flow.</h1>
              <desc className="text-primary  text-2xl ">
                Inkwells is a platform for writing, reading, and sharing ideas. Find inspiring
                stories, share your thoughts, and join a community of passionate writers and
                readers.
              </desc>
              <Button
                className="w-fit mt-5"
                color="primary"
                size="lg"
                as={Link}
                href={token ? '/app' : '/signup'}
              >
                {token ? 'Launch' : 'Get Started!'}
              </Button>
            </div>
          </div>
        </main>
        <footer>
          <Divider />
          <div className=" flex flex-row justify-center  ">
            <div className="flex flex-col w-full  max-w-[1336px] py-2  ">
              <h2 className="text-primary">@Copyright by Inkwells.</h2>
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}
