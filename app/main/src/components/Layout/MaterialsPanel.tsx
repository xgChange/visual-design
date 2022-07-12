import { NCollapse, NCollapseItem } from 'naive-ui'
import { defineComponent, FunctionalComponent } from 'vue'
import { VComponentAll } from '@visual/components'

import { ObjectKeyType } from '@/shared'
import { PANEL_GROUP_TYPE, panelGroupName, componentName } from '@/config/enum'
import styles from './csss/MaterialPanel.module.scss'

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
    const defaultOpen = [PANEL_GROUP_TYPE.COMPONENT]
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
