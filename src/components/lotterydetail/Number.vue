<!-- 彩票号码 -->
<template>
    <div>
        <div class="square number-square liu_he_cai" v-show="!isOPen">
            <p 
                :class="code_type == 'pk10' ? 'num' + num : code_type == 'liu_he_cai' ? 'liu' + num : 'circle'"
                v-for="(num, index) in result" 
                :key="index">
                {{num}}
            </p>
        </div>
        <!-- 开奖 -->
        <div class="square number-square liu_he_cai" v-show="isOPen" ref="openCode">
            <p  class="ball"
                :class="code_type == 'pk10' ? 'num' + num : code_type == 'liu_he_cai' ? 'liu' + num : 'circle'"
                v-for="(num, index) in result" 
                :key="index">
                {{num}}
            </p>
        </div>
    </div>
    
</template>

<script>

export default {
    props: {
        isOPen:{
            type: Boolean,
            default: false
        },
        result: {
            type: Array,
            default: () => []
        },
        code_type: {
            type: String
        }
    },
    data() {
        return {
            setTimeFunc:null
        }
    },
    methods: {
        // 开奖动画
        showOpenAni(){
            if(this.isOPen){
                if(!this.$refs.openCode) return;
                let dom = this.$refs.openCode.querySelectorAll('.ball');
                let fastTemp = dom[0];
                dom[0].remove();
                this.$refs.openCode.appendChild(fastTemp);
                this.setTimeFunc = setTimeout(()=>{
                    clearTimeout(this.setTimeFunc);
                    this.showOpenAni();
                },100)
            }else{
                clearTimeout(this.setTimeFunc);
            }
        },
    },
    created() {
        
    },
    mounted() {

    },
    watch: {
        isOPen: function() {
            clearTimeout(this.setTimeFunc);
            this.showOpenAni();
        }
    }
}
</script>

<style lang="scss" scoped>
    .square{
        color: #fff;line-height: 26px;font-size: 14px;
        p{
            display: inline-block;margin-right: 5px;text-align: center;width: 24px;height: 24px;line-height: 24px;//border-radius: 5px;
        }
        .circle{background: #3771de;border-radius: 50%}
    } 
</style>
