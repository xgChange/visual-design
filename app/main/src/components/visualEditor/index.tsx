import {
  computed,
  defineComponent,
  shallowRef,
  ref,
  TransitionGroup,
  watch
} from 'vue'
import { storeToRefs } from 'pinia'
import { useVisualStore } from '@/store'
import { BlockType } from '@/shared'
import BlockRender from './BlockRender'
import VueDraggable from 'vuedraggable'
import { draggableGroupName } from '@/config'

import { useSelectedStatus } from '@/hooks'
import styles from './css/VisualEditor.module.scss'

export default defineComponent({
  name: 'VisualEditor',
  setup() {
    const store = useVisualStore()
    const { visualEditorData, editorDragType } = storeToRefs(store)

    const mainPageStyle = computed(
      () => visualEditorData.value.pageConfig?.style
    )

    const drag = ref(false)

    const innerCurPageComponets = shallowRef<BlockType[]>([])

    const { selectedBlockKey, setSelectedKey } = useSelectedStatus(
      innerCurPageComponets
    )

    const editorDisableDrag = computed(() => editorDragType.value === 'nested')

    watch(innerCurPageComponets, v => {
      console.log(v)
      store.setCurPageBlock(v)
    })

    const dragOptions = computed(() => ({
      animation: 200,
      disabled: editorDisableDrag.value,
      ghostClass: 'ghost-editor'
    }))

    const nestedDragOptions = computed(() => ({
      animation: 200,
      disabled: !editorDisableDrag.value,
      ghostClass: 'ghost-editor'
    }))

    function handleChange(evt: any) {
      console.log('change-clone', evt)
    }

    function handleStart() {
      drag.value = true
    }

    function handleEnd() {
      drag.value = false
    }

    function handleClick(key: string) {
      setSelectedKey(key)
    }

    function handleMove(ctx: any) {
      setSelectedKey(ctx.draggedContext.element.key)
    }

    function handleInsertCom(type: string) {
      console.log(type)
      type === 'insert'
        ? store.setEditorDragType('nested')
        : store.setEditorDragType('default')
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
            move={handleMove}
            class={[styles.visualBlocks]}
            {...dragOptions.value}
          >
            {{
              item: ({ element }: { element: BlockType }) => {
                return (
                  <TransitionGroup tag="div" name="flip-list">
                    <BlockRender
                      key={element.key}
                      disabled={drag.value}
                      selected={selectedBlockKey.value === element.key}
                      onClick={() => handleClick(element.key!)}
                      onInsert={type => handleInsertCom(type)}
                    >
                      {/* {element?.coms?.map(Com => (
                        <Com />
                      ))} */}
                      <VueDraggable
                        v-model={element.coms!.value}
                        itemKey="name"
                        group={draggableGroupName}
                        {...nestedDragOptions.value}
                      >
                        {{
                          item: ({ element: Com }: any) => {
                            return <Com />
                          }
                        }}
                      </VueDraggable>
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
