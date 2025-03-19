import React from 'react'
import { Editor } from '@tiptap/core'

interface FloatingMenuProps {
  editor: Editor
}

const FloatingMenu: React.FC<FloatingMenuProps> = ({ editor }) => {
  if (!editor) {
    return null
  }

  return (
    <div className="flex bg-white border border-gray-300 rounded-md shadow-lg p-1 gap-1">
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={`p-1 rounded-md ${
          editor.isActive('bold') ? 'bg-gray-200' : 'hover:bg-gray-100'
        }`}
      >
        Bold
      </button>
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={`p-1 rounded-md ${
          editor.isActive('italic') ? 'bg-gray-200' : 'hover:bg-gray-100'
        }`}
      >
        Italic
      </button>
      <button
        onClick={() => editor.chain().focus().toggleStrike().run()}
        className={`p-1 rounded-md ${
          editor.isActive('strike') ? 'bg-gray-200' : 'hover:bg-gray-100'
        }`}
      >
        Strike
      </button>
    </div>
  )
}

export default FloatingMenu
