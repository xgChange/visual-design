// 设置当前选中的status
import { BlockType } from '@/shared'
import { ref, watch, ShallowRef } from 'vue'

// 暂时不存入 store ，看后续是否需要
export function useSelectedStatus(curPageComponents: ShallowRef<BlockType[]>) {
  const selectedBlock = ref('')

  function setSelectedKey(key: string) {
    selectedBlock.value = key
  }

  watch(curPageComponents, (v, oldv) => {
    if (v.length !== oldv.length) {
      const length = v.length
      selectedBlock.value = v[length - 1].key!
    }
  })

  return {
    selectedBlock,
    setSelectedKey
  }
}
