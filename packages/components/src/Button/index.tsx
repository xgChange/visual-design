import { defineComponent, PropType, ExtractPropTypes, onMounted } from 'vue'
import { SlotEventType, ExtendedProperty } from '../types'

import Button, { ButtonProps } from 'vant/es/button/index'
import 'vant/es/button/style/index'

const props = {
  label: {
    type: String as PropType<string>,
    default: '按钮'
  }
} as const

type curButtonProps = ExtractPropTypes<typeof props>

export type VButtonPropsType = curButtonProps & ButtonProps

export const VButtonProps = { ...props } as any

const VButton = defineComponent<Partial<VButtonPropsType>>({
  name: 'Button',
  props: VButtonProps,
  inheritAttrs: false,
  preview: () => (
    <Button type="primary" size="small">
      按钮
    </Button>
  ),
  setup(props, { slots, attrs }) {
    onMounted(() => {
      console.log('button mounted')
    })
    return () => {
      const { label, ...rest } = props
      const innerSlots = {
        ...slots,
        default: label ? () => label : slots.default
      }
      return <Button {...rest} {...attrs} v-slots={innerSlots} />
    }
  },
  slots: [
    {
      type: 'default',
      alias: '按钮内容'
    },
    {
      type: 'icon',
      alias: '自定义图标'
    },
    {
      type: 'loading',
      alias: '自定义加载图标'
    }
  ] as SlotEventType[],
  events: [
    {
      type: 'click',
      alias: '点击事件'
    }
  ] as SlotEventType[]
})

type VButtonType = typeof VButton & ExtendedProperty

export default VButton as VButtonType
