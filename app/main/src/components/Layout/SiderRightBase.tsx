import { NTabPane, NTabs } from 'naive-ui'
import { defineComponent } from 'vue'

import PropForm from '../SiderComponent/PropForm'

import styles from './css/SiderRightBase.module.scss'

export default defineComponent({
  name: 'SiderRightBase',
  setup() {
    return () => {
      return (
        <NTabs
          defaultValue="props"
          justifyContent="space-evenly"
          type="line"
          class={styles.siderRightBase}
        >
          <NTabPane name="props" tab="属性" class={styles.tabItemWrapper}>
            <PropForm />
          </NTabPane>
          <NTabPane name="event" tab="事件" class={styles.tabItemWrapper}>
            事件
          </NTabPane>
          <NTabPane
            name="pageSetting"
            tab="页面设置"
            class={styles.tabItemWrapper}
          >
            页面设置
          </NTabPane>
        </NTabs>
      )
    }
  }
})
