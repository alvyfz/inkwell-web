'use client'

import { usePathname, useRouter } from 'next/navigation'
import { Tab, Tabs } from '@heroui/react'
import Layout from '@/components/Layouts/Layout'

const tabs = [
  { name: 'Drafts', href: '/app/me/stories/drafts' },
  { name: 'Published', href: '/app/me/stories/published' }
]

export default function StoriesLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const route = useRouter()

  return (
    <Layout
      headerContent={
        <div className="py-4 sm:py-8 flex flex-col gap-4">
          <h1 className="text-2xl font-bold">Your Stories</h1>
          <Tabs
            aria-label="Tabs"
            size={'lg'}
            onSelectionChange={(key: any) => route.push(key)}
            defaultSelectedKey={pathname}
            color="secondary"
          >
            {tabs.map((tab) => (
              <Tab key={tab.href} title={tab.name} />
            ))}
          </Tabs>
        </div>
      }
    >
      <div className="container bg-background mx-auto py-6">{children}</div>
    </Layout>
  )
}
