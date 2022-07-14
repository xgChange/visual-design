import { NTooltip } from 'naive-ui'
import { defineComponent } from 'vue'

import { MaskLayer } from '@/components/Base'

import style from './css/ComRender.module.scss'

export default defineComponent({
  name: 'ComRender',
  setup(props, { slots }) {
    return () => {
      return (
        <div class={style.comRenderBox}>
          <NTooltip
            trigger="click"
            v-slots={{
              trigger: () =>
                <MaskLayer cursor="move">{slots.default?.()}</MaskLayer> || (
                  <div>组件占位</div>
                ),
              default: () => '编辑内容'
            }}
          ></NTooltip>
        </div>
      )
    }
  }
})
