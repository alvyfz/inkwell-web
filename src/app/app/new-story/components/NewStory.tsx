'use client'

import { BlockEditor } from '@/components/BlockEditor'
import { ClientNavbar } from '@/components/Headers/Navbar.client'
import { useGlobalState } from '@/contexts/globalContext'
import { requestAPI } from '@/helpers/api-request'
import { PATH_API } from '@/helpers/api-uri'
import toast from '@/helpers/toast'
import { Button, Input, Spinner } from '@heroui/react'
import { useForm } from '@mantine/form'
import { isEmpty } from 'lodash'
import { useCallback, useEffect } from 'react'
import { useDebounce } from 'react-haiku'
import useSWR from 'swr'
import PublishStory from './PublishStory'

type StoryType = {
  title: string
  html: string
}

export default function NewStory() {
  const [, setState] = useGlobalState()

  const form = useForm({
    initialValues: {
      title: '',
      html: ''
    } as StoryType,
    validate: {
      title: (value) => (value.length > 3 ? null : 'Title must be at least 3 characters'),
      html: (value) => (isEmpty(value) ? 'Story content cannot be empty' : null)
    }
  })

  const { data, isLoading } = useSWR(PATH_API.ARTICLE_DRAFT, (url) => requestAPI.get(url))

  useEffect(() => {
    if (!isLoading && !!data?.isSuccess) {
      form.setFieldValue('title', data.payload.title)
      form.setFieldValue('html', data.payload.content)
    }
  }, [data])

  const debounceValue = useDebounce(form.values.html, 10000)

  const saveDraft = useCallback(async () => {
    const { title, html } = form.values
    if (!isEmpty(title) && !isEmpty(html)) {
      const response = await requestAPI.post(PATH_API.ARTICLE_DRAFT, {
        params: {
          title: title,
          content: html
        }
      })
      if (response.isSuccess) {
        toast.success('Draft story saved.')
      } else {
        toast.error('Failed to save draft.')
      }
    }
  }, [debounceValue])

  useEffect(() => {
    saveDraft()
  }, [debounceValue])

  if (isLoading) {
    return (
      <div className="w-screen h-screen">
        <div className="flex justify-center items-center w-full h-full">
          <Spinner size="lg" />
        </div>
      </div>
    )
  }

  const openModal = () => {
    setState('modal', {
      visible: true,
      title: 'Publish Story',
      size: 'full',
      classNames: {
        base: 'md:px-[10%] xl:px-[20%] 2xl:px-[30%]',
        closeButton: 'md:mr-[10%] xl:mr-[20%] 2xl:mr-[30%] text-xl'
      },
      component: (onClose: () => void) => <PublishStory onClose={onClose} />
    })
  }

  return (
    <div className="h-screen overflow-y-hidden">
      <ClientNavbar
        hiddenWriteButton
        navbarEndContent={
          <Button color="secondary" onPress={openModal}>
            Publish
          </Button>
        }
      />
      <div className="font-serif">
        <div className="caret-black dark:caret-white outline-0 pr-2 pl-2 pt-4 z-0  lg:pl-8 lg:pr-8 mx-auto max-w-2xl">
          <Input
            size="lg"
            {...form.getInputProps('title')}
            variant="underlined"
            placeholder="Title"
            errorMessage={form.errors.title}
            isInvalid={!!form.errors.title}
          />
        </div>
        <BlockEditor
          initial={data.payload?.content || ''}
          setHtml={(html) => form.setFieldValue('html', html)}
        />
      </div>
    </div>
  )
}
