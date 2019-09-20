<!-- 双面统计 -->
<template>
    <div class="two-sided" ref="outerWrapper">
        <div>
            <ul v-for="(thData, index) in locationName" :key="index">
                <li class="title">{{thData}}</li>
                <li class="item">
                    <p v-for="(obj, key) in sidesTotalField" :key="key">{{obj}}</p>
                </li>
                <li class="item" >
                    <p v-for="(obj,key) in sidesTotal" :key="key" v-show="key >= (sidesTotalField.length * index) && key < (sidesTotalField.length * (index+1))">{{obj}}</p>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
import BScroll from 'better-scroll';

export default {
    computed: {
        ...mapGetters(["sidesTotal", "lotteryCodes", "curLotteryCode"]),

        // 当前彩种的 location_name
        locationName() {
            for(let item of this.lotteryCodes) {
                if(item.code == this.curLotteryCode) {
                    return item.lottery_location_names
                }
            }
        },
        // 当前彩种双面数据
        sidesTotalField() {
            for(let item of this.lotteryCodes) {
                if(item.code == this.curLotteryCode) {
                    return item.sides_total_field
                }
            }
        },
    },
    methods: {
        // 转换数据过滤相同数据
        // filterData(list) {
        //     let data = list;
        //     let obj = {};
        //     let arr = data && data.reduce(function(item, next) {
        //         obj[next.location] ? "" : (obj[next.location] = true && item.push(next));
        //         return item;
        //     }, []);

        //     arr && arr.forEach(temp => {
        //         let len = 0;
        //         data && data.forEach(item => {
        //             if (temp.location == item.location) {
        //                 len++;
        //             }
        //         });
        //         this.$set(temp, "len", len);
        //     });
        //     // console.log(arr)
        //     return arr;
        // },
    },
    mounted() {
        this.$nextTick(() => {
            if(!this.scroll) {
                this.scroll = new BScroll(this.$refs.outerWrapper,{click: true})               
            }else {
                this.scroll.refresh()
            }
        })
    }
}
</script>

<style lang="scss" scoped>
    .two-sided{
        padding:8px;overflow: hidden;position:absolute;top: 166px;bottom: 10px;left: 0;right: 0;
        ul{
            box-shadow: 0 4px 4px rgba(0,0,0,.09);margin-bottom: 8px;
            li:last-child{
                border-right: none
            }
        }
        ul:last-child{
                border-bottom: none
            }
        .title{
            height: 28px;line-height: 28px;color: #fff;font-size: 13px;text-align: center;background: #9da9c2;
        }
        .item{
            display: flex;justify-content: space-between;border-bottom: 1px solid #e6e6e6;
            p{
                flex: 1;text-align: center;height: 28px;line-height: 28px;color: #666;font-size: 13px;border-right: 1px solid #e6e6e6;
            }
        }        
    }
</style>
