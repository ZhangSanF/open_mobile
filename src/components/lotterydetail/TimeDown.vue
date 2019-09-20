<template>
    <div>
        下期倒数：
        <span class="time" v-show="!isOpening">
            <span v-show="formatTime(curTimeNum).hour != '00'">{{formatTime(curTimeNum).hour}}</span>
            <span v-show="formatTime(curTimeNum).hour != '00'">时</span>
            <span>{{formatTime(curTimeNum).min}}</span>
            <span>分</span>
            <span>{{formatTime(curTimeNum).second}}</span>
            <span>秒</span>
        </span>
        <span v-show="isOpening">
            <span class="opening" v-if="isLastQs > 0">正在开奖</span>
            <span class="opening" v-else>封盘中...</span>
        </span>
    </div>
</template>

<script>
import { formatTimerCallback } from "@/js/utils";

export default {
    props: ['time', 'isLastQs'],
    data() {
        return {
            setTimeFunc: {},
            curTimeNum: 0,
            isOpening: false,
        }
    },
    mounted() {
        this.$nextTick(() => {
            this.timeDown();
        });       
    },
    methods: {
        formatTime(time) {
            return formatTimerCallback(time) 
        },
        timeDown() {
            let _self = this;
            try {
                _self.curTimeNum = _self.time;
                if (_self.curTimeNum <= 0) {
                    _self.isOpening = true;
                    if (_self.isLastQs > 0) {
                         _self.$emit("callBackFunc", _self.isOpening);
                    }
                    return;
                }
                clearTimeout(_self.setTimeFunc);
                let _run = () => {
                     _self.setTimeFunc = setTimeout(() => {
                        _self.curTimeNum--;
                        if (_self.curTimeNum > 0) {
                            _self.isOpening = false;
                            _run();
                        } else {
                            _self.isOpening = true;
                            if (_self.isLastQs > 0) {
                                _self.$emit("callBackFunc", _self.isOpening);
                            }
                        }
                    }, 1000);
                };
                _run();
            } catch (err) {
                _self.isOpening = true;
                if (_self.isLastQs > 0) {
                    _self.$emit("callBackFunc", _self.isOpening);
                }
            }
        }
    },
    computed: {

    },
    watch: {
        time() {
            this.timeDown();
            this.isOpening = false;
            this.$emit("callBackFunc", this.isOpening);
        },
        isLastQs() {
            if (this.isLastQs <= 0) {
                this.$emit("callBackFunc", false);
            }
        },
        // 开奖时点击进入详情，返回后不显示开奖
        curTimeNum() {
            if(this.curTimeNum <= 0) {
                this.isOpening = true
                this.$emit("callBackFunc", this.isOpening);
            }else {
                this.isOpening = false
                this.$emit("callBackFunc", this.isOpening);
            }
        }
    }
}
</script>

<style lang="scss" scoped>
    .time{
        display: inline-block
    }
    .opening{
        color: red
    }
</style>
