import { NTooltip } from 'naive-ui'
import { defineComponent } from 'vue'

import { MaskLayer } from '@/components/Base'

import style from './css/BlockRender.module.scss'

export default defineComponent({
  name: 'BlockRender',
  setup(props, { slots }) {
    return () => {
      return (
        <div class={style.comRenderBox}>
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
