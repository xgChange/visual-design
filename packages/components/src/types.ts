export interface SlotEventType {
  type: string
  alias: string
}

export type ExtendedProperty = {
  preview: () => JSX.Element
  slots: SlotEventType[]
  events: SlotEventType[]
}

// 编辑组件prop的类型
export const enum ComEditorWidgetType {
  INPUT = 'input',
  INPUTNUMBER = 'inputNumber',
  COLOR = 'color',
  SELECT = 'select',
  SWITCH = 'switch',
  CONTROLLINPUT = 'controllInput'
}

export type NativeConstructorType =
  | StringConstructor
  | NumberConstructor
  | BooleanConstructor

export type SelectOptionItemType = { label: string; value: string }

export interface ComEditorPropsValueType {
  type: NativeConstructorType | NativeConstructorType[] // prop 的类型
  widgetType: ComEditorWidgetType
  defaultValue: string | number | Record<string, any>
  alias: string
  options?: SelectOptionItemType[]
}

export type ComEditorPropType<T> = {
  [k in keyof T]: ComEditorPropsValueType
}

export type StyleValueGroup = {
  positionGroup: {
    top: number
    left: number
    right: number
    bottom: number
  }
}

export const styleValueGroup = 'positionGroup'