import App from './App.vue'
import store from './store'
import router from './router'
import { createApp } from 'vue'
import './assets/iconfont/iconfont.css'
import 'highlight.js/styles/base16/zenburn.css'

const app = createApp(App)
app.use(router)
  .use(store)
  .use(hljs.vuePlugin)
  .use(ElementPlus)
  .mount('#app')

//自定义指令v-highlight
app.directive('highlight',function (el) {
  let blocks = el.querySelectorAll('pre code');
  blocks.forEach((block)=>{
    hljs.highlightElement(block)
  })
})
