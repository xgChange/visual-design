import { defineComponent } from 'vue'
import { SlotEventType, ExtendedProperty } from '../types'

import Image, { ImageProps } from 'vant/es/image/index'
import 'vant/es/image/style/index'

export type VImagePropsType = ImageProps

export const VImageProps = { ...Image.props }

const VImage = defineComponent<Partial<VImagePropsType>>({
  name: 'Image',
  props: VImageProps,
  inheritAttrs: false,
  preview: () => <Image src=""></Image>,
  setup(props, { slots, attrs }) {
    return () => {
      const { ...rest } = props
      const innerSlots = {
        ...slots
      }
      return <Image {...rest} {...attrs} v-slots={innerSlots} />
    }
  },
  slots: [
    {
      type: 'default',
      alias: '图片下方内容'
    },
    {
      type: 'loading',
      alias: '加载中的提示内容'
    },
    {
      type: 'error',
      alias: '加载失败的提示内容'
    }
  ] as SlotEventType[],
  events: [
    {
      type: 'click',
      alias: '点击事件'
    }
  ] as SlotEventType[]
})

type VImageType = typeof VImage & ExtendedProperty

export default VImage as VImageType
