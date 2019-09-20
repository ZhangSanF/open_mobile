<template>
  <div id="app">
    <Header/>
    <div class="main">
      <router-view/>
    </div>
    <!-- loading -->
    <div v-show="showLoading" class="modal">
      <loading :show="showLoading" text="loading..."></loading>
    </div>
     <!-- 推送 -->
    <div class="push">
      <p class="item" v-for="(item, index) in pushArr" :key="index">
        {{codesName[index]}}出现【{{item.last_count}}中{{item.result_sum}}】<span class="info" @click="goPlanInfo(item.code, item.code_type, item.expert_id, item.forecast_quantity, item.location)">查看</span> 
      </p>
    </div>
  </div>
</template>

<script>
import Header from '@/components/Header'
import { mapActions, mapGetters } from "vuex";
import { Loading  } from 'vux'

export default {
  components:{ Header, Loading },
  name: 'App',
  data() {
    return {
      pushArr: [],
      codesName: []
    }
  },
  created() {

  },
  methods: {
    ...mapActions(["getLotteryCodes", "chengecurLotteryCode", "chenge_cur_lootery_type"]),

    goPlanInfo(code, type, expertId, forecastQuantity, location) {
      // 修改彩种的code
      this.chengecurLotteryCode(code);
      // 修改彩种的type
      this.chenge_cur_lootery_type(type);
      this.$store.commit('NUMBER_PLAN_PARAMS', { expertId, location, forecastQuantity})
      this.$router.push({path: '/second-detail/planInfo'})
    },

    // 站点统计
    // parseDom(arg) {
    //   var objE = document.createElement("div");
    //   objE.innerHTML = arg;
    //   return objE.firstChild;
    // },
    // loadScript(dom) {
    //   var head = document.getElementsByTagName("head")[0];
    //   var script = document.createElement("script");
    //   script.type = "text/javascript";

    //   if (dom.src) {
    //     script.src = dom.src;
    //     head.appendChild(script);
    //   } else {
    //     document.body.appendChild(dom);
    //   }
    // }
  },
  computed: {
    ...mapGetters(['showLoading', 'socketPlanResult', 'lotteryCodes', 'baseSettingBase'])
  },
  mounted() {
    this.getLotteryCodes()
    // 监听浏览器切换事件,获取最新时间
    // let _this = this
    // document.addEventListener('visibilitychange',function() { 
    //   if(document.visibilityState == 'hidden') { //状态判断
    //     return 
    //   }else {
    //     _this.getLotteryCodes()
    //   }
    // });
  },
  watch: {
    socketPlanResult() {
      for(let item of this.lotteryCodes) {
        if(item.code == this.socketPlanResult.code) {
          if(item.is_forecast_rule == 1) {
            this.codesName.push(item.name)
            this.pushArr.push(this.socketPlanResult)
            // 推送最多显示三条
            if(this.pushArr.length > 3) {
              this.pushArr.shift()
            }
            if(this.codesName.length >3) {
              this.codesName.shift()
            }
          }
        }
      }
    },
    pushArr() {
      let _this = this
      setTimeout(() => {
        if(_this.pushArr.length != 0) {
          _this.pushArr.shift()
        }
        if(_this.codesName.length != 0) {
          _this.codesName.shift()
        }
      },10000)
    },
    // "baseSettingData.site_statis"() {
    //   this.$nextTick(() => {
    //     if (!this.baseSettingData.site_statis) return;
    //     var temp = this.baseSettingData.site_statis
    //       .replace(/&lt;+/g, "<")
    //       .replace(/&gt;+/g, ">");
    //     var dom = this.parseDom(temp);
    //     this.loadScript(dom);
    //   });
    // }
    // 站点统计
    'baseSettingBase.site_statis': {
      handler(val) {
        setTimeout(() => {
          let c = document.createElement('script');
          c.src = val;
          let s = document.getElementsByTagName('script')[0];
          s.parentNode.insertBefore(c, s);
        },2000)      
      }
    }
  }
}
</script>

<style lang="scss">
    #app {
      // max-width: 640px;
      .main{
        width: 100%; padding-top: 50px;padding-bottom: 10px;
      }
      .modal{
        position: fixed;top: 0;left: 0;bottom: 0;right: 0;background: rgba(0,0,0,.5);z-index: 200;
        .weui-toast{
          top: 50%;transform:translate(0, -50%)
        }
      }
      .push{
        position:fixed;bottom: 5px;left: 50%;transform: translate(-50%, 0);color: #fff;
        .item{
          padding: 5px 10px;margin-bottom: 5px;background: rgba(0,0,0,.6);border-radius: 5px;text-align: center; white-space:nowrap;font-size: 14px;
          .info{color: #FFFF00;}       
        }
        .item:last-child{
          margin-bottom: 0;
        }
      }
    }
</style>
