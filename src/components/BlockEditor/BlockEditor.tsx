import { EditorContent } from '@tiptap/react'
import React, { useRef, useState } from 'react'

import { LinkMenu } from '@/components/menus'

import { useBlockEditor } from '@/hooks/useBlockEditor'

import '@/styles/index.css'

import { TextMenu } from '../menus/TextMenu'

import { ColumnsMenu } from '@/helpers/extensions/MultiColumn/menus'
import { TableColumnMenu, TableRowMenu } from '@/helpers/extensions/Table/menus'
import ImageBlockMenu from '@/helpers/extensions/ImageBlock/components/ImageBlockMenu'

export const BlockEditor = ({
  initial,
  setHtml
}: {
  initial: string
  setHtml?: (html: string) => void
}) => {
  const [, setIsEditable] = useState(true)
  const menuContainerRef = useRef(null)

  const { editor } = useBlockEditor({
    initialContent: initial,
    onUpdate({ editor: currentEditor }) {
      setIsEditable(currentEditor.isEditable)
      if (setHtml) {
        setHtml(currentEditor.getHTML())
      }
    }
  })

  if (!editor) {
    return null
  }

  return (
    <div ref={menuContainerRef}>
      <div className="relative flex flex-col flex-1 h-full  ">
        <EditorContent editor={editor} className="flex-1" />
        <LinkMenu editor={editor} appendTo={menuContainerRef} />
        <TextMenu editor={editor} />
        <ColumnsMenu editor={editor} appendTo={menuContainerRef} />
        <TableRowMenu editor={editor} appendTo={menuContainerRef} />
        <TableColumnMenu editor={editor} appendTo={menuContainerRef} />
        <ImageBlockMenu editor={editor} appendTo={menuContainerRef} />
      </div>
    </div>
  )
}

export default BlockEditor
