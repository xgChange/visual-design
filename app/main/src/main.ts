import { createApp } from 'vue'
import App from './App.vue'
import store from './store'

// css & fonts
import './assets/style/index'

createApp(App).use(store).mount('#app')
