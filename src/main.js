// The Vue build version to load with the `import`  command 
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import 'babel-polyfill' 
import App from './App'
import router from './router'
import store from './store'
import { mapGetters } from 'vuex'
import * as socketApi  from '@/js/sockt'

Vue.config.productionTip = false
Vue.prototype.socketApi = socketApi

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
  created() {
    // 获取access token
    store.dispatch('getAccessToken')
    .then(res => {
      // if(res == 404){
      //   this.$router.push('/page404');
      //   console.log('404')
      // }
      // if(res == 408) {
      //   this.$router.push('/page408');
      // }
    });
  },
  computed: {
    ...mapGetters(['baseSettingSys'])
  },
  watch: {
    baseSettingSys:function(){
      this.socketApi.initWebSocket(this.baseSettingSys.websocket_client);
      this.socketApi.sendSock('test',this.getConfigResult);   
    }
  },
  methods: {
    getConfigResult(result){
      if(result.type == 'lottery_data'){
        store.commit('SOCKET_OPEN_RESULT', result.data)
      }
      if(result.type == 'max_forecast_plan'){
        store.commit('SOCKET_PLAN_RESULT', result.data)
      }
      if(result.type == 'next_open_time') {
        store.commit('SOCKET_UPDATE_TIME', result.data)
      }
    }
  }
})
