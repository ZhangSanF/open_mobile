const state = {
    //loading
    showLoading: false,
    showLoadMore: false,
    noContent: false,
    // 二级页面下拉显示
    showDrawerTba: false,
    // 基础配置数据
    baseSettingBase: {},
    baseSettingLotteryData: {},
    baseSettingSys: {},
    baseSettingUpload: {},
     // 彩种编码
    lotteryCodes: [],
    // 当前彩种code
    curLotteryCode: '',
    // 当前彩种类型
    cur_lottery_type: '',
    // 基础数据
    lotteryData: [],
    //长龙数据
    dragonData: {},
    //双面统计
    sidesTotal: [],
    // websocket 开奖结果
    socketOpenResult: {},
    // websocket 計劃
    socketPlanResult: {},
    // websocket 时间
    socketUpdateTime: {},
    // 当前彩种开奖结果
    // openResult: {},
    //预测计划-排行榜(首页)
    forecastRanking: [],
    // 计划参数
    numberPlanParams: {expertId: 0, location: 0, forecastQuantity: 0}
};

export default state;
