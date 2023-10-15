import { createApp } from 'vue'

import App from '@/App.vue'
import vuetify from '@/plugins/vuetify'
import router from '@/routes'
import ApiService from './api/_api'
import store from './store';
import tokenService from './services/_token'
import VueSweetalert2 from '@/plugins/sweetalert'
import { QuillEditor } from '@/plugins/quill'


//Service Requests
ApiService.init(import.meta.env.VITE_BASE_URL)

if (tokenService.getToken()) {
    ApiService.setHeader(tokenService.getToken())
    ApiService.mount401Interceptor()
}

const app = createApp(App)

// import plugins
app.use(router)
app.use(store)
app.use(vuetify)
app.use(VueSweetalert2)
app.component('QuillEditor', QuillEditor)



app.mount('#app')
