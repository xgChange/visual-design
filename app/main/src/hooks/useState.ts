import { ref, Ref } from 'vue'

export function useState<T>(state?: T | (() => T)): [Ref<T>, (val: T) => void] {
  const defaultState =
    typeof state === 'function' ? (state as () => T)() : state

  const innerState = ref(defaultState) as Ref<T>

  function setState(newValue: T) {
    innerState.value = newValue
  }

  return [innerState, setState]
}
