'use client'

import { forwardRef, useImperativeHandle } from 'react'

import { BlockNoteSchema, defaultStyleSpecs } from '@blocknote/core'
import { fr } from '@blocknote/core/locales'
import '@blocknote/core/fonts/inter.css'
import {
  BasicTextStyleButton,
  BlockTypeSelect,
  CreateLinkButton,
  DragHandleMenu,
  FileCaptionButton,
  FileReplaceButton,
  FormattingToolbar,
  FormattingToolbarController,
  NestBlockButton,
  RemoveBlockItem,
  SideMenu,
  SideMenuController,
  TableColumnHeaderItem,
  TableRowHeaderItem,
  TextAlignButton,
  UnnestBlockButton,
  useCreateBlockNote,
  useDictionary,
  type SideMenuProps
} from '@blocknote/react'
import { BlockNoteView } from '@blocknote/shadcn'
import '@blocknote/shadcn/style.css'

export type BlockNoteEditorHandle = {
  getMarkdown: () => string
  isEmpty: () => boolean
}

const { textColor: _textColor, backgroundColor: _backgroundColor, ...styleSpecsWithoutColors } = defaultStyleSpecs

const schema = BlockNoteSchema.create({
  styleSpecs: styleSpecsWithoutColors
})

function FormattingToolbarWithoutColors() {
  return (
    <FormattingToolbar>
      <BlockTypeSelect key='blockTypeSelect' />
      <FileCaptionButton key='fileCaptionButton' />
      <FileReplaceButton key='replaceFileButton' />
      <BasicTextStyleButton basicTextStyle='bold' key='boldStyleButton' />
      <BasicTextStyleButton basicTextStyle='italic' key='italicStyleButton' />
      <BasicTextStyleButton basicTextStyle='underline' key='underlineStyleButton' />
      <BasicTextStyleButton basicTextStyle='strike' key='strikeStyleButton' />
      <BasicTextStyleButton basicTextStyle='code' key='codeStyleButton' />
      <TextAlignButton textAlignment='left' key='textAlignLeftButton' />
      <TextAlignButton textAlignment='center' key='textAlignCenterButton' />
      <TextAlignButton textAlignment='right' key='textAlignRightButton' />
      <NestBlockButton key='nestBlockButton' />
      <UnnestBlockButton key='unnestBlockButton' />
      <CreateLinkButton key='createLinkButton' />
    </FormattingToolbar>
  )
}

function DragHandleMenuWithoutColors() {
  const dict = useDictionary()

  return (
    <DragHandleMenu>
      <RemoveBlockItem>{dict.drag_handle.delete_menuitem}</RemoveBlockItem>
      <TableRowHeaderItem>{dict.drag_handle.header_row_menuitem}</TableRowHeaderItem>
      <TableColumnHeaderItem>{dict.drag_handle.header_column_menuitem}</TableColumnHeaderItem>
    </DragHandleMenu>
  )
}

function SideMenuWithoutColors(props: SideMenuProps) {
  return <SideMenu {...props} dragHandleMenu={DragHandleMenuWithoutColors} />
}

const BlockNoteEditor = forwardRef<BlockNoteEditorHandle>(function BlockNoteEditor(_, ref) {
  const editor = useCreateBlockNote({
    dictionary: fr,
    schema
  })

  useImperativeHandle(ref, () => ({
    getMarkdown: () => editor.blocksToMarkdownLossy(editor.document),
    isEmpty: () => {
      const markdown = editor.blocksToMarkdownLossy(editor.document).trim()

      return markdown.length === 0
    }
  }))

  return (
    <div className='border-input bg-background min-h-64 overflow-hidden rounded-md border'>
      <BlockNoteView
        editor={editor}
        theme='light'
        className='min-h-64'
        formattingToolbar={false}
        sideMenu={false}
      >
        <FormattingToolbarController formattingToolbar={FormattingToolbarWithoutColors} />
        <SideMenuController sideMenu={SideMenuWithoutColors} />
      </BlockNoteView>
    </div>
  )
})

export default BlockNoteEditor
