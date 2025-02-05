import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './styles/index.css'
import { useREM } from './utils/flexible'
import mLibs from '@/libs'
import 'virtual:svg-icons-register'
import store from '@/store/index'
import { useThemeChange } from './utils/theme'
import myDirectives from '@/directives'
import '@/premission'

useREM()
useThemeChange()

createApp(App).use(router).use(store).use(mLibs).use(myDirectives).mount('#app')
