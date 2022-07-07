import { defineComponent } from 'vue'
import { LogoWrapper } from '@/components'
import MaterialsPanel from './MaterialsPanel'
import { NDivider } from 'naive-ui'

export default defineComponent({
  name: 'SiderbarBase',
  setup() {
    return () => {
      return (
        <div>
          <LogoWrapper />
          <NDivider style={{ marginTop: '5px', marginBottom: '5px' }} />
          <MaterialsPanel style={{ marginTop: '10px' }} />
        </div>
      )
    }
  }
})
