import { defineComponent } from 'vue'
import {
  HeaderBase,
  SiderbarBase,
  ContentBase,
  SiderRightBase
} from '@/components'
import { NLayout, NLayoutContent, NLayoutHeader, NLayoutSider } from 'naive-ui'

export default defineComponent({
  name: 'BaseLayout',
  setup() {
    return () => (
      <div>
        <NLayout hasSider>
          <NLayoutSider bordered>
            <SiderbarBase />
          </NLayoutSider>
          <NLayoutContent>
            <NLayoutHeader>
              <HeaderBase />
            </NLayoutHeader>
            <NLayout>
              <NLayoutContent>
                <ContentBase />
              </NLayoutContent>
            </NLayout>
          </NLayoutContent>
          <NLayoutSider>
            <SiderRightBase />
          </NLayoutSider>
        </NLayout>
      </div>
    )
  }
})
