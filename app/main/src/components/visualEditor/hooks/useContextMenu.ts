import { ref, Ref, nextTick, ShallowRef, shallowRef } from 'vue'
import { MaybeArray } from 'naive-ui/es/_utils'
import { BlockType } from '@/shared'

export function useContextMenu(
  editorDisableDrag: Ref<boolean>,
  innerCurPageComponets: ShallowRef<BlockType[]>,
  selectedBlockKey: Ref<string>,
  selectedComKey: Ref<string>,
  curPageBlock: Ref<BlockType | undefined>
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

      // 删除 Com
      if (editorDisableDrag.value) {
        if (curPageBlock.value && curPageBlock.value.coms) {
          curPageBlock.value.coms = shallowRef(
            curPageBlock.value?.coms?.value?.filter(
              item => item.key !== selectedComKey.value
            ) || []
          )
          console.log('after delete com: ', curPageBlock.value.coms)
        }
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
