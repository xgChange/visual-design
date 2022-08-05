import { ref, Ref, nextTick, ShallowRef } from 'vue'
import { MaybeArray } from 'naive-ui/es/_utils'
import { BlockType } from '@/shared'

export function useContextMenu(
  editorDisableDrag: Ref<boolean>,
  innerCurPageComponets: ShallowRef<BlockType[]>,
  selectedBlockKey: Ref<string>
) {
  const xRef = ref(0)

  const yRef = ref(0)

  const showDropdownRef = ref(false)

  function handleContextMenu(e: MouseEvent, show: boolean) {
    if (show) {
      e.preventDefault()
      showDropdownRef.value = false
      nextTick().then(() => {
        showDropdownRef.value = true
        xRef.value = e.clientX
        yRef.value = e.clientY
      })
    }
  }

  function handleSelectContextOption(v: MaybeArray<string>) {
    if (typeof v === 'string') {
      // 删除 block
      if (!editorDisableDrag.value) {
        innerCurPageComponets.value = innerCurPageComponets.value.filter(
          item => item.key !== selectedBlockKey.value
        )
        console.log(innerCurPageComponets.value)
      }
    }
    showDropdownRef.value = false
  }

  return {
    xRef,
    yRef,
    showDropdownRef,
    handleContextMenu,
    handleSelectContextOption
  }
}
