'use client'

import { requestAPI } from '@/helpers/api-request'
import { PATH_API } from '@/helpers/api-uri'
import { Alert, Autocomplete, AutocompleteItem, Button, Chip, Input } from '@heroui/react'
import { useForm } from '@mantine/form'
import { isEmpty } from 'lodash'
import useSWR from 'swr'
import toast from '@/helpers/toast'
import nextConfig from '../../../../../next.config'
import { useCallback, useEffect, useState } from 'react'
import Image from 'next/image'
import { useDebounce } from 'react-haiku'
import { capitalizeWords } from '@/helpers/utils'
import { Icon } from '@iconify/react'
import useSWRMutation from 'swr/mutation'
import { useRouter } from 'next/navigation'

type PublishStoryType = {
  cover: string
  file: File | null
  searchTopic: string
  selectedTopics: any[]
  selectedTopicsIds: string[]
}

export default function PublishStory({ onClose }: { onClose: () => void }) {
  const router = useRouter()

  const [showError, setShowError] = useState<null | {
    title: string
    desc: string
    color: 'danger' | 'default' | 'primary' | 'secondary' | 'success' | 'warning'
  }>(null)

  const form = useForm({
    initialValues: {
      file: null,
      cover: '',
      searchTopic: '',
      selectedTopics: [],
      selectedTopicsIds: []
    } as PublishStoryType,
    validate: {
      selectedTopicsIds: (value) => (value.length < 4 ? 'Topics must be at least 5' : null),
      cover: (value) => (isEmpty(value) ? 'Story cover cannot be empty' : null)
    }
  })

  const searchDebounce = useDebounce(form.values.searchTopic, 1000)

  const topics = useSWR(`${PATH_API.ALL_TOPIC}?search=${searchDebounce}`, (url) =>
    searchDebounce.length > 2 ? requestAPI.get(url) : null
  )

  const createTopic = useSWRMutation(
    PATH_API.TOPIC,
    (url, { arg }: { arg: { name: string; type: 'topic' | 'subtopic' } }) =>
      requestAPI.post(url, {
        params: {
          name: arg.name,
          type: arg.type
        }
      })
  )

  const publishArticle = useSWRMutation(
    PATH_API.ARTICLE_PUBLISH,
    (url, { arg }: { arg: { topicIds: string[]; coverImage: string } }) =>
      requestAPI.post(url, {
        params: {
          topicIds: arg.topicIds,
          coverImage: arg.coverImage
        }
      })
  )

  const onUploadImg = useCallback(async (file: any) => {
    try {
      const formData = new FormData()
      if (file) {
        formData.append('file', file)

        const upload = await requestAPI.post(PATH_API.FILE, {
          params: formData,
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        const id = upload.payload

        form.setFieldValue(
          'cover',
          nextConfig?.env?.APPWRITE_STORAGE_ENDPOINT?.replace('<id>', id) as string
        )
      } else {
        setShowError({
          title: 'Error',
          desc: 'File not found.',
          color: 'danger'
        })
      }
    } catch (error) {
      console.log(error)
      form.setFieldValue('file', null)
      setShowError({
        title: 'Error',
        desc: 'Failed to upload cover image, Please try again.',
        color: 'danger'
      })
    }
  }, [])

  useEffect(() => {
    if (form.values.file) {
      onUploadImg(form.values.file)
    }
  }, [form.values.file])

  useEffect(() => {
    if (showError) {
      setTimeout(() => {
        setShowError(null)
      }, 2000)
    }
  }, [showError])

  const onChangeTopic = (v: any) => {
    const data = topics.data?.payload?.find((x: any) => x._id === v)
    const selectedTopicsPrev = [...form.values.selectedTopics, data]
    const selectedTopicsIdsPrev = [...form.values.selectedTopicsIds, data?._id]

    form.setFieldValue(
      'selectedTopics',
      selectedTopicsPrev.filter((v) => v !== undefined)
    )
    form.setFieldValue(
      'selectedTopicsIds',
      selectedTopicsIdsPrev.filter((v) => v !== undefined)
    )
    form.setFieldValue('searchTopic', '')
  }

  const onCreateNewTopic = async () => {
    try {
      const trigger = await createTopic.trigger({
        name: capitalizeWords(form.values.searchTopic),
        type: 'topic'
      })

      if (trigger.isSuccess) {
        const selectedTopicsPrev = [...form.values.selectedTopics, trigger.payload]
        const selectedTopicsIdsPrev = [...form.values.selectedTopicsIds, trigger.payload?._id]

        form.setFieldValue(
          'selectedTopics',
          selectedTopicsPrev.filter((v) => v !== undefined)
        )
        form.setFieldValue(
          'selectedTopicsIds',
          selectedTopicsIdsPrev.filter((v) => v !== undefined)
        )
        form.setFieldValue('searchTopic', '')
        setShowError({
          title: 'Success',
          desc: 'New topic created successfully',
          color: 'success'
        })
      } else {
        setShowError({
          title: 'Error',
          desc: 'Failed to create topic, Please try again.',
          color: 'danger'
        })
      }
    } catch (error) {
      console.log(error)
      setShowError({
        title: 'Error',
        desc: 'Failed to create topic, Please try again.',
        color: 'danger'
      })
    }
  }

  const onPublish = async (values: PublishStoryType) => {
    if (form.isValid()) {
      try {
        const trigger = await publishArticle.trigger({
          topicIds: values.selectedTopicsIds,
          coverImage: values.cover
        })

        if (trigger.isSuccess) {
          setShowError({
            title: 'Success',
            desc: 'Story published.',
            color: 'success'
          })
          toast.success('Story published.')
          onClose()
          router.replace('/app')
        } else {
          setShowError({
            title: 'Error',
            desc: 'Failed to publish article, Please try again.',
            color: 'danger'
          })
        }
      } catch (error) {
        console.log(error)
        setShowError({
          title: 'Error',
          desc: 'Failed to publish article, Please try again.',
          color: 'danger'
        })
      }
    }
  }

  return (
    <div>
      {showError && (
        <Alert
          color={showError?.color}
          description={showError?.desc}
          title={showError?.title}
          className="mb-4"
        />
      )}
      <form
        onSubmit={form.onSubmit((values) => onPublish(values))}
        className="flex flex-col md:flex-row gap-6"
      >
        <section className="flex-1 flex flex-col gap-4">
          <h1 className="font-medium">Story Cover</h1>
          <Input
            type="file"
            startContent={<Icon icon="tabler:file-filled" />}
            description="this image will be used as cover story, max size 2MB."
            label="Attach story cover"
            onChange={(e) => {
              form.setFieldValue('file', e.target?.files?.[0] || null)
            }}
            isClearable
            onClear={() => {
              form.setFieldValue('file', null)
              form.setFieldValue('cover', '')
            }}
            accept="image/*"
            errorMessage={form.errors.cover}
            isInvalid={!!form.errors.cover}
            variant={'bordered'}
          />
          {form?.values?.cover && (
            <div className="relative w-full h-[200px]">
              <Image
                src={form?.values?.cover || ''}
                layout="fill"
                objectFit="cover"
                alt="cover-story"
                className="rounded-lg"
              />
            </div>
          )}
        </section>
        <section className="flex-1 flex flex-col gap-4">
          <h1 className="font-medium">Story Topics</h1>

          <Autocomplete
            inputValue={form.values.searchTopic}
            isLoading={topics.isLoading || createTopic.isMutating}
            items={
              topics.data?.isSuccess
                ? topics.data?.payload
                    ?.filter((v: any) => !form.values.selectedTopicsIds?.includes(v._id))
                    .map((v: any) => ({ label: v?.name, key: v?._id }))
                : []
            }
            label="Select a topic"
            placeholder="Type minimum 3 characters"
            variant="bordered"
            onInputChange={(v) => {
              form.setFieldValue('searchTopic', v)
            }}
            onSelectionChange={onChangeTopic}
            listboxProps={{
              emptyContent:
                searchDebounce.length < 3 && !topics.isLoading ? (
                  'Please type minimum 3 characters'
                ) : (
                  <>
                    <p>Can&apos;t find any topics</p>
                    <Button variant="light" fullWidth onPress={onCreateNewTopic}>
                      Create new topic: {capitalizeWords(form.values.searchTopic)}
                    </Button>
                  </>
                )
            }}
            errorMessage={form.errors.selectedTopicsIds}
            isInvalid={!!form.errors.selectedTopicsIds}
          >
            {(item: any) => (
              <AutocompleteItem
                key={item.key}
                variant="light"
                color="primary"
                className="capitalize"
              >
                {item.label}
              </AutocompleteItem>
            )}
          </Autocomplete>
          <div className="flex flex-row flex-wrap gap-2">
            {form.values.selectedTopics.map((v, i) => (
              <Chip
                size="lg"
                color="primary"
                key={i}
                endContent={
                  <button
                    className="px-1"
                    onClick={() => {
                      form.setFieldValue(
                        'selectedTopics',
                        form.values.selectedTopics.filter((x) => x?._id !== v?._id)
                      )
                      form.setFieldValue(
                        'selectedTopicsIds',
                        form.values.selectedTopicsIds.filter((x) => x !== v?._id)
                      )
                    }}
                  >
                    <Icon icon="ic:round-close" fontSize={18} />
                  </button>
                }
              >
                {v?.name}
              </Chip>
            ))}
          </div>
          <div className="my-20 flex flex-row justify-end">
            <Button
              className="w-fit "
              type="submit"
              color="secondary"
              isLoading={publishArticle.isMutating}
            >
              Publish Now
            </Button>
          </div>
        </section>
      </form>
    </div>
  )
}
