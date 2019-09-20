<template>
    <div class="header">
        <x-icon v-if="$route.meta.showBack" type="ios-arrow-left" size="30" @click="goBack"></x-icon>
        <img class="header-img" :src="imgUrl" alt="">
        <div v-if="$route.meta.showBack" class="navicon" @click="showTab">
            <x-icon type="navicon" size="35" style="top:0;left:0"></x-icon>
        </div>
    </div>    
</template>

<script>
import { mapGetters } from "vuex";
import storage from "good-storage";

export default {
   data() {
       return {

       }
   },
   methods:{
       goBack() {
           if(this.showDrawerTba == true) {
               this.$store.commit('SHOW_DRAWER_TAB', false)
           }
           this.$router.go(-1)
       },
       showTab() {
            this.$store.commit('SHOW_DRAWER_TAB', !this.showDrawerTba)
       }
   },
   computed: {
       ...mapGetters(['baseSettingBase']),

        showDrawerTba() {
            return this.$store.state.showDrawerTba
        },

        imgUrl() {
            if(storage.get('headerImg') == undefined) {
                return this.baseSettingBase.phone_site_logo
            }else {
                return storage.get('headerImg')
            }
        }
   },
   mounted() {

   }
}
</script>

<style scoped lang="scss">
    .header{
        // max-width: 640px;
        width: 100%;  height: 50px; background: #51a4fb; position: fixed;top: 0;left: 0;z-index: 100;
        .vux-x-icon {
            fill: #fff;position: absolute; left: 5px; top: 10px;
        }
        .header-img{
            position: absolute;top: 50%;left: 50%;transform: translate(-50%, -50%);max-height:40px;
        }
        .navicon{
            position: absolute;right: 5px;width: 35px;height: 35px;top: 50%;transform: translate(0, -50%)
        }
    }
</style>
