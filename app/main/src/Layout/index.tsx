import { defineComponent } from 'vue'
import {
  HeaderBase,
  SiderbarBase,
  ContentBase,
  SiderRightBase
} from '@/components'
import { NLayout, NLayoutContent, NLayoutSider } from 'naive-ui'

import styles from './css/Layout.module.scss'

export default defineComponent({
  name: 'BaseLayout',
  setup() {
    return () => (
      <NLayout hasSider class={styles.layoutContainer}>
        <NLayoutSider bordered class={styles.left}>
          <SiderbarBase />
        </NLayoutSider>
        <NLayoutContent class={styles.middle}>
          <HeaderBase class={styles.mlHeader} />
          <ContentBase class={styles.mlContent} />
        </NLayoutContent>
        <NLayoutSider class={styles.right}>
          <SiderRightBase />
        </NLayoutSider>
      </NLayout>
    )
  }
})
