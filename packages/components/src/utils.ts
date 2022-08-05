import {
  ComEditorPropsValueType,
  NativeConstructorType,
  SelectOptionItemType
} from './types'

export type Valueof<T> = T[keyof T]

export function createEditorPropsFactory<T>(
  prop: T,
  alias: string
) {
  let realType: T | NativeConstructorType = String
  if (!(prop as any).type) {
    if (typeof prop === 'function') {
      realType = prop
    }
  } else {
    realType = (prop as any).type
  }

  return (...args: Valueof<ComEditorPropsValueType>[]) => {
    const result = {
      type: realType,
      alias,
      defaultValue: args[0],
      widgetType: args[1],
      options: args[2]
    } as ComEditorPropsValueType
    return result
  }
}

export function createSelectionFactory<T>(
  arr: T[],
  callback: (item: T, index: number, arr: T[]) => SelectOptionItemType
) {
  return arr.map((item, index, arr) => callback(item, index, arr))
}
