<!-- 首页彩票卡片 -->
<template>
    <div class="lottery-card">
        <div class="top" v-if="filterData.length != 1">
            <tab :line-width=2 active-color='#51a4fb'>
                <tab-item v-for="(item, index) in filterData" :key="index" :selected="curCodeType == item.code_type" @on-item-click="curCodeType = item.code_type">{{item.code_title}}</tab-item>
            </tab>
        </div>
        <div class="box" ref="outerWrapper">
            <ul>
                <li class="item" v-for="(obj, key) in lotteryCodes" :key="key" v-show="curCodeType == 'hot' ? obj.is_hot == 1 : curCodeType == obj.code_type">
                    <div>
                        <LotteryInfo :result="obj"/>
                    </div>
                    <div class="bottom">
                        <p v-show="obj.is_history_data == 1" @click="goToSecondDetail(obj.code, obj.code_type, '/second-detail/history')">开奖记录</p>
                        <p v-show="obj.is_long_dragon == 1" @click="goToSecondDetail(obj.code, obj.code_type, '/second-detail/trend-line')">长龙统计</p>
                        <p v-show="obj.is_sides_total == 1" @click="goToSecondDetail(obj.code, obj.code_type, '/second-detail/two-sided')">双面统计</p>
                        <p v-show="obj.is_forecast_rule == 1" @click="goToSecondDetail(obj.code, obj.code_type, '/second-detail/plan')">专家计划</p>
                        <a :href="url" class="open">开户投注</a>
                    </div>
                </li>
            </ul>
        </div>
    </div>    
</template>

<script>
import LotteryInfo from './LotteryInfo'
import { mapGetters, mapActions } from "vuex";
import { formatTime } from "@/js/utils";
import { Tab, TabItem } from 'vux'
import BScroll from 'better-scroll';

export default {
   components: { LotteryInfo, Tab, TabItem },
   data() {
       return {
            curCodeType: 'hot',
            curSelectTime: new Date()
       }
   },
   computed: {
       ...mapGetters(["lotteryCodes", "baseSettingLotteryData"]),
        // 过滤相同数据
        filterData() {
            let obj = {};
            let arr = this.lotteryCodes.reduce(function(item, next) {
                obj[next.code_type]
                    ? ""
                    : (obj[next.code_type] = true && item.push(next));
                    return item;
                }, []);
                arr.unshift({code_title:'热门',code_type:'hot'})
                return arr
        },
        url() {
            return this.baseSettingLotteryData.open_account_url
        }
   },
   methods: {
        ...mapActions([
            "getLotteryCodes",
            "chengecurLotteryCode",
            "chenge_cur_lootery_type"
        ]),
        goToSecondDetail(code, type, path) {
            // 修改开奖记录的无数据状态
            this.$store.commit('NO_CONTENT', false)
            // 修改彩种的code
            this.chengecurLotteryCode(code);
            // 修改彩种的type
            this.chenge_cur_lootery_type(type);
            this.$router.push({path: path})
       }
   },
   mounted() {
       this.getLotteryCodes()
       this.$nextTick(() => {
            if(!this.scroll) {
                this.scroll = new BScroll(this.$refs.outerWrapper,{click: true})               
            }else {
                this.scroll.refresh()
            }
        })
   },
   watch: {

   }
}
</script>

<style scoped lang="scss">
    .lottery-card{
        width: 100%; 
        // max-width: 640px;
        .top{
            position: fixed;top: 50px;left: 0;height: 50px;background: #fff;line-height: 50px;width: 100%; 
            // max-width: 640px;
        }
        .box{
            position: absolute;top: 95px;left: 0;right: 0;bottom: 0;overflow: hidden;
            .item{
                background: #fff;border-bottom: 1px solid #e6e6e6;
                .bottom{
                    display: flex;justify-content: flex-start;padding: 6px 10px;
                    p{
                        font-size: 12px;padding: 3px 5px;border: 1px solid #eee;border-radius: 5px;margin-right: 5px;color: #777;
                    }
                    .open{background: #e73f3f; color: #fff;border: none; padding: 3px 6px;font-size: 12px;border-radius: 5px;}
                }
            }
        } 
    }
</style>
