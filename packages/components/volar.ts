declare module 'vue' {
  export interface GlobalComponents {
    VButton: typeof import('asam-visual-components').VButton
    VImage: typeof import('asam-visual-components').VImage
  }
}

export {}
