import Vue from 'vue'
import App from './App.vue'
import router from './docker/vitae/index'
import store from './docker/cords/store/index'
import './config/registerServiceWorker'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
