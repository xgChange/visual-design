import { computed, defineComponent, watch, shallowRef } from 'vue'
import { useVisualStore } from '@/store'
import { OmitComponentType } from '@/shared'

export default defineComponent({
  name: 'VisualEditor',
  setup() {
    const { curPageComponents, visualEditorData } = useVisualStore()

    const mainPageStyle = computed(() => visualEditorData.pageConfig?.style)

    const innerCurPageComponets = shallowRef<OmitComponentType[]>()

    watch(
      curPageComponents!,
      v => {
        // 解构的目的是为了不让 组件 变成响应式，避免warning
        innerCurPageComponets.value = v.map(
          item => ({ ...item } as OmitComponentType)
        )
      },
      {
        deep: true
      }
    )

    // 要拆成一个 渲染组件，用来自定义编辑功能
    return () => {
      return (
        <div style={mainPageStyle.value}>
          {innerCurPageComponets?.value?.map(Com => (
            <Com />
          ))}
        </div>
      )
    }
  }
})
