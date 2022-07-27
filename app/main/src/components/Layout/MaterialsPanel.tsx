import { NCollapse, NCollapseItem } from 'naive-ui'
import {
  computed,
  defineComponent,
  ref,
  shallowRef,
  TransitionGroup
} from 'vue'
import { VComponentAll, VComponentType } from '@visual/components'
import VueDraggable from 'vuedraggable'

import { createArray, generateNanoId, ObjectKeyType } from '@/shared'
import {
  PANEL_GROUP_TYPE,
  panelGroupName,
  componentName,
  draggableGroupName
} from '@/config'
import styles from './css/MaterialPanel.module.scss'
import { BlockType } from '@/shared'
import { useVisualStore } from '@/store'

function initPanelData() {
  const panelData = {
    [PANEL_GROUP_TYPE.COMPONENT]: VComponentAll,
    [PANEL_GROUP_TYPE.PAGESETTING]: []
  }

  const panelArrData = Object.keys(panelData).map(key => {
    return {
      type: key,
      alias: panelGroupName[key as keyof typeof panelData],
      data: panelData[key as keyof typeof panelData]
    }
  })

  return { panelData, panelArrData }
}

const InsertHeader = (title: string) => () =>
  <div class={styles.itemHeader}>{title}</div>

export default defineComponent({
  name: 'MaterialsPanel',
  setup() {
    const { panelData } = initPanelData()

    const store = useVisualStore()

    const isNestedDrag = computed(() => store.editorDragType === 'nested')

    const defaultOpen = [PANEL_GROUP_TYPE.COMPONENT]

    const componentsData = ref(panelData[PANEL_GROUP_TYPE.COMPONENT])

    const drag = ref(false)

    const dragOptions = computed(() => ({
      animation: 200,
      disabled: false
    }))

    function handleStart() {
      drag.value = true
    }

    function handleEnd() {
      drag.value = false
    }

    function createBlock(original: VComponentType) {
      if (isNestedDrag.value) {
        const result = Object.assign({ key: generateNanoId() }, { ...original })
        console.log('clone', result)
        return result
      }
      const block = {
        key: generateNanoId(),
        coms: shallowRef(createArray([{ ...original, key: generateNanoId() }])) // 重新解构 component 使其失去响应式
      } as BlockType
      console.log('clone', block)
      return block
    }

    return () => (
      <NCollapse
        class={styles.materialPanel}
        defaultExpandedNames={defaultOpen}
        displayDirective="show"
        arrowPlacement="left"
      >
        {/* 基础组件 */}
        <NCollapseItem
          class={styles.item}
          name={PANEL_GROUP_TYPE.COMPONENT}
          v-slots={{
            header: InsertHeader(panelGroupName[PANEL_GROUP_TYPE.COMPONENT])
          }}
        >
          <VueDraggable
            class={styles.component}
            v-model={componentsData.value}
            itemKey="name"
            group={{ name: draggableGroupName, pull: 'clone', put: false }}
            clone={createBlock}
            onStart={handleStart}
            onEnd={handleEnd}
            {...dragOptions.value}
          >
            {{
              item: ({ element }: any) => {
                return (
                  <TransitionGroup
                    tag="div"
                    name="flip-list"
                    class={[
                      styles.componentItem,
                      drag.value ? styles.dragging : ''
                    ]}
                  >
                    <element.preview
                      class={styles.content}
                      key={element.name}
                    />
                    <div class={styles.textTips} key={element.name}>
                      {
                        componentName[
                          element.name as ObjectKeyType<typeof componentName>
                        ]
                      }
                    </div>
                  </TransitionGroup>
                )
              }
            }}
          </VueDraggable>
        </NCollapseItem>
        {/* 页面设置 */}
        <NCollapseItem
          class={styles.item}
          v-slots={{
            header: InsertHeader(panelGroupName[PANEL_GROUP_TYPE.PAGESETTING])
          }}
          name={PANEL_GROUP_TYPE.PAGESETTING}
        >
          页面设置
        </NCollapseItem>
      </NCollapse>
    )
  }
})
