import { defineComponent, PropType, ExtractPropTypes } from 'vue'
import {
  SlotEventType,
  ExtendedProperty,
  ComEditorPropType,
  ComEditorWidgetType
} from '../types'

import Button, { ButtonProps, ButtonType } from 'vant/es/button/index'
import 'vant/es/button/style/index'
import { createEditorPropsFactory, createSelectionFactory } from '../utils'
import { ButtonSize } from 'vant'

const props = {
  label: {
    type: String as PropType<string>,
    default: '按钮'
  }
} as const

type curButtonProps = ExtractPropTypes<typeof props>

export type VButtonPropsType = curButtonProps & ButtonProps

export const VButtonProps = { ...props } as any

const allProps = { ...props, ...Button.props }

const editorProps: Partial<ComEditorPropType<VButtonPropsType>> = {
  label: createEditorPropsFactory(allProps.label, '按钮内容')(
    '默认按钮',
    ComEditorWidgetType.INPUT
  ),
  size: createEditorPropsFactory(allProps.size, '按钮大小')(
    allProps.size.default,
    ComEditorWidgetType.SELECT,
    createSelectionFactory(
      ['large', 'mini', 'normal', 'small'] as ButtonSize[],
      item => ({ label: item, value: item })
    )
  ),
  type: createEditorPropsFactory(allProps.type, '按钮类型')(
    allProps.type.default,
    ComEditorWidgetType.SELECT,
    createSelectionFactory(
      ['primary', 'success', 'warning', 'danger'] as ButtonType[],
      item => ({ label: item, value: item })
    )
  ),
  color: createEditorPropsFactory(allProps.color, '文字颜色')('', ComEditorWidgetType.COLOR)
}
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
  ] as SlotEventType[],
  editorProps
})

type VButtonType = typeof VButton & ExtendedProperty

export default VButton as VButtonType
