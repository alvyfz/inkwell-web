import { useEditor } from '@tiptap/react'
import type { AnyExtension, Editor, EditorOptions } from '@tiptap/core'
import ExtensionKit from '@/helpers/extensions/extension-kit'

declare global {
  interface Window {
    editor: Editor | null
  }
}

export const useBlockEditor = ({
  initialContent,
  ...editorOptions
}: Partial<Omit<EditorOptions, 'extensions'>> & { initialContent?: string }) => {
  const editor = useEditor(
    {
      ...editorOptions,
      immediatelyRender: true,
      shouldRerenderOnTransaction: false,
      autofocus: true,
      onCreate: (ctx) => {
        if (ctx.editor.isEmpty) {
          ctx.editor.commands.setContent(initialContent || '', true)
          ctx.editor.commands.focus('start', { scrollIntoView: true })
        }
      },
      extensions: [...ExtensionKit()].filter((e): e is AnyExtension => e !== undefined),
      editorProps: {
        attributes: {
          autocomplete: 'off',
          autocorrect: 'off',
          autocapitalize: 'off',
          class: 'min-h-full'
        }
      }
    },
    []
  )

  window.editor = editor

  return { editor }
}
