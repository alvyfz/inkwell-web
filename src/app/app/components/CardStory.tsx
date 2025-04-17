import { useGlobalState } from '@/contexts/globalContext'
import { requestAPI } from '@/helpers/api-request'
import { PATH_API } from '@/helpers/api-uri'
import { confirmationModal } from '@/helpers/template-modal'
import toast from '@/helpers/toast'
import { Button } from '@heroui/react'
import moment from 'moment'

const StoryCard = ({
  draft,
  type,
  mutate
}: {
  draft: any
  type: 'published' | 'unpublished'
  mutate: () => void
}) => {
  const [, setState] = useGlobalState()
  const isPublished = type === 'published'

  const handleDeleteArticle = async () => {
    const response = await requestAPI.delete(`${PATH_API.ARTICLE}/${draft._id}`)

    if (!response.isSuccess) {
      toast.error(response.message)
    } else {
      toast.success('Article deleted successfully.')
    }

    await mutate()
  }

  const handleUnpublishArticle = async () => {
    const response = await requestAPI.patch(`${PATH_API.ARTICLE_UNPUBLISH}/${draft._id}`)

    if (!response.isSuccess) {
      toast.error(response.message)
    } else {
      toast.success('Article unpublished successfully.')
    }
    await mutate()
  }
  return (
    <div key={draft.id} className="py-4 px-6 rounded-lg bg-content1">
      <h2 className="text-lg font-semibold line-clamp-2">{draft?.title ?? 'No Title'}</h2>
      <p className="text-sm line-clamp-3">{draft?.description}</p>
      <div className="flex flex-col justify-start items-start sm:flex-row sm:justify-between sm:items-start">
        <p className="w-full text-sm text-gray-500">
          Last updated: {moment(draft?.updatedAt).format('llll')}
        </p>
        <div className="w-full   mt-2 flex gap-4 justify-end">
          {isPublished ? (
            <>
              <Button color="primary" variant="light" size="sm">
                View
              </Button>
              <Button
                color="danger"
                variant="flat"
                size="sm"
                onPress={() =>
                  confirmationModal(setState, {
                    content: 'Are you sure you want to unpublish this story?',
                    action: handleUnpublishArticle
                  })
                }
              >
                Unpublish
              </Button>
            </>
          ) : (
            <>
              <Button color="primary" variant="light" size="sm">
                Edit
              </Button>
              <Button
                color="danger"
                variant="flat"
                size="sm"
                onPress={() =>
                  confirmationModal(setState, {
                    content: 'Are you sure you want to delete this story?',
                    action: handleDeleteArticle
                  })
                }
              >
                Delete
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default StoryCard
