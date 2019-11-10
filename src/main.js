// with polyfills
import 'core-js/stable'
import 'regenerator-runtime/runtime'

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/'
import { VueAxios } from './utils/request'

// permission
import permissionStore from '@/store/modules/permission'
// import permissionStore from '@/store/modules/async-router'
import i18nStore from '@/store/modules/i18n'
import '@/components/global.less'

// mock
// WARNING: `mockjs` NOT SUPPORT `IE` PLEASE DO NOT USE IN `production` ENV.
import './mock'

import bootstrap from './core/bootstrap'
import './core/lazy_use'
import './permission' // permission control
import './utils/filter' // global filter
import i18n from './locales'

store.registerModule('permission', permissionStore)
store.registerModule('i18n', i18nStore)

Vue.config.productionTip = false

// mount axios Vue.$http and this.$http
Vue.use(VueAxios)

new Vue({
  router,
  store,
  i18n,
  created: bootstrap,
  mounted () {
    Vue.ls.get('lang') && store.dispatch('SetLang', Vue.ls.get('lang'))
  },
  render: h => h(App)
}).$mount('#app')
