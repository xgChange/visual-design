import { App, Component } from 'vue'

function create(components: Component[], prefix = 'V') {
  function registerComponent(app: App, name: string, com: any) {
    const registed = app.component(prefix + name)
    if (!registed) {
      app.component(prefix + name, com)
    }
  }

  function install(app: App): void {
    components.forEach(com => {
      registerComponent(app, com.name as string, com)
    })
  }

  return {
    install
  }
}

export default create
