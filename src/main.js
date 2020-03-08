import Vue from 'vue'
import App from './App.vue'
import router from './router/index.js'  // 引入路由
import { Button, Field, Uploader, Toast, Image } from 'vant';
// 设置rem
import '@/common/adaptive.js'
import 'vant/lib/index.css';
// 微信分享自定义
import {weixinInit} from '@/common/wxinit.js';
// 插件
Vue.use(Button);
Vue.use(Field);
Vue.use(Uploader);
Vue.use(Toast);
Vue.use(Image);

Vue.mixin(weixinInit);

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount("#app")