import { NCollapse, NCollapseItem } from 'naive-ui'
import { defineComponent, FunctionalComponent } from 'vue'
import { VComponentAll, VComponentType } from '@visual/components'

import { ObjectKeyType, OmitComponentType } from '@/shared'
import { PANEL_GROUP_TYPE, panelGroupName, componentName } from '@/config/enum'
import styles from './css/MaterialPanel.module.scss'
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

const ListItem: FunctionalComponent<{ tips: string }> = (props, { slots }) => (
  <div class={styles.componentItem}>
    {slots.default?.()}
    <div class={styles.textTips}>{props.tips}</div>
  </div>
)

export default defineComponent({
  name: 'MaterialsPanel',
  setup() {
    const { panelData } = initPanelData()
    const { addCurPageComponent } = useVisualStore()
    const defaultOpen = [PANEL_GROUP_TYPE.COMPONENT]

    function selectComponent(com: VComponentType) {
      addCurPageComponent(com as OmitComponentType)
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
          <div class={styles.component}>
            {panelData.component.map(Com => (
              <ListItem
                onClick={() => selectComponent(Com)}
                tips={
                  componentName[Com.name as ObjectKeyType<typeof componentName>]
                }
              >
                <Com.preview class={styles.content} />
              </ListItem>
            ))}
          </div>
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
