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

    const { visualEditorData, editorDragType, selectedComInfo, curPageBlocks } =
      storeToRefs(store)

    const drag = ref(false)

    const innerCurPageComponets = shallowRef<BlockType[]>([])

    const selectedComKey = computed(() => selectedComInfo.value?.key as string)

    const curPageBlock = computed(
      () =>
        curPageBlocks.value?.find(
          item => item.key === selectedBlockKey.value
        ) as BlockType | undefined
    )

    // 这里收集了当前页面上的组件props
    const curComProps = computed(() => {
      const pageComs = curPageBlocks.value?.map(item => item.coms).flat() || []
      // 序列化 com props
      return pageComs.reduce((cur, next) => {
        cur[next!.key as string] = Object.keys(next?.editorProps || {}).reduce(
          (obj, prop) => {
            // 这里做了一个 响应式依赖，selectedComInfo，在render时候会响应 selectedComInfo收集的依赖，从而从新执行这个computed
            const curRealEditorProps =
              selectedComKey.value === next?.key ? selectedComInfo.value : next
            const defaultValue =
              curRealEditorProps?.editorProps[prop].defaultValue
            const type = curRealEditorProps?.editorProps[prop].type
            obj[prop] = validateField(type(defaultValue), type)
            return obj
          },
          {} as Record<string, string | boolean | number | undefined>
        )
        return cur
      }, {} as Record<string, any>)
    })

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
      selectedBlockKey,
      selectedComKey,
      curPageBlock
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

    function isSelectedCurCom(key: string) {
      return selectedComKey.value === key
    }

    function selectedCurComponent(info: OmitComponentType) {
      if (info.key !== selectedComKey.value) {
        console.log('set-selected-com')
        store.setSelectedComInfo(info)
      }
    }

    function withDisableFnByCom(fn: (...args: any[]) => any, key: string) {
      if (editorDisableDrag.value && isSelectedCurBlock(key)) {
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
                      oncontextmenu={(e: MouseEvent) => {
                        return handleContextMenu(
                          e,
                          !editorDisableDrag.value &&
                            isSelectedCurBlock(element.key!)
                        )
                      }}
                      ref={ref => {
                        blockRefs.value.add(ref as BlockRenderType)
                      }}
                    >
                      <VueDraggable
                        class={styles.visualDragComs}
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
                                  withDisableFnByCom(
                                    () => selectedCurComponent(Com),
                                    element.key!
                                  )
                                }
                                oncontextmenu={(e: MouseEvent) => {
                                  return handleContextMenu(
                                    e,
                                    editorDisableDrag.value &&
                                      isSelectedCurCom(Com.key! as string)
                                  )
                                }}
                                class={[
                                  styles.comWrapper,
                                  {
                                    [`${styles.comWrapperSelected}`]:
                                      selectedComKey.value === Com.key
                                  }
                                ]}
                              >
                                <Com
                                  {...(curComProps.value[Com.key as string] ||
                                    {})}
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
