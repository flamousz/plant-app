import { createApp, markRaw } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'

import './assets/main.css'

const app = createApp(App)
const pinia = createPinia()

app.component('VueDatePicker', VueDatePicker);
pinia.use(({ store }) => {
store.router = markRaw(router)
})

app.use(router)
app.use(pinia)



app.mount('#app')
