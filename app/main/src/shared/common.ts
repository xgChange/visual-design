import { NativeConstructorType } from '@visual/components'
import { customAlphabet } from 'nanoid'

export const createArray = <T>(arr?: T[]) => (arr?.length ? arr : ([] as T[]))

export const generateNanoId = customAlphabet('1234567890abcdef', 10)

export const NOOP = () => {}

export type Data<T = unknown> = Record<string, T>

// 校验字段，并重新赋值
export const validateField = (
  value: string,
  rule: NativeConstructorType | NativeConstructorType[]
) => {
  let realRule = rule
  if (Array.isArray(realRule)) {
    realRule = realRule[0]
  }
  if (realRule === Number) {
    if (isNaN(Number(value))) {
      return undefined
    }
  } else if (realRule === String) {
    if (String(value) !== value) {
      return undefined
    }
  } else if (realRule === Boolean) {
    if (isNaN(Number(value))) {
      return undefined
    }
  }

  return realRule(value)
}
