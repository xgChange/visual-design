import {
  computed,
  defineComponent,
  shallowRef,
  ref,
  TransitionGroup,
  watchEffect
} from 'vue'
import { storeToRefs } from 'pinia'
import { useVisualStore } from '@/store'
import { BlockType } from '@/shared'
import BlockRender from './BlockRender'
import VueDraggable from 'vuedraggable'
import { draggableGroupName } from '@/config'
import styles from './css/VisualEditor.module.scss'

export default defineComponent({
  name: 'VisualEditor',
  setup() {
    const store = useVisualStore()
    const { curPageBlocks, visualEditorData } = storeToRefs(store)

    const mainPageStyle = computed(
      () => visualEditorData.value.pageConfig?.style
    )

    const innerCurPageComponets = shallowRef<BlockType[]>([])

    watchEffect(() => {
      store.setCurPageBlock(innerCurPageComponets.value)
      console.log(innerCurPageComponets.value, curPageBlocks)
    })

    function handleChange(evt: any) {
      console.log('change-clone', evt)
    }

    const dragOptions = computed(() => ({
      animation: 200,
      disabled: false
    }))

    const drag = ref(false)

    function handleStart() {
      drag.value = true
    }

    function handleEnd() {
      drag.value = false
    }

    // 要拆成一个 渲染组件，用来自定义编辑功能
    return () => {
      return (
        <div style={mainPageStyle.value} class={styles.visualEditor}>
          <VueDraggable
            v-model={innerCurPageComponets.value}
            itemKey="key"
            group={draggableGroupName}
            onChange={handleChange}
            onStart={handleStart}
            onEnd={handleEnd}
            class={[styles.visualBlocks]}
            {...dragOptions.value}
          >
            {{
              item: ({ element }: { element: BlockType }) => {
                return (
                  <TransitionGroup
                    tag="div"
                    name="flip-list"
                    class={[drag.value ? 'styles.dragging' : '']}
                  >
                    <BlockRender key={element.key}>
                      {element?.coms?.map(Com => (
                        <Com />
                      ))}
                    </BlockRender>
                  </TransitionGroup>
                )
              }
            }}
          </VueDraggable>
        </div>
      )
    }
  }
})
