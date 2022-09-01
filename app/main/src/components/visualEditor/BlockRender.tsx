import { NOOP } from '@/shared'
import { NButton } from 'naive-ui'
import { defineComponent, PropType, ref } from 'vue'
import { MaskLayer } from '../Base'

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
      text: '完成',
      type: 'finish'
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

const BlockRender = defineComponent({
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
    const lockMaskLayer = ref(true)

    function handleInsert(type: string) {
      if (type === 'insert') {
        lockMaskLayer.value = false
      } else {
        lockMaskLayer.value = true
      }
      props.onInsert(type)
    }
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
          style={{ cursor: lockMaskLayer.value ? 'move' : 'default' }}
        >
          {lockMaskLayer.value ? (
            <MaskLayer cursor="move">{slots.default?.()}</MaskLayer>
          ) : (
            slots?.default?.()
          )}
          <OperationArea v-show={props.selected} onInsert={handleInsert} />
        </div>
      )
    }
  }
})

export type BlockRenderType = InstanceType<typeof BlockRender> | null

export default BlockRender
