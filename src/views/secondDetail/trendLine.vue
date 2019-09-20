<!-- 长龙走势  -->
<template>
    <div class="trend-line">
        <div class="item" v-for="(item, index) in dragonData" :key="index">{{item.location_name}}</div>
    </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
    computed: {
        ...mapGetters(["dragonData"])
    },
    mounted() {
        
    }
}
</script>

<style lang="scss" scoped>
    .trend-line{
        padding: 15px 10px;display: flex;flex-wrap: wrap;flex: 3;background: #fff;
        .item{
            background: #f5f7fb;color:#777;font-size: 13px;padding: 5px 15px;margin-bottom: 10px;margin-right: 8px;
        }
    }
</style>
