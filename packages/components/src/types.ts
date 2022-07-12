export interface SlotEventType {
  type: string
  alias: string
}

export type ExtendedProperty = {
  preview: () => JSX.Element
  slots: SlotEventType[]
  events: SlotEventType[]
}
