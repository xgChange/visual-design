import { NInputNumber } from 'naive-ui'
import { defineComponent, PropType, watch, ref, computed } from 'vue'

import styles from './style/PositionController.module.scss'

export type PositionType = {
  top: number
  left: number
  right: number
  bottom: number
}

export default defineComponent({
  name: 'PositionController',
  props: {
    positionData: {
      type: Object as PropType<PositionType>,
      default() {
        return { top: 0, left: 0, right: 0, bottom: 0 }
      }
    }
  },
  emits: ['update:positionData'],
  setup(props, { emit }) {
    const innerData = computed({
      get() {
        return props.positionData
      },
      set(v) {
        emit('update:positionData', v)
      }
    })

    // 目的是为了触发 update innerData
    function handleUpdateData(v: number | null, option: keyof PositionType) {
      if (v !== null) {
        innerData.value = { ...innerData.value, [option]: v }
      }
    }
    return () => {
      return (
        <div class={styles.positionControllerContainer}>
          <NInputNumber
            placeholder="top px"
            class={styles.top}
            value={innerData.value.top}
            onUpdateValue={v => handleUpdateData(v, 'top')}
          />
          <NInputNumber
            placeholder="left px"
            class={styles.left}
            value={innerData.value.left}
            onUpdateValue={v => handleUpdateData(v, 'left')}
          />
          <NInputNumber
            placeholder="right px"
            class={styles.right}
            value={innerData.value.right}
            onUpdateValue={v => handleUpdateData(v, 'right')}
          />
          <NInputNumber
            placeholder="bottom px"
            class={styles.bottom}
            value={innerData.value.bottom}
            onUpdateValue={v => handleUpdateData(v, 'bottom')}
          />
        </div>
      )
    }
  }
})
