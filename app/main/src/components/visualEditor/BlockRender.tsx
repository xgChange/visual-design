import { NButton, NTooltip } from 'naive-ui'
import { defineComponent, FunctionalComponent, PropType } from 'vue'

import { NOOP } from '@/shared'
import { MaskLayer } from '@/components/Base'

import style from './css/BlockRender.module.scss'

const OperationArea: FunctionalComponent<{
  onInsert: () => void
}> = props => {
  return (
    <div class={style.comOperationArea}>
      <NButton type="info" size="tiny" onClick={props.onInsert}>
        插入组件
      </NButton>
    </div>
  )
}

export default defineComponent({
  name: 'BlockRender',
  props: {
    disabled: {
      type: Boolean as PropType<boolean>,
      default: false
    },
    selected: {
      type: Boolean as PropType<boolean>,
      default: false
    },
    inSert: {
      type: Function as PropType<typeof NOOP>,
      default: NOOP
    }
  },
  setup(props, { slots }) {
    return () => {
      return (
        <div
          class={[
            style.comRenderBox,
            {
              [`${style.comRenderBoxDisabled}`]: props.disabled,
              [`${style.comRenderBoxSelected}`]: props.selected
            }
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
          <OperationArea v-show={props.selected} onInsert={props.inSert} />
        </div>
      )
    }
  }
})
