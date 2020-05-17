// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vant from 'vant';
import 'vant/lib/index.css';
import Vui from './api/Vui'
import './style/public.less'
import './style/base.less'
import http from './api/http'
import { Picker } from 'mint-ui';
import 'mint-ui/lib/style.css';
import wx from './api/wx'
Vue.use(Vant);
Vue.component(Picker.name, Picker);
Vue.use(Vui);
Vue.use(http);
Vue.use(wx);
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})


