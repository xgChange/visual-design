import { NTooltip } from 'naive-ui'
import { defineComponent, PropType } from 'vue'

import { MaskLayer } from '@/components/Base'

import style from './css/BlockRender.module.scss'

export default defineComponent({
  name: 'BlockRender',
  props: {
    disabled: {
      type: Boolean as PropType<boolean>,
      default: false
    }
  },
  setup(props, { slots }) {
    return () => {
      return (
        <div
          class={[
            props.disabled
              ? `${style.comRenderBox}--disabled`
              : style.comRenderBox
          ]}
        >
          <NTooltip
            trigger="click"
            v-slots={{
              trigger: () => (
                <MaskLayer cursor="move">
                  {slots.default?.() || <div>组件占位</div>}
                </MaskLayer>
              ),
              default: () => '编辑内容'
            }}
          ></NTooltip>
        </div>
      )
    }
  }
})
