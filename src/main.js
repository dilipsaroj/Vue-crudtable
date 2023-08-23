import './assets/main.css'
import Antd from "ant-design-vue";
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'

const app = createApp(App)

app.use(createPinia())
app.use(Antd)
app.mount('#app')
