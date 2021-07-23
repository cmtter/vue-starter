import Vue from 'vue'
import App from './App.vue'
import routes from '../.joyin/routes'
import VueCompositionAPI from '@vue/composition-api'
import Router from 'vue-router'
import Vuex from 'vuex'
import store from '@/store'
import { Loading, MessageBox, Notification, Message } from 'element-ui'
import appConfig from '../app.config'
import 'proxy-polyfill/proxy.min';
import 'normalize.css/normalize.css'

Vue.config.productionTip = false

// 注入
Vue.use(Vuex)
//注入VueCompositionAPI
Vue.use(VueCompositionAPI)
// 注入路由
Vue.use(Router)
//注入配置
Vue.mixin({
  beforeCreate: function () {
    this.$appconfig = appConfig
  }
});
const router = new Router({
  scrollBehavior: () => ({ y: 0 }),
  routes: routes
})

//注册element-ui常用api
Vue.prototype.$loading = Loading.service;
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$prompt = MessageBox.prompt;
Vue.prototype.$notify = Notification;
Vue.prototype.$message = Message;

//全局开放
window._jstore_ = store
window._jrouter_ = router
window._jappconfig_ = appConfig
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')