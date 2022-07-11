import create from './create'
import * as components from './components'

export * from './components'

export const componentsAll = Object.keys(components).map(
  key => components[key as keyof typeof components]
)

export default create(componentsAll)
