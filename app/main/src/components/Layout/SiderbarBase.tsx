import { defineComponent } from 'vue'
import { LogoWrapper } from '@/components'
import MaterialsPanel from './MaterialsPanel'

export default defineComponent({
  name: 'SiderbarBase',
  setup() {
    return () => {
      return (
        <div>
          <LogoWrapper />
          <MaterialsPanel style={{ marginTop: '10px' }} />
        </div>
      )
    }
  }
})
