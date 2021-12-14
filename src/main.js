import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import './plugins/element'
import myAxios from './api/axios'
import './mock/mock'
import  * as echarts from 'echarts'
import '../public/css/global.css'

Vue.prototype.$http = myAxios
Vue.prototype.$echarts = echarts

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
