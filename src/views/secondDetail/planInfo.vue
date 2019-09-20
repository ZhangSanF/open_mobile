<!-- 计划 -->
<template>
    <div class="plan-info">
        <div class="tab">
            <p class="location" @click="selectLocation(index+1)" v-for="(item, index) in locationName" :key="index" :class="index+1 == location ? 'active' : ''">
                {{item.length == '3' ? item.slice(1, 2) : item.slice(0, 1)}}
                <transition name="fade">
                    <span class="line" v-show="index+1 == location"></span>
                </transition>   
            </p>
        </div>
        <div class="tab">
            <p class="forecast-qantity" @click="selectForecastQuantity(item)" v-for="(item, index) in planData.forecast_quantity_list" :key="index" :class="item == forecastQuantity ? 'active' : ''">
                {{item}}码榜
                <transition name="fade">
                    <span class="line" v-show="item == forecastQuantity"></span>
                </transition>   
            </p>           
        </div>
        <div class="content" ref="outerWrapper">
            <div>
                <div class="top">专家: <span v-for="(item, index) in planData.expert_list" :key="index" v-show="item.id == expertId">{{item.name}}</span> 1天/{{planData.wheel_quantity}}轮 1轮/{{planData.wheel_expect_quantity}}期 <span class="refresh" @click="refresh">刷新页面</span></div>
                <ul v-for="(item, index) of planData.expert_forecast_data_list" :key="index">
                    <li class="title">第{{planData.expert_forecast_data_list.length - index}}轮  待开奖:{{calcOopenNumToTal(item).noOpen}}  中:{{calcOopenNumToTal(item).win}}  挂:{{calcOopenNumToTal(item).noWin}}  胜率:{{calcOopenNumToTal(item).winPro}}</li>
                    <li class="item">
                        <p>期</p>
                        <p>轮次</p>
                        <p>期号</p>
                        <p>预测</p>
                        <p>开奖</p>
                        <p>结果</p>
                        <p>盈利</p>
                    </li>
                    <li class="item" v-for="(obj, key) in item" :key="key">
                        <p>{{item.length - key}}</p>
                        <p>第{{planData.expert_forecast_data_list.length - index}}轮</p>
                        <p>{{obj.expect.slice(-4)}}</p>
                        <p>
                            <span :style="{color: obj.open_number == temp ? 'red' : ''}" v-for="(temp,k) in obj.forecast_numbers" :key="k"><template v-if="k!=0">,</template>{{temp}}</span>
                        </p>
                        <p>
                            <span v-if="obj.status == 0">待开</span>
                            <span v-else style="color: red">{{obj.open_number}}</span>
                        </p>
                        <p>
                            <span v-if="obj.status == 0">待开</span>
                            <span style="color: green" v-else-if="obj.forecast_numbers.indexOf(obj.open_number) != -1">中</span>
                            <span style="color: red" v-else>挂</span>
                        </p>
                        <p>{{deadlineWinOrLose(obj.deadline_win_or_lose, 2)}}</p>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { getCurTime, keepTwoDecimalFull } from "@/js/utils";
import BScroll from 'better-scroll';

export default {
    data() {
        return {
            planData: {},
            expertId: 0,    //专家id
            forecastQuantity: 0, //规则(码)
            location: 0, //名次
        }
    },
    created() {
        this.expertId = this.numberPlanParams.expertId;
        this.location = this.numberPlanParams.location;
        this.forecastQuantity = this.numberPlanParams.forecastQuantity;
        this.getForecastPlanFunc(
            this.curLotteryCode,
            this.expertId,
            getCurTime("YYYY-MM-DD"),
            this.forecastQuantity,
            this.location
        );
    },
    methods: {
        ...mapActions(["getForecastPlan"]),
        getForecastPlanFunc(code, expert_id, open_date, forecast_quantity, location) {
            this.getForecastPlan({
                code: code,
                expert_id: expert_id || 0,
                open_date: open_date,
                forecast_quantity: forecast_quantity || 0,
                location: location || 0
            }).then(res => {
                if(res.code == 200) {
                    this.planData = res.data
                } else {
                    // console.log('error')
                }
            })
        },
        refresh() {
            this.getForecastPlanFunc(
                this.curLotteryCode,
                this.expertId,
                getCurTime("YYYY-MM-DD"),
                this.forecastQuantity,
                this.location
            );
        },
        // 计算开奖统计
        calcOopenNumToTal(item) {
            let noOpen = 0; //待开
            let win = 0; // 赢
            let noWin = 0; // 挂
            let winPro = 0; //胜率
            item.forEach(obj => {
                if (obj.status == 0) {
                    noOpen++;
                }else {
                    if (obj.result == 0) {
                        noWin++;
                    }
                    if (obj.result == 1) {
                        win++;
                    }
                }              
            });
            // console.log(win,item.length,noOpen)
            if(item.length == 1 && noOpen == 1) {
                winPro = 0 + '%'
            } else {
                winPro = ((win / (item.length - noOpen)) * 100).toFixed(2) + "%";
            }  
            return {
                noOpen: noOpen,
                win: win,
                noWin: noWin,
                winPro: winPro
            };
        },
        // 选择名次
        selectLocation(location) {
            this.location = location
            this.getForecastPlanFunc(
                this.curLotteryCode,
                this.expertId,
                getCurTime("YYYY-MM-DD"),
                this.forecastQuantity,
                this.location
            );
        },
        // 选择规则(码)
        selectForecastQuantity(forecastQuantity) {
            this.forecastQuantity = forecastQuantity
            this.getForecastPlanFunc(
                this.curLotteryCode,
                this.expertId,
                getCurTime("YYYY-MM-DD"),
                this.forecastQuantity,
                this.location
            );
        },
        // 盈利保留两位小数
        deadlineWinOrLose(data, index) {
            return keepTwoDecimalFull(data, index)
        }
    },
    computed: {
        ...mapGetters(["curLotteryCode", "numberPlanParams", "lotteryCodes"]),
        locationName() {
            for(let item of this.lotteryCodes) {
                if(item.code == this.curLotteryCode) {
                    return item.lottery_location_names
                }
            }
        }
    },
    mounted() {
        this.$nextTick(() => {
            if(!this.scroll) {
                this.scroll = new BScroll(this.$refs.outerWrapper,{click: true})               
            }else {
                this.scroll.refresh()
            }
        })
    },
    watch: {
        numberPlanParams() {
            this.expertId = this.numberPlanParams.expertId;
            this.location = this.numberPlanParams.location;
            this.forecastQuantity = this.numberPlanParams.forecastQuantity;
            this.getForecastPlanFunc(
                this.curLotteryCode,
                this.expertId,
                getCurTime("YYYY-MM-DD"),
                this.forecastQuantity,
                this.location
            );
        },
        planData() {
            // 当 location 为 0 时选中默认第一个
            if(this.location == 0) {
                this.location = this.planData.location[0].location
            }
            // 当 forecastQuantity 为 0 时选中默认第一个
            if(this.forecastQuantity == 0) {
                this.forecastQuantity = this.planData.forecast_quantity_list[0]
            }
            // 当 expertId 为 0 时选中默认第一个
            if(this.expertId == 0) {
                this.expertId = this.planData.expert_id
            }
        }
    }
}
</script>

<style lang="scss" scoped>
    .plan-info{ 
        .tab{
            width: 100%;display: flex;justify-content: space-around;background: #fff;color: gray;font-size: 15px;border-bottom: 1px solid #e6e6e6;
            p{
                height: 100%;line-height: 41px;text-align: center;position: relative;
                .line{
                    width: 100%;height: 2px;position: absolute;background: #51a4fb;bottom: 0;left: 0;
                }
            }
            .location{width: 10%;}
            .forecast-qantity{width: 33.33%;}
            .active{color:#51a4fb}
            .fade-enter-active, .fade-leave-active {
                transition: opacity .5s
            }
            .fade-enter, .fade-leave-active {
                opacity: 0
            }
        }
        .content{
            //padding-top: 44px;
            overflow: hidden;position:absolute;top: 240px;bottom: 10px;left: 0;right: 0;
            .top{
                height: 41px;text-align: center;font-size: 13px;color: #666;line-height: 41px;
                .refresh{color: #0072c6;}
            }
            .title{
                height: 31px;text-align: center;font-size: 15px;line-height: 31px;color: #1089e0;background: #f2f9ff
            }
            .item{
                display: flex;height: 41px;align-items: center;font-size: 13px;color: #777;box-sizing: border-box;border-bottom: 1px solid #f1f1f1;
                P{text-align: center;}
                P:nth-child(1) {width: 8%;}
                P:nth-child(2) {width: 13%;}
                P:nth-child(3) {width: 17%;}
                P:nth-child(4) {width: 25%;}
                P:nth-child(5) {width: 10%;}
                P:nth-child(6) {width: 12%;}
                P:nth-child(7) {width: 15%;}  
            }
            .item:nth-child(odd){background: #fff }
            .item:nth-child(even){background: #f5f7fb}
        }
    }
</style>
