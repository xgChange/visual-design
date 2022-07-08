import { createApp } from 'vue'
import App from './App.vue'
import Shared from '@visual/shared'
import VdComponent, { create } from '@visual/components'

console.log(Shared.msg, VdComponent, create())
// css & fonts
import './assets/style/index'

createApp(App).mount('#app')
