import { defineComponent, PropType, ExtractPropTypes, StyleValue } from 'vue'
import {
  SlotEventType,
  ExtendedProperty,
  ComEditorPropType,
  ComEditorWidgetType,
  StyleValueGroup
} from '../types'

import Button, { ButtonProps, ButtonType } from 'vant/es/button/index'
import 'vant/es/button/style/index'
import { createEditorPropsFactory, createSelectionFactory } from '../utils'

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
    props.label.default,
    ComEditorWidgetType.INPUT
  ),
  // size: createEditorPropsFactory(allProps.size, '按钮大小')(
  //   allProps.size.default,
  //   ComEditorWidgetType.SELECT,
  //   createSelectionFactory(
  //     ['large', 'mini', 'normal', 'small'] as ButtonSize[],
  //     item => ({ label: item, value: item })
  //   )
  // ),
  type: createEditorPropsFactory(allProps.type, '按钮类型')(
    allProps.type.default,
    ComEditorWidgetType.SELECT,
    createSelectionFactory(
      ['primary', 'success', 'warning', 'danger', 'default'] as ButtonType[],
      item => ({ label: item, value: item })
    )
  ),
  color: createEditorPropsFactory(allProps.color, '按钮颜色')(
    '',
    ComEditorWidgetType.COLOR
  )
}

const editorStyles: Partial<ComEditorPropType<StyleValue | StyleValueGroup>> = {
  width: createEditorPropsFactory(
    { type: Number },
    '宽度',
    'px'
  )(60, ComEditorWidgetType.INPUTNUMBER),
  height: createEditorPropsFactory(
    { type: Number },
    '高度',
    'px'
  )(44, ComEditorWidgetType.INPUTNUMBER),
  positionGroup: createEditorPropsFactory({ type: Object }, '位置', 'px')(
    undefined,
    ComEditorWidgetType.CONTROLLINPUT
  )
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
  editorProps,
  editorStyles
})

type VButtonType = typeof VButton & ExtendedProperty

export default VButton as VButtonType
