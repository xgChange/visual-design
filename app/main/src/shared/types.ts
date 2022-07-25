export type ObjectKeyType<T> = keyof T

import { VComponentType } from '@visual/components'

interface PageConfig {
  style: Record<string, string>
}

interface Component {
  name: string
  id: string
  style: Record<string, string>
  slot: Component
}

export type OmitComponentType = VComponentType & Component
export type BlockType = {
  key?: string
  coms?: OmitComponentType[]
}
export interface CurPageInfo {
  blocks: BlockType[]
  path: string
  title: string
}

export type VisualEditorType = {
  pageConfig: PageConfig
  page: Record<string, Partial<CurPageInfo>>
}
