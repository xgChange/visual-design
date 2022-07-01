import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ContentBase',
  setup() {
    return () => {
      return <div>我是中间</div>
    }
  }
})
