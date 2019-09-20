<!-- 开奖记录 -->
<template>
    <div class="history" ref="outerWrapper" :style="{top: styleTop}">
        <ul style="padding-bottom: 30px;">
            <li class="item">
                <div class="left">
                    <span>期号</span>
                    <span>时间</span>
                </div>
                <div class="title" v-for="(item, index) in lotteryData" :key="index"  v-show="index == 0" >
                    <span :class="activeTab == 'open_numbers' ? 'active' : ''" v-if="item.open_numbers" @click="changeTab('open_numbers')">号码</span>
                    <span :class="activeTab == 'single_double' ? 'active' : ''" v-if="item.single_double" @click="changeTab('single_double')">单双</span>
                    <span :class="activeTab == 'big_small' ? 'active' : ''" v-if="item.big_small" @click="changeTab('big_small')">大小</span>
                    <span :class="activeTab == 'dragon_tiger' ? 'active' : ''" v-if="item.first_second_sum" @click="changeTab('dragon_tiger')">龙虎</span>
                </div>
            </li>
            <li class="item" v-for="(item, index) in lotteryData" :key="index">
                <div class="left">
                    <span>{{item.expect.slice(-4)}}</span>
                    <span>{{item.open_datetime.split(' ')[1].slice(0,5)}}</span>
                </div>
                <!-- 号码 -->
                <div class="square number-square liu_he_cai margin" v-if="activeTab == 'open_numbers'">
                    <p :class="cur_lottery_type == 'pk10' ? 'num' + num : cur_lottery_type == 'liu_he_cai' ? 'liu' + num : 'circle'" v-for="(num, index) in item.open_numbers" :key="index">{{num}}</p>
                </div>
                <!-- 单双 -->
                <div class="history-square margin" v-if="activeTab == 'single_double'">
                    <p class="square" :class="num == '单' ? 'odd' : 'even'" v-for="(num, index) in item.single_double" :key="index">{{num}}</p>
                </div>
                <!-- 大小 -->
                <div class="history-square margin" v-if="activeTab == 'big_small'">
                    <p class="square" :class="num == '小' ? 'odd' : 'even'" v-for="(num, index) in item.big_small" :key="index">{{num}}</p>
                </div>
                <!-- 龙虎 -->
                <div class="history-square margin" v-if="activeTab == 'dragon_tiger'">
                    <p class="square dragon-tiger" :class="methodsClass(sum)" v-for="(sum,index) in item.first_second_sum" :key="index + 'a'">{{sum}}</p>
                    <p class="square dragon-tiger" :class="num == '虎' ? 'odd' : 'even'" v-for="(num, index) in item.dragon_tiger" :key="index + 'b'">{{num}}</p>
                </div>
            </li>
            <!-- 加载 -->
            <div class="true" v-show="showLoadMore">
                <load-more tip="正在加载"></load-more>
            </div>
            <div class="false" v-show="noContent">
                <load-more :show-loading="false" tip="到底啦！" background-color="#fbf9fe"></load-more>
            </div>
        </ul>      
    </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { LoadMore } from 'vux'
import { formatTime } from "@/js/utils";
import BScroll from 'better-scroll';

export default {
    components: { LoadMore },
    data() {
        return {
            activeTab: 'open_numbers',
            page_size: 30,
            page: 1
        }
    },
    created() {

    },
    computed: {
        ...mapGetters(["lotteryData", "cur_lottery_type", "curLotteryCode", "showLoadMore", "noContent", "socketOpenResult"]),
        styleTop() {
            if(this.curLotteryCode == 'bjkl8') {
                return '192px'
            }else {
                return '166px'
            }            
        }
    },
    methods: {
        ...mapActions(['getLotteryData']),
        changeTab(name) {
            this.activeTab = name
        },
        methodsClass(sum) {
            if(sum == '单' || sum == '小') {
                return 'odd'
            } else if(sum == '双' || sum == '大') {
                return 'even'
            } else {
                return 'number'
            }
        },
    },
    mounted() {
        // 触碰到底部加载更多
        this.$nextTick(() => {
            if(!this.scroll) {
                this.scroll = new BScroll(this.$refs.outerWrapper,{click: true,pullUpLoad:{threshold: 0}})
                this.scroll.on('pullingUp', () => {
                    if(!this.showLoadMore && !this.noContent) {
                        this.getLotteryData({
                            open_date: formatTime(this.curSelectTime, "YYYY-MM-DD"),
                            page_size: this.page_size,
                            page: ++this.page,
                            code: this.curLotteryCode
                        })
                    } 
                    this.scroll.finishPullUp()
                })
                
            }else {
                this.scroll.refresh()
            }
        })
    },
    watch: {
        // 开奖后初始化 page
        socketOpenResult() {       
            if(this.socketOpenResult.code == this.curLotteryCode){
                this.page = 1
                this.scroll.scrollTo(0, 0)
            }
        },
        // code 变化让其跳转到开奖记录，page 初始化
        curLotteryCode() {
            this.activeTab = 'open_numbers'
            this.page = 1
            this.scroll.scrollTo(0, 0)
        }
    }
}
</script>

<style lang="scss" scoped>
    .history{
        background: #fff;overflow: hidden;position:absolute;bottom: 0;left: 0;right: 0;//top: 166px;
        .more{
            text-align: center;font-size: 15px;
        }
        .true{
            position: fixed;bottom: 5px;left: 50%;transform: translate(-50%,0);
            .weui-loadmore{width: 100%;}
        }
        .false{
            margin-top: 15px;text-align:center;
            .weui-loadmore{width: 100%;}
        }
        .item{
            display: flex;border-bottom: 1px solid #f1f1f1;padding: 7px 0;align-items: center;//height: 36px;line-height: 36px;
            .left{
                width: 82px;box-sizing: border-box;display: flex;
                span{
                    font-size: 13px;color: #777;text-align: center;width: 50%;
                }
            }
            .title{
                box-sizing: border-box;display: flex;justify-content: space-around;align-items: center;flex: 1;//padding:0 15px;width: 100%;
                span{
                    border-radius: 5px;height: 20px;line-height: 20px;padding: 0 5px;font-size: 13px;color: #666;
                }
                .active{
                    color: #fff;background: #51a4fb;
                }
            }
            .margin{
                margin-left: 5px;overflow: hidden;//white-space:nowrap;
            }
            .square{
                color: #fff;line-height: 24px;font-size: 14px;
                p{
                    display: inline-block;margin-right: 5px;text-align: center;width: 22px;height: 22px;line-height: 22px;
                }
                .circle{background: #3771de;border-radius: 50%}
            } 
            .history-square{
                .square{
                    display: inline-block;margin-right: 5px;text-align: center;border-radius: 4px;width: 21px;height: 21px;line-height: 21px;color: #fff;
                }
                .odd{
                    background: #569ebb
                }
                .even{
                    background: #ff7300
                }
                .number{
                    color: red;//background: #ffa300
                }
                // .dragon-tiger{color: #000;}
            }
        }
    }
</style>
