<!-- 彩票详情 -->
<template>
    <div class="lottery-info">
        <div class="info">
            <div>               
                {{ codeName }}&nbsp;&nbsp;
                <span class="color999">{{curReslut.expect}} 期</span>
            </div>
            <!-- 时间 -->
            <TimeDown @callBackFunc="callBackFunc" :isLastQs="curReslut.remaining_expect" :time="nextOpenSeconds"></TimeDown>    
        </div>
        <!-- number-square -->
        <Number :isOPen="isOPen" :code_type="curReslut.code_type" :result="curReslut.open_numbers"/>
    </div>
</template>

<script>
import TimeDown from './TimeDown'
import Number from './Number'
import { mapGetters, mapActions } from 'vuex'

export default {
    components: { Number, TimeDown },
    props: ['result'],
    data() {
        return {
            curReslut: this.result,
            isOPen: false,
            nextOpenSeconds: this.result.next_open_seconds
        }
    },
    methods: {
        callBackFunc(isOpen){
            this.isOPen = isOpen;
        },
    },
    computed: {
        ...mapGetters(['socketOpenResult', 'socketUpdateTime', 'lotteryCodes']),
        // 单独显示彩种名称
        codeName() {
            for(let item of this.lotteryCodes) {
                if(item.code == this.curReslut.code) {
                    return item.name
                }
            }
        }
    },
    mounted() {

    },
    watch: {
        result:function() {
            this.curReslut = this.result;         
        },
        socketOpenResult:function() {
            if(this.socketOpenResult.code == this.curReslut.code){
                this.curReslut = this.socketOpenResult;
            }
        },
        socketUpdateTime() {
            for(let item of this.socketUpdateTime) {
                if(item.code == this.curReslut.code) {
                    this.nextOpenSeconds = item.next_open_seconds
                }
            }
        },
        curReslut() {
            this.nextOpenSeconds = this.curReslut.next_open_seconds
        }
    }
}
</script>

<style lang="scss" scoped>
    .lottery-info{
        background: #fff;padding: 6px 10px;
        .info{
            display: flex; justify-content: space-between; font-size: 13px; color: #666;margin-bottom: 10px;
        }     
        .color999{color: #999;font-size: 12px;}
    }
</style>
