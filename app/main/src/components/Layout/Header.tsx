import { defineComponent } from 'vue'

export default defineComponent({
  name: 'HeaderBase',
  setup() {
    return () => {
      return <div>我是header</div>
    }
  }
})
