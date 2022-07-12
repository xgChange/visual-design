import create from './create'
import components from './components'

export * from './components'

export const VComponentAll = Object.keys(components).map(
  key => components[key as keyof typeof components]
)

export default create(VComponentAll)
