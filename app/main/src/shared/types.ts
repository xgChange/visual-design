export type ObjectKeyType<T> = keyof T

import { VComponentType } from 'asam-visual-components'
import { ShallowRef } from 'vue'

interface PageConfig {
  style: Record<string, any>
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
  coms?: ShallowRef<OmitComponentType[]>
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
