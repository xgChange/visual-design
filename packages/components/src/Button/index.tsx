import { defineComponent, PropType } from 'vue'

export default defineComponent({
  name: 'Button',
  props: {
    label: {
      type: String as PropType<string>
    }
  },
  setup(props) {
    return () => <button>{props.label}</button>
  }
})
