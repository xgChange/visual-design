import { Data, NOOP } from '@/shared'
import { computed, reactive, ref, onScopeDispose, Ref, watchEffect } from 'vue'

type ArgsNOOP = (...args: any[]) => void

/**
 * @description 拖动改变元素大小
 * target 和 proxyRef
 */
export function useDragSetEleSize(comRef: Ref<any>, proxyRef?: Ref<any>) {
  // 在当前元素上，鼠标按下时的事件

  let elMousedown: ArgsNOOP = NOOP

  let elMouseMove: ArgsNOOP = NOOP

  let mouseUp = NOOP

  let mouseMove: ArgsNOOP = NOOP

  const dragStyle = reactive<Data<string>>({})

  const sideOffset = 2

  const moveOffset = ref({
    x: 0
  })

  // 移动后的 宽度，更新的 target
  const moveAfterWidth = computed(() => {
    const ele = comRef.value?.$el
    return (
      (moveOffset.value.x + ele?.getBoundingClientRect?.()?.width) >> 0 || 0
    )
  })

  const isSetSizeDrag = ref(false)

  // 是否在 range 范围内
  function isInRange(num: number, range: number[]) {
    return num >= range[0] && num <= range[1]
  }

  // 判断 point 是否在上述的 side 中
  function isSideContainPoint(point: number[], sides: number[][][]) {
    const [x, y] = point
    for (let s = 0, length = sides.length; s <= length; s++) {
      const side = sides[s]
      if (side?.length) {
        if (isInRange(x, side[0]) && isInRange(y, side[1])) {
          return true
        }
      }
    }
    return false
  }

  watchEffect(() => {
    const ele = proxyRef ? proxyRef.value : comRef.value?.$el
    console.log('watch', ele)
    if (ele) {
      const getDragSide = function () {
        const ele = proxyRef ? proxyRef.value : comRef.value?.$el
        const {
          x: eleRecX,
          width: eleRecW,
          y: eleRecY,
          height: eleRecH
        } = ele.getBoundingClientRect()
        // 上 边线 给一个高度为 2
        const topSide = [
          [eleRecX, eleRecX + eleRecW],
          [eleRecY - sideOffset, eleRecY + sideOffset]
        ]

        // 右边
        const rightSide = [
          [topSide[0][1] - sideOffset, topSide[0][1] + sideOffset],
          [eleRecY, eleRecY + eleRecH]
        ]
        return {
          topSide,
          rightSide
        }
      }

      elMousedown = (e: any) => {
        const { x, y } = e
        const topSide = getDragSide().topSide
        const rightSide = getDragSide().rightSide
        if (isSideContainPoint([x, y], [topSide, rightSide])) {
          isSetSizeDrag.value = true
          ele.setAttribute('draggable', false)
        }
      }

      elMouseMove = (e: any) => {
        const { x, y } = e
        const topSide = getDragSide().topSide
        const rightSide = getDragSide().rightSide
        if (isSideContainPoint([x, y], [topSide, rightSide])) {
          dragStyle.cursor = 'e-resize'
        } else {
          dragStyle.cursor = 'move'
        }
      }

      mouseUp = () => {
        if (isSetSizeDrag.value) {
          isSetSizeDrag.value = false
          ele.setAttribute('draggable', true)
        }
      }

      mouseMove = (e: any) => {
        const el = comRef.value?.$el
        if (el) {
          const rect = el.getBoundingClientRect()
          // 处理 宽度
          const curWidth = rect.x + rect.width
          if (isSetSizeDrag.value) {
            moveOffset.value.x = e.x - curWidth
          }

          dragStyle.width = moveAfterWidth.value + 'px'
        }
      }
      // 当前元素上 鼠标按下的事件
      ele.addEventListener('mousedown', elMousedown)

      // 在当前元素上，鼠标移动时的事件
      ele.addEventListener('mousemove', elMouseMove)

      // document上 监听鼠标抬起时的事件
      document.addEventListener('mouseup', mouseUp)

      // document上 监听鼠标移动的事件
      document.addEventListener('mousemove', mouseMove)
    }
  })

  // 这个会在 scopeEffect stop 时调用
  onScopeDispose(() => {
    console.log('dispose', comRef.value)
    const ele = comRef.value?.$el
    ele.removeEventListener('mousedown', elMousedown)
    ele.removeEventListener('mousemove', elMouseMove)
    document.removeEventListener('mouseup', mouseUp)
    document.removeEventListener('mouseMove', mouseMove)
  })

  return {
    dragStyle,
    moveAfterWidth,
    isSetSizeDrag
  }
}
