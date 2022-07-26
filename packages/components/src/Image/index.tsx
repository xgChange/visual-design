import { defineComponent, PropType } from 'vue'
import { SlotEventType, ExtendedProperty } from '../types'

import DefaultImg from '../assets/default-img.png'
import Image, { ImageProps } from 'vant/es/image/index'
import 'vant/es/image/style/index'

export type VImagePropsType = ImageProps

const props = {
  src: {
    type: String as PropType<string>,
    default: DefaultImg
  }
} as const

export const VImageProps = { ...props } as any

const VImage = defineComponent<Partial<VImagePropsType>>({
  name: 'Image',
  props: VImageProps,
  inheritAttrs: false,
  preview: () => <Image src={DefaultImg}></Image>,
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
