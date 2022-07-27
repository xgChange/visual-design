import {
  computed,
  defineComponent,
  shallowRef,
  ref,
  TransitionGroup,
  watch,
  Teleport
} from 'vue'
import { storeToRefs } from 'pinia'
import { useVisualStore } from '@/store'
import { BlockType } from '@/shared'
import BlockRender from './BlockRender'
import VueDraggable from 'vuedraggable'
import { draggableGroupName } from '@/config'
import { GuideDrag } from '@/components/Base'

import { useSelectedStatus } from '@/hooks'
import styles from './css/VisualEditor.module.scss'

type BlockRenderType = InstanceType<typeof BlockRender> | null

export default defineComponent({
  name: 'VisualEditor',
  setup() {
    const store = useVisualStore()
    const { visualEditorData, editorDragType } = storeToRefs(store)

    const mainPageStyle = computed(
      () => visualEditorData.value.pageConfig?.style
    )

    const drag = ref(false)

    const blockRefs = ref<Set<BlockRenderType>>(new Set()) // 收集refs

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

    const innerCurPageComponets = shallowRef<BlockType[]>([])

    const { selectedBlockKey, setSelectedKey } = useSelectedStatus(
      innerCurPageComponets
    )

    const editorDisableDrag = computed(() => editorDragType.value === 'nested')

    const showGuidTips = computed(
      () => selectedBlockRef.value && editorDisableDrag.value
    )

    watch(innerCurPageComponets, v => {
      store.setCurPageBlock(v)
    })

    const dragOptions = computed(() => ({
      animation: 200,
      disabled: editorDisableDrag.value,
      ghostClass: 'ghost-editor'
    }))

    // 场景是：selected某个框之后，点击 “插入组件”，只允许插入到当前选中的框中
    function getNestedDragOption(key: string) {
      return computed(() => ({
        animation: 200,
        disabled: !(key === selectedBlockKey.value && editorDisableDrag.value),
        ghostClass: 'ghost-editor'
      }))
    }

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
      if (!editorDisableDrag.value) {
        setSelectedKey(key)
      }
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

    function isSelectedCurBlock(key: string) {
      return selectedBlockKey.value === key
    }

    // 要拆成一个 渲染组件，用来自定义编辑功能
    return () => {
      return (
        <div style={mainPageStyle.value} class={styles.visualEditor}>
          {showGuidTips.value && (
            <Teleport to="body">
              <GuideDrag
                position="fixed"
                style={{
                  top: selectedBlockRefClientRect.value!.y + 'px',
                  left: selectedBlockRefClientRect.value!.x - 80 + 'px'
                }}
              />
            </Teleport>
          )}
          {/* <Teleport to="body">
            <GuideDrag style={{position: 'relative', top: }} />
          </Teleport> */}
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
                      disabled={
                        drag.value ||
                        (editorDisableDrag.value &&
                          !isSelectedCurBlock(element.key!)) // 除了当前选中的，其他disabled
                      }
                      selected={isSelectedCurBlock(element.key!)}
                      onClick={() => handleClick(element.key!)}
                      onInsert={type => handleInsertCom(type)}
                      ref={ref => {
                        blockRefs.value.add(ref as BlockRenderType)
                      }}
                    >
                      {/* {element?.coms?.map(Com => (
                        <Com />
                      ))} */}
                      <VueDraggable
                        v-model={element.coms!.value}
                        itemKey="name"
                        group={draggableGroupName}
                        {...getNestedDragOption(element.key!).value}
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
