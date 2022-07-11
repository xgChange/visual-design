import * as Demo from './demo'

const DemoComponets = Object.keys(Demo).map(
  key => Demo[key as keyof typeof Demo]
)

export const componentList = DemoComponets
