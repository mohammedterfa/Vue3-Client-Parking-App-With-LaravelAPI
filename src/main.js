import "@/bootstrap.js";

import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import ValidationError from "@/components/ValidationError.vue";

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.component("ValidationError", ValidationError);

app.mount('#app')
