import {
  computed,
  defineComponent,
  shallowRef,
  ref,
  TransitionGroup,
  watch,
  Teleport,
  watchEffect,
  StyleValue
} from 'vue'
import { storeToRefs } from 'pinia'
import { useVisualStore } from '@/store'
import {
  BlockType,
  Data,
  OmitComponentType,
  validateField,
  PropValueType
} from '@/shared'
import BlockRender from './BlockRender'
import VueDraggable from 'vuedraggable'
import { draggableGroupName } from '@/config'
import { GuideDrag } from '@/components/Base'

import { useSelectedStatus } from '@/hooks'
import styles from './css/VisualEditor.module.scss'
import { useGuideDrag } from './hooks/useGuideDrag'
import { NDropdown } from 'naive-ui'
import { useContextMenu } from './hooks/useContextMenu'
import {
  coverComStyleByEdit,
  formatComStyle,
  getComStyle,
  getOuterBoxStyle,
  handleStyleObject,
  preComStyle
} from './style'

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

    const { editorDragType, selectedComInfo, curPageBlocks, visualPageConfig } =
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

    /**
     * @description 格式化props
     */
    function formatComProps(props: Data<any>, option?: 'style') {
      return Object.keys(props).reduce((obj, prop) => {
        // 这里做了一个 响应式依赖，selectedComInfo，在render时候会响应 selectedComInfo收集的依赖，从而从新执行这个computed
        const defaultValue = props[prop].defaultValue
        const type = props[prop].type
        const fieldResult = validateField(type(defaultValue), type)
        // 处理 style 的情况
        if (option == 'style') {
          obj[prop] = formatComStyle(props[prop], prop, fieldResult)
        } else {
          obj[prop] = fieldResult
        }
        return obj
      }, {} as Data<PropValueType>)
    }

    // 这里收集了当前页面上的组件props
    const curComProps = computed(() => {
      const pageComs = curPageBlocks.value?.map(item => item.coms).flat() || []
      // 序列化 com props、styles
      const result = pageComs.reduce(
        (cur, next) => {
          const curRealEditorProps =
            (selectedComKey.value === next?.key ? selectedComInfo.value : next)
              ?.editorProps || {}

          const curRealEditorStyles =
            (selectedComKey.value === next?.key ? selectedComInfo.value : next)
              ?.editorStyles || {}

          cur.props[next!.key as string] = formatComProps(curRealEditorProps)
          cur.styles[next!.key as string] = handleStyleObject(
            Object.assign(
              formatComProps(curRealEditorStyles, 'style'),
              preComStyle
            )
          )
          return cur
        },
        {
          props: {},
          styles: {}
        } as Record<'props' | 'styles', Data<any>>
      )
      // handleStyleObject(result.styles)
      return result
    })

    const mainPageStyle = computed(() => {
      const style = visualPageConfig.value?.style || {}
      if (visualPageConfig.value) {
        return Object.keys(style).reduce((cur, next) => {
          cur[next] = style[next].defaultValue
          return cur
        }, {} as Data) as StyleValue
      }
      return {} as StyleValue
    })

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

    // 拖拽后的数据 同步到 pinia
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
      console.log(curComProps.value)
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
                                style={getOuterBoxStyle(
                                  curComProps.value.styles[Com.key as string]
                                )}
                              >
                                <Com
                                  {...(curComProps.value.props[
                                    Com.key as string
                                  ] || {})}
                                  style={getComStyle(
                                    curComProps.value.styles[Com.key as string]
                                  )}
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
