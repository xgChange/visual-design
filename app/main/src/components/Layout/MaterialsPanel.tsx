import { NCollapse, NCollapseItem } from 'naive-ui'
import { defineComponent } from 'vue'
import { VButton } from '@visual/components'

import styles from './csss/MaterialPanel.module.scss'

const InsertHeader = (title: string) => () =>
  <div class={styles.itemHeader}>{title}</div>

export default defineComponent({
  name: 'MaterialsPanel',
  setup() {
    const defaultOpen = ['baseComponent']
    return () => (
      <NCollapse
        class={styles.materialPanel}
        defaultExpandedNames={defaultOpen}
        displayDirective="show"
        arrowPlacement="left"
      >
        <NCollapseItem
          class={styles.item}
          name="baseComponent"
          v-slots={{ header: InsertHeader('基础组件') }}
        >
          <VButton.preview />
        </NCollapseItem>
        <NCollapseItem
          class={styles.item}
          v-slots={{ header: InsertHeader('页面设置') }}
          title="页面设置"
          name="pageConfig"
        >
          页面设置
        </NCollapseItem>
      </NCollapse>
    )
  }
})
