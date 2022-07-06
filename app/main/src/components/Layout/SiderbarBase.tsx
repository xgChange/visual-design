import { defineComponent } from 'vue'
import { LogoWrapper } from '@/components'

export default defineComponent({
  name: 'SiderbarBase',
  setup() {
    return () => {
      return (
        <div>
          <LogoWrapper style={{ borderBottom: '1px solid #ccc' }} />
        </div>
      )
    }
  }
})
