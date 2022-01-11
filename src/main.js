import { createApp } from 'vue'
import naive from 'naive-ui'
import App from './App.vue'
import router from './router'
import store from './store'


createApp(App).use(router)
  .use(naive)
  .use(store)
  .mount('#app')
