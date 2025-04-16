'use client'

import { requestAPI } from '@/helpers/api-request'
import { PATH_API } from '@/helpers/api-uri'
import { useMemo } from 'react'
import useSWR from 'swr'
import StoryCard from '@/app/app/components/CardStory'
import Loading from '@/components/Common/Loading'

export default function PublishedPage() {
  const { data, isLoading } = useSWR(`${PATH_API.ARTICLE_MY_LIST}?status=published`, (url) =>
    requestAPI.get(url)
  )
  const drafts = useMemo(() => data?.payload, [data?.payload])

  if (isLoading) {
    return <Loading />
  }

  return (
    <>
      {drafts?.length > 0 ? (
        <div className="space-y-4">
          {drafts?.map((draft: any) => (
            <StoryCard key={draft?._id} draft={draft} type="published" />
          ))}
        </div>
      ) : (
        <p className="text-gray-500">You have no published yet.</p>
      )}
    </>
  )
}
