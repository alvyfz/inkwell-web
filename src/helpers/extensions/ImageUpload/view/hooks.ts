import { requestAPI } from '@/helpers/api-request'
import { PATH_API } from '@/helpers/api-uri'
import { DragEvent, useCallback, useEffect, useRef, useState } from 'react'
import nextConfig from '../../../../../next.config'
import toast from '@/helpers/toast'

export const useUploader = ({ onUpload }: { onUpload: (url: string) => void }) => {
  const [loading, setLoading] = useState(false)

  const uploadFile = useCallback(
    async (file: File) => {
      setLoading(true)
      try {
        const formData = new FormData()
        formData.append('file', file)
        const upload = await requestAPI.post(PATH_API.FILE, {
          params: formData,
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        const id = upload.payload
        if (upload.isSuccess && id) {
          onUpload(nextConfig?.env?.APPWRITE_STORAGE_ENDPOINT?.replace('<id>', id) as string)
        } else {
          const error = upload?.message || 'Something went wrong'
          toast.error(error)
        }
      } catch (errPayload: any) {
        const error = errPayload?.message || 'Something went wrong'
        toast.error(error)
      }
      setLoading(false)
    },
    [onUpload]
  )

  return { loading, uploadFile }
}

export const useFileUpload = () => {
  const fileInput = useRef<HTMLInputElement>(null)

  const handleUploadClick = useCallback(() => {
    fileInput.current?.click()
  }, [])

  return { ref: fileInput, handleUploadClick }
}

export const useDropZone = ({ uploader }: { uploader: (file: File) => void }) => {
  const [isDragging, setIsDragging] = useState<boolean>(false)
  const [draggedInside, setDraggedInside] = useState<boolean>(false)

  useEffect(() => {
    const dragStartHandler = () => {
      setIsDragging(true)
    }

    const dragEndHandler = () => {
      setIsDragging(false)
    }

    document.body.addEventListener('dragstart', dragStartHandler)
    document.body.addEventListener('dragend', dragEndHandler)

    return () => {
      document.body.removeEventListener('dragstart', dragStartHandler)
      document.body.removeEventListener('dragend', dragEndHandler)
    }
  }, [])

  const onDrop = useCallback(
    (e: DragEvent<HTMLDivElement>) => {
      setDraggedInside(false)
      if (e.dataTransfer.files.length === 0) {
        return
      }

      const fileList = e.dataTransfer.files

      const files: File[] = []

      for (let i = 0; i < fileList.length; i += 1) {
        const item = fileList.item(i)
        if (item) {
          files.push(item)
        }
      }

      if (files.some((file) => file.type.indexOf('image') === -1)) {
        return
      }

      e.preventDefault()

      const filteredFiles = files.filter((f) => f.type.indexOf('image') !== -1)

      const file = filteredFiles.length > 0 ? filteredFiles[0] : undefined

      if (file) {
        uploader(file)
      }
    },
    [uploader]
  )

  const onDragEnter = () => {
    setDraggedInside(true)
  }

  const onDragLeave = () => {
    setDraggedInside(false)
  }

  return { isDragging, draggedInside, onDragEnter, onDragLeave, onDrop }
}
