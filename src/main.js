import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import naive from 'naive-ui'

import element from 'element-plus'
import 'element-plus/dist/index.css'

import { QuillEditor } from "@vueup/vue-quill";
import '@vueup/vue-quill/dist/vue-quill.snow.css'

createApp(App)
  .use(router)
  .use(store)
  .use(naive)
  .use(element)
  .component('QuillEditor', QuillEditor)
  .mount('#app')
