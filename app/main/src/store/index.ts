import { computed, reactive, ref, shallowRef } from 'vue'
import { defineStore, createPinia } from 'pinia'
import { BlockType, generateNanoId, OmitComponentType } from '@/shared'

import { VisualEditorType, createArray } from '@/shared'

type DragType = 'default' | 'nested'

export const useVisualStore = defineStore('visualEditorConfig', () => {
  const visualEditorData = reactive<Partial<VisualEditorType>>({
    pageConfig: {
      style: {
        'background-color': '#fff'
      }
    },
    page: {
      '/': {
        blocks: [] as BlockType[],
        path: '/',
        title: '首页'
      }
    }
  })

  const selectPath = ref('/') // 当前 设置(选择)的路由

  const editorDragType = ref<DragType>('default')

  const curPageInfo = computed(() => visualEditorData?.page?.[selectPath.value])

  const curPageBlocks = computed(() => curPageInfo.value?.blocks)

  const selectedComInfo = ref<OmitComponentType>()

  // 为当前 page 的 block 增加 com
  function addCurPageComponentByBlock(
    com: OmitComponentType,
    blockKey?: string
  ) {
    const blockLength = curPageBlocks.value?.length
    let blockIndex = blockLength
    if (blockKey === undefined) {
      blockIndex = blockLength
    }

    // 如果没有key
    if (
      curPageBlocks.value &&
      blockKey === undefined &&
      blockIndex !== undefined
    ) {
      if (!curPageBlocks.value[blockIndex]) {
        curPageBlocks.value[blockIndex] = {
          coms: shallowRef(createArray()),
          key: generateNanoId()
        } as BlockType
      }
      curPageBlocks.value![blockIndex].coms!.value.push(com)
    }

    if (curPageBlocks.value && blockKey) {
      const curBlock = curPageBlocks.value.find(block => block.key === blockKey)
      if (curBlock) {
        curBlock.coms?.value.push(com)
      }
    }
  }

  // 设置当前 page 的block
  function setCurPageBlock(block: BlockType[]) {
    if (curPageInfo.value) {
      curPageInfo.value.blocks = block
    }
  }

  function setEditorDragType(type: DragType) {
    editorDragType.value = type
  }

  function setSelectedComInfo(info: OmitComponentType | undefined) {
    selectedComInfo.value = info
  }

  return {
    visualEditorData,
    curPageInfo,
    selectPath,
    curPageBlocks,
    editorDragType,
    selectedComInfo,
    addCurPageComponentByBlock,
    setCurPageBlock,
    setEditorDragType,
    setSelectedComInfo
  }
})

export default createPinia()
