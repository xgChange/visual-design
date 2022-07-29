import { ref, computed, Ref } from 'vue'
import type { BlockRenderType } from '../BlockRender'

export function useGuideDrag(editorDisableDrag: Ref<boolean>) {
  const blockRefs = ref<Set<BlockRenderType | null>>(new Set())

  const selectedBlockRef = computed(() =>
    Array.from(blockRefs.value).find(ref => ref?.selected)
  )

  const selectedBlockRefClientRect = computed(() => {
    if (selectedBlockRef.value) {
      const rect = selectedBlockRef.value.$el.getBoundingClientRect()
      return {
        x: rect.x,
        y: rect.y
      }
    }
    return null
  })

  const showGuidTips = computed(
    () => selectedBlockRef.value && editorDisableDrag.value
  )

  return {
    selectedBlockRefClientRect,
    showGuidTips,
    blockRefs
  }
}
