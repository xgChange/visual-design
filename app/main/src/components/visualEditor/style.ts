/**
 * @description 关于 组件样式的相关处理
 */

import { Data, PropValueType } from '@/shared'
import { CSSProperties, StyleValue } from 'vue'
import { styleValueGroup } from 'asam-visual-components'

export function formatComStyle(prop: any, key: string, value: PropValueType) {
  // 判断是否有 单位，例如 px、vw 等
  const unit = prop.unit
  if (unit) {
    if (key === styleValueGroup) {
      return Object.keys(value as Record<any, any>).reduce((cur, next) => {
        cur[next] = `${(value as Record<any, any>)[next]}${unit}`
        return cur
      }, {} as any)
    }
    return `${value}${unit}`
  }

  return value
}

// 处理 style 的 value 是object的, eg: position: {top: 1}
export function handleStyleObject(style: Data<any>) {
  Object.keys(style).forEach(key => {
    if (typeof style[key] === 'object') {
      Object.keys(style[key]).forEach(subk => {
        style[subk] = style[key][subk]
      })
      delete style[key]
    }
  })

  return style
}

export const preComStyle: StyleValue = {
  position: 'relative'
}

export const coverComStyleByEdit: (keyof CSSProperties)[] = [
  'top',
  'bottom',
  'left',
  'right',
  'cursor'
]

// 这个是 Com 外面那个盒子
export function getOuterBoxStyle(styles: Data<string>) {
  const result = {} as Data<string>
  coverComStyleByEdit.forEach(key => {
    result[key] = styles[key]
  })
  return result
}

// 在编辑的时候，因为 Com 上面会有一个盒子，导致将style全设置到Com上会出现样式的问题，所以拆开
export function getComStyle(styles: Data<string>) {
  const res = {} as Data<string>

  Object.keys(styles).forEach(key => {
    if (!coverComStyleByEdit.includes(key as any)) {
      res[key] = styles[key]
    }
  })
  return res
}
