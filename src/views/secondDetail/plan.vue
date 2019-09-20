<!-- 计划 -->
<template>
    <div class="plan">
        <tab :line-width=2 active-color='#51a4fb'>
            <tab-item class="vux-center" :selected="activeTab === item.name" v-for="(item, index) in forecastRanking" @on-item-click="onItemClick(item.name)" :key="index">{{item.name}}码榜</tab-item>
        </tab>
        <div class="container" ref="outerWrapper">
            <div>
                <div v-show="activeTab == list.name" v-for="(list, index) in forecastRanking" :key="index">
                    <ul>
                        <li class="title">
                            <p>专家名称</p>
                            <p>车道</p>
                            <p>码数</p>
                            <p>成绩</p>
                            <p>胜率</p>
                            <p>盈利</p>
                            <p>操作</p>
                        </li>
                        <li class="content" v-for="(item, index) in list.list" :key="index + 'b'" @click="goPlanInfo(item.expert_id, item.forecast_quantity, item.location_key)">
                            <p>{{item.name}}</p>
                            <p>{{item.location}}</p>
                            <p>{{item.forecast_quantity}}码</p>
                            <p>{{item.last_sum}}中{{item.result_sum}}</p>
                            <p class="result">{{Math.floor(item.result * 10000) / 100}}%</p>
                            <p class="profit">{{Math.round(item.profit)}}</p>
                            <p>查看</p>
                        </li>
                    </ul>
                </div>
            </div>          
        </div>
    </div>
</template>

<script>
import { Tab, TabItem } from 'vux'
import { mapGetters, mapActions } from "vuex";
import { formatTime } from "@/js/utils";
import BScroll from 'better-scroll';

export default {
    components: { Tab, TabItem },
    data() {
        return {
            activeTab: 0,
            curSelectTime: new Date()
        }
    },
    computed: {
        ...mapGetters(["curLotteryCode", "forecastRanking"])
    },
    methods: {
        onItemClick(name) {
            this.activeTab = name
        },
        /**
         * expert_id: 專家ID
         * forecast_quantity: 规则(几碼)
         * location: 名次
         * name: 專家名
         */
        goPlanInfo(expertId, forecastQuantity, location) {
            this.$store.commit('NUMBER_PLAN_PARAMS', { expertId, location, forecastQuantity})
            this.$router.replace({path: '/second-detail/planInfo'})
        }
    },
    mounted() {
        this.$nextTick(() => {
            if(!this.scroll) {
                this.scroll = new BScroll(this.$refs.outerWrapper,{click: true})               
            }else {
                this.scroll.refresh()
            }
            // 判断 this.activeTab 是否为 0 选择第一个
            if(this.activeTab == 0 && this.forecastRanking.length != 0) {
                this.activeTab = this.forecastRanking[0].name
            }
        })
    },
    watch: {
        // 判断 this.activeTab 是否为 0 选择第一个
        forecastRanking() {
            if(this.activeTab == 0) {
                this.activeTab = this.forecastRanking[0].name
            }
        }
    }
}
</script>

<style lang="scss" scoped>
    .plan{
        .container{
            overflow: hidden;position:absolute;top: 204px;bottom: 10px;left: 0;right: 0;
            li{
                width: 100%;height: 41px;font-size: 13px;color: #777;box-sizing: border-box;border-bottom: 1px solid #f1f1f1;display: flex;align-items: center;
                P{text-align: center;}
                P:nth-child(1) {width: 18%;}
                P:nth-child(2) {width: 15%;}
                P:nth-child(3) {width: 10%;}
                P:nth-child(4) {width: 15%;}
                P:nth-child(5) {width: 15%;}
                P:nth-child(6) {width: 15%;}
                P:nth-child(7) {width: 12%;}
            }
            .title{
                background: #fbfbfb;color: #666;font-weight: bold;
            }
            .content:nth-child(odd){
                background: #f5f7fb
            }
            .content:nth-child(even){
                background: #fff
            }
            .content{
                .result{color: red}
                .profit{color: green}
            }
        }
    }
</style>
