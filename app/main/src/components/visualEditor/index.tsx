import {
  computed,
  defineComponent,
  shallowRef,
  ref,
  TransitionGroup,
  watch,
  Teleport,
  nextTick
} from 'vue'
import { storeToRefs } from 'pinia'
import { useVisualStore } from '@/store'
import { BlockType, OmitComponentType } from '@/shared'
import BlockRender from './BlockRender'
import VueDraggable from 'vuedraggable'
import { draggableGroupName } from '@/config'
import { GuideDrag } from '@/components/Base'

import { useSelectedStatus } from '@/hooks'
import styles from './css/VisualEditor.module.scss'
import { useGuideDrag } from './hooks/useGuideDrag'
import { NDropdown } from 'naive-ui'
import { MaybeArray } from 'naive-ui/es/_utils'

type BlockRenderType = InstanceType<typeof BlockRender> | null

const contextOptions = [
  {
    label: '删除',
    key: 'delete'
  }
]

export default defineComponent({
  name: 'VisualEditor',
  setup() {
    const store = useVisualStore()

    const { visualEditorData, editorDragType } = storeToRefs(store)

    const drag = ref(false)

    const xRef = ref(0)

    const yRef = ref(0)

    const showDropdownRef = ref(false)

    const mainPageStyle = computed(
      () => visualEditorData.value.pageConfig?.style
    )

    const innerCurPageComponets = shallowRef<BlockType[]>([])

    const editorDisableDrag = computed(() => editorDragType.value === 'nested')

    const { selectedBlockKey, setSelectedKey } = useSelectedStatus(
      innerCurPageComponets
    )

    // 拖拽指引
    const { blockRefs, showGuidTips, selectedBlockRefClientRect } =
      useGuideDrag(editorDisableDrag)

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

    function handleStartAndEndEvent(type: 'start' | 'end') {
      if (type === 'start') {
        drag.value = true
      } else {
        drag.value = false
      }
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

    // 有一个 递归 render 组件问题，在vite热更新的时候
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
          <NDropdown
            placement="bottom-start"
            trigger="manual"
            x={xRef.value}
            y={yRef.value}
            options={contextOptions}
            show={showDropdownRef.value}
            onClickoutside={() => (showDropdownRef.value = false)}
            onSelect={handleSelectContextOption}
          />
          <VueDraggable
            v-model={innerCurPageComponets.value}
            itemKey="key"
            group={draggableGroupName}
            onChange={handleChange}
            onStart={() => handleStartAndEndEvent('start')}
            onEnd={() => handleStartAndEndEvent('end')}
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
                      oncontextmenu={(e: MouseEvent) =>
                        handleContextMenu(
                          e,
                          !editorDisableDrag.value &&
                            isSelectedCurBlock(element.key!)
                        )
                      }
                      ref={ref => {
                        blockRefs.value.add(ref as BlockRenderType)
                      }}
                    >
                      <VueDraggable
                        v-model={element.coms!.value}
                        itemKey="key"
                        group={draggableGroupName}
                        {...getNestedDragOption(element.key!).value}
                      >
                        {{
                          item: ({
                            element: Com
                          }: {
                            element: OmitComponentType
                          }) => {
                            return (
                              <Com
                                oncontextmenu={(e: MouseEvent) =>
                                  handleContextMenu(e, editorDisableDrag.value)
                                }
                              />
                            )
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
