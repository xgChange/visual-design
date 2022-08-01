// 设置当前选中的status
import { BlockType } from '@/shared'
import { ref, watch, ShallowRef } from 'vue'

// 暂时不存入 store ，看后续是否需要
export function useSelectedStatus(curPageComponents: ShallowRef<BlockType[]>) {
  const selectedBlockKey = ref('')

  function setSelectedKey(key: string) {
    selectedBlockKey.value = key
  }

  watch(curPageComponents, (v, oldv) => {
    if (v.length !== oldv.length && v.length) {
      const length = v.length
      selectedBlockKey.value = v[length - 1].key!
    }
  })

  return {
    selectedBlockKey,
    setSelectedKey
  }
}
