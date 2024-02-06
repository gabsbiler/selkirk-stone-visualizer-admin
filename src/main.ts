/* eslint-disable import/order */
import '@/@iconify/icons-bundle'
import App from '@/App.vue'
import layoutsPlugin from '@/plugins/layouts'
import vuetify from '@/plugins/vuetify'
import { loadFonts } from '@/plugins/webfontloader'
import router from '@/router'
import '@core/scss/template/index.scss'
import '@styles/styles.scss'
import { createPinia } from 'pinia'
import { createApp } from 'vue'
import Skeleton from 'vue-loading-skeleton'
import 'vue-loading-skeleton/dist/style.css'

loadFonts()

// Create vue app
const app = createApp(App)

app.config.compilerOptions.isCustomElement = tag => tag === 'Button'

// Use plugins
app.use(vuetify)
app.use(createPinia())
app.use(router)
app.use(layoutsPlugin)
app.use(Skeleton)

// Mount vue app
app.mount('#app')
