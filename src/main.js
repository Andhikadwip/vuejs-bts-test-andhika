import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// ELEMENT UI
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
// import 'element-ui/lib/locale/lang/en'
import lang from 'element-ui/lib/locale/lang/id'
import locale from 'element-ui/lib/locale'


// vuesax
import Vuesax, {vsButton } from 'vuesax'
import 'vuesax/dist/vuesax.css' //Vuesax styles
Vue.use(Vuesax, {
  vsButton
})

import 'boxicons/css/boxicons.min.css'

// configure language
locale.use(lang)

Vue.use(ElementUI);

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'


// SWEETALERT
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

Vue.use(VueSweetalert2);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
