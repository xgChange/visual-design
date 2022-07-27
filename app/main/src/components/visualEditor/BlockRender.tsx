import { NOOP } from '@/shared'
import { NButton, NTooltip } from 'naive-ui'
import { defineComponent, PropType, ref } from 'vue'

// import { MaskLayer } from '@/components/Base'

import style from './css/BlockRender.module.scss'

const OperationArea = defineComponent({
  emits: ['insert'],
  setup(props, { emit }) {
    function handleClick() {
      emit('insert', btnInfo.value.type)
      if (btnInfo.value.type === 'insert') {
        btnInfo.value = cancelBtnInfo
      } else {
        btnInfo.value = insertBtnInfo
      }
    }
    const insertBtnInfo = {
      text: '插入组件',
      type: 'insert'
    }
    const cancelBtnInfo = {
      text: '取消',
      type: 'cancel'
    }
    const btnInfo = ref(insertBtnInfo)
    return () => (
      <div class={style.comOperationArea}>
        <NButton type="info" size="tiny" onClick={handleClick}>
          {btnInfo.value.text}
        </NButton>
      </div>
    )
  }
})

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
    onInsert: {
      type: Function as PropType<(type: string) => void>,
      default: NOOP
    }
  },
  emits: ['insert'],
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
            disabled={props.disabled}
            v-slots={{
              trigger: () =>
                // <MaskLayer cursor="move">
                //   {slots.default?.() || <div>组件占位</div>}
                // </MaskLayer>
                slots.default?.() || <div>组件占位</div>,
              default: () => '编辑内容'
            }}
          ></NTooltip>
          <OperationArea v-show={props.selected} onInsert={props.onInsert} />
        </div>
      )
    }
  }
})
