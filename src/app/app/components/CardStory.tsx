import { Button } from '@heroui/react'
import moment from 'moment'

const StoryCard = ({ draft, type }: { draft: any; type: 'published' | 'unpublished' }) => {
  const isPublished = type === 'published'
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
              <Button color="danger" variant="flat" size="sm">
                Unpublish
              </Button>
            </>
          ) : (
            <>
              <Button color="primary" variant="light" size="sm">
                Edit
              </Button>
              <Button color="danger" variant="flat" size="sm">
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
