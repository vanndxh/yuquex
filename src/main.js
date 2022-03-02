import { createApp } from 'vue'
import naive from 'naive-ui'
import App from './App.vue'
import router from './router'
import store from './store'
import element from 'element-plus'
import 'element-plus/dist/index.css'

createApp(App)
  .use(router)
  .use(store)
  .use(naive)
  .use(element)
  .mount('#app')
