import { defineComponent, PropType, ExtractPropTypes } from 'vue'

import Button, { ButtonProps } from 'vant/es/button/index'
import 'vant/es/button/style/index'

const props = {
  label: {
    type: String as PropType<string>
  }
} as const

type curButtonProps = ExtractPropTypes<typeof props>

export type VButtonProps = curButtonProps & ButtonProps

export default defineComponent<Partial<VButtonProps>>({
  name: 'Button',
  props: { ...props, ...Button.props },
  preview: () => (
    <Button type="primary" size="small">
      按钮
    </Button>
  ),
  setup(props) {
    return () => {
      const { label, ...rest } = props
      return <Button {...rest}>{label}</Button>
    }
  }
})
