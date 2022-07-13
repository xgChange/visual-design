import { computed, reactive, ref } from 'vue'
import { defineStore, createPinia } from 'pinia'
import { OmitComponentType } from '@/shared'

import { VisualEditorType } from '@/shared'

export const useVisualStore = defineStore('visualEditorConfig', () => {
  const visualEditorData = reactive<Partial<VisualEditorType>>({
    pageConfig: {
      style: {
        'background-color': '#fff'
      }
    },
    page: {
      '/': {
        components: [] as OmitComponentType[],
        path: '/',
        title: '首页'
      }
    }
  })

  const selectPath = ref('/') // 当前 设置(选择)的路由

  const curPageInfo = computed(() => visualEditorData?.page?.[selectPath.value])

  const curPageComponents = ref(curPageInfo.value?.components)

  function addCurPageComponent(com: OmitComponentType) {
    curPageComponents.value?.push(com)
  }

  return {
    visualEditorData,
    curPageInfo,
    selectPath,
    curPageComponents,
    addCurPageComponent
  }
})

export default createPinia()
