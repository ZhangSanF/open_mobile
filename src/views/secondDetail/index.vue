<template>
    <div @click="closeDrawerTba">
        <div class="lotteryInfo" v-for="(obj, index) in lotteryCodes" :key="index">
            <LotteryInfo  :result="obj" v-show="obj.code == curLotteryCode"/>
            <tab :line-width=2 active-color='#51a4fb' v-show="obj.code == curLotteryCode">
                <tab-item v-if="obj.is_history_data == 1" class="vux-center" :selected="path == '/second-detail/history'" @on-item-click="onItemClick('/second-detail/history')">开奖记录</tab-item>
                <tab-item v-if="obj.is_long_dragon == 1" class="vux-center" :selected="path == '/second-detail/trend-line'" @on-item-click="onItemClick('/second-detail/trend-line')">长龙统计</tab-item>
                <tab-item v-if="obj.is_sides_total == 1" class="vux-center" :selected="path == '/second-detail/two-sided'" @on-item-click="onItemClick('/second-detail/two-sided')">双面统计</tab-item>
                <tab-item v-if="obj.is_forecast_rule == 1" class="vux-center" :selected="path == '/second-detail/plan'" @on-item-click="onItemClick('/second-detail/plan')">专家计划</tab-item>
            </tab>
        </div>      
        <div class="second-views">
            <div>
                <router-view/>
            </div>
        </div>
        <div class="tab-drawer" v-show="showDrawerTba">
            <ul>
                <li class="item" v-for="(item, index) in filterData" :key="index">
                    <div class="title">{{item.code_title}}</div>
                    <div class="info">
                        <p :class="obj.code == curLotteryCode ? 'active' : ''" @click="goTo(obj.code, obj.code_type)" v-for="(obj, key) in lotteryCodes" :key="key" v-show="item.code_title == obj.code_title">{{obj.name}}</p>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import LotteryInfo from '@/components/lotterydetail/LotteryInfo'
import { Tab, TabItem } from 'vux'
import { mapGetters, mapActions, mapState } from "vuex";
import { formatTime } from "@/js/utils";

export default {
    components: { LotteryInfo, Tab, TabItem },
    data() {
        return {
            path: '',
            curSelectTime: new Date(),
            page_size: 30,
            page: 1
        }
    },
    created() {
        this.getLotteryCodes()
    },
    methods: {
        ...mapActions([
            'getLotteryCodes',
            'chengecurLotteryCode', 
            'chenge_cur_lootery_type', 
            "getLotteryData", 
            "getLongDragon",
            "getSidesTotal", 
            "getForecastRanking"
        ]),
        onItemClick (path) {
            this.$router.replace({path: path})
        },
        unifyAjax() {
            //历史记录
            this.getLotteryData({
                open_date: formatTime(this.curSelectTime, "YYYY-MM-DD"),
                page_size: this.page_size,
                page: this.page,
                code: this.curLotteryCode
            })
            for(let item of this.lotteryCodes) {
                if(item.code == this.curLotteryCode) {
                    // 长龙
                    if(item.is_long_dragon == 1) {
                        this.getLongDragon({ code: this.curLotteryCode });
                    }
                    // 双面统计
                    if(item.is_sides_total == 1) {
                        this.getSidesTotal({
                            open_date: formatTime(this.curSelectTime, "YYYY-MM-DD"),
                            code: this.curLotteryCode
                        });
                    }
                    //预测计划-排行榜(首页)
                    if(item.is_forecast_rule == 1) {
                        this.getForecastRanking({code: this.curLotteryCode});
                    }
                }
            }          
        },
        goTo(code, type) {
            this.$store.commit('SHOW_DRAWER_TAB', false)
            this.$store.commit('NO_CONTENT', false)
            this.chengecurLotteryCode(code);
            this.chenge_cur_lootery_type(type);
            this.$router.replace({path: '/second-detail/history'})
        },
        closeDrawerTba() {
            this.$store.commit('SHOW_DRAWER_TAB', false)
        }
    },
    computed: {
        ...mapGetters(["curLotteryCode", "socketOpenResult", "lotteryCodes", "showDrawerTba"]),
        // 过滤相同数据
        filterData() {
            let obj = {};
            let arr = this.lotteryCodes.reduce(function(item, next) {
                obj[next.code_type]
                    ? ""
                    : (obj[next.code_type] = true && item.push(next));
                    return item;
                }, []);
                // console.log(arr)
                return arr
        }
    },
    watch: {
        lotteryCodes() {
            this.unifyAjax()
        },
        socketOpenResult:function() {       
            if(this.socketOpenResult.code == this.curLotteryCode){
                this.$store.commit('NO_CONTENT', false)
                this.unifyAjax()
            }
        },
        // 路由變化到計劃詳情 把 this.path = '/second-detail/plan' 用於 tab 選中專家計劃
        $route(to, from) {
            this.path = to.path
            if( this.path == '/second-detail/planInfo') {
                this.path = '/second-detail/plan'
            }
        },
        // 彩種變化時發起請求
        curLotteryCode() {
            this.unifyAjax()
        }
    },
    mounted() {
        this.path = this.$route.path
        if( this.path == '/second-detail/planInfo') {
            this.path = '/second-detail/plan'
        }
    }
}
</script>

<style lang="scss" scoped>
    .tab{
        display: flex
    }
    .second-views{
        padding-top: 44px
    }
    .tab-drawer{
        width: 100%;position: fixed;top: 50px;bottom: 0;
        .item{
            display: flex;padding: 10px;border-bottom: 1px solid #e6e6e6;line-height: 22px;background: #fff;overflow: hidden;
            .title{
                width: 20%;font-size: 15px;
            }
            .info{
                width: 80%;
                p{
                    margin-right: 25px;color: #999;font-size: 13px;display: inline-block;padding:0 5px;border-radius: 5px;
                }
                .active{
                    color: #fff;background: #51a4fb;
                }
            }
        }
    }
</style>
