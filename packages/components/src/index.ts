import create from './create'
import components from './components'

export * from './components'

export type { ComEditorPropType, ComEditorPropsValueType } from './types'

export { ComEditorWidgetType } from './types'

export const VComponentAll = Object.keys(components).map(
  key => components[key as keyof typeof components]
)

export type VComponentType = typeof VComponentAll[number]

export default create(VComponentAll)
