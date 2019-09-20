import storage from "good-storage";

//loading
export const showLoading =state=> state.showLoading;
export const showLoadMore =state=> state.showLoadMore;
export const noContent =state=> state.noContent;

// 二级页面下拉显示
export const showDrawerTba =state=> state.showDrawerTba;

// 基础配置数据
export const baseSettingBase =state=> state.baseSettingBase;
export const baseSettingLotteryData =state=> state.baseSettingLotteryData;
export const baseSettingSys =state=> state.baseSettingSys;
export const baseSettingUpload =state=> state.baseSettingUpload;

// 彩种编码
export const lotteryCodes =state=> state.lotteryCodes;

// 当前彩种code
export const curLotteryCode =state=> {
    if(state.curLotteryCode == '') {
        return storage.get('H5_CUR_LOTTERY_CODE')
    }else {
        return state.curLotteryCode
    }
}

// 当前彩种类型
export const cur_lottery_type =state=> {
    if(state.cur_lottery_type == '') {
        return storage.get('H5_CUR_LOTTERY_TYPE')
    }else {
        return state.cur_lottery_type
    }
}

// 基础数据
export const lotteryData =state=> state.lotteryData;

//长龙数据
export const dragonData =state=> state.dragonData;

// 双面统计
export const sidesTotal =state=> state.sidesTotal;

//websocket开奖结果
export const socketOpenResult =state=> state.socketOpenResult;

//websocket計劃
export const socketPlanResult =state=> state.socketPlanResult;

//websocket 时间
export const socketUpdateTime =state=> state.socketUpdateTime;

// 当前彩种开奖结果
// export const openResult =state=> state.openResult;

// 预测计划-排行榜(首页)
export const forecastRanking =state=> state.forecastRanking;

// 计划参数
export const numberPlanParams =state=> state.numberPlanParams;