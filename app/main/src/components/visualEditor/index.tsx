import {
  computed,
  defineComponent,
  shallowRef,
  ref,
  TransitionGroup,
  watch,
  Teleport,
  watchEffect
} from 'vue'
import { storeToRefs } from 'pinia'
import { useVisualStore } from '@/store'
import { BlockType, OmitComponentType, validateField } from '@/shared'
import BlockRender from './BlockRender'
import VueDraggable from 'vuedraggable'
import { draggableGroupName } from '@/config'
import { GuideDrag } from '@/components/Base'

import { useSelectedStatus } from '@/hooks'
import styles from './css/VisualEditor.module.scss'
import { useGuideDrag } from './hooks/useGuideDrag'
import { NDropdown } from 'naive-ui'
import { useContextMenu } from './hooks/useContextMenu'

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

    const { visualEditorData, editorDragType, selectedComInfo } =
      storeToRefs(store)

    const drag = ref(false)

    const innerCurPageComponets = shallowRef<BlockType[]>([])

    const selectedComKey = computed(() => selectedComInfo.value?.key)

    const selectedComProps = computed(() =>
      Object.keys(selectedComInfo.value?.editorProps || {}).reduce(
        (cur, next) => {
          const defaultValue =
            selectedComInfo.value?.editorProps[next].defaultValue
          const type = selectedComInfo.value?.editorProps[next].type
          cur[next] = validateField(type(defaultValue), type)
          return cur
        },
        {} as Record<string, any>
      )
    )

    const mainPageStyle = computed(
      () => visualEditorData.value.pageConfig?.style
    )

    const editorDisableDrag = computed(() => editorDragType.value === 'nested')

    const { selectedBlockKey, setSelectedKey } = useSelectedStatus(
      innerCurPageComponets
    )

    // 拖拽指引
    const { blockRefs, showGuidTips, selectedBlockRefClientRect } =
      useGuideDrag(editorDisableDrag)

    // 右键菜单
    const {
      xRef,
      yRef,
      handleContextMenu,
      handleSelectContextOption,
      showDropdownRef
    } = useContextMenu(
      editorDisableDrag,
      innerCurPageComponets,
      selectedBlockKey
    )

    watch(innerCurPageComponets, v => {
      store.setCurPageBlock(v)
    })

    watchEffect(() => {
      if (!editorDisableDrag.value) {
        store.setSelectedComInfo(undefined)
      }
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

    function selectedCurComponent(info: OmitComponentType) {
      if (info.key !== selectedComKey.value) {
        store.setSelectedComInfo(info)
      }
    }

    function withDisable(fn: (...args: any[]) => any) {
      console.log(editorDisableDrag.value)
      if (editorDisableDrag.value) {
        fn()
      }
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
                            // 嵌套拖拽
                            return (
                              <div
                                onClick={() =>
                                  withDisable(() => selectedCurComponent(Com))
                                }
                                class={[
                                  styles.comWrapper,
                                  {
                                    [`${styles.comWrapperSelected}`]:
                                      selectedComKey.value === Com.key
                                  }
                                ]}
                              >
                                <Com
                                  oncontextmenu={(e: MouseEvent) =>
                                    handleContextMenu(
                                      e,
                                      editorDisableDrag.value
                                    )
                                  }
                                  {...(selectedComKey.value === Com.key
                                    ? selectedComProps.value
                                    : {})}
                                />
                              </div>
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
