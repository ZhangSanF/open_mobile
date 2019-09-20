
//  获取Token Code
export function getAccessTokenAPI(){
    return {
        url: `/oauth/token`,
        isOpenLoading: false
    }
}

//  基础参数 
export function getSettingAPI(){
    return {
        url: `/v1/setting`,
        isOpenLoading: false
    }
}

//  彩种编码
export function getLotteryCodesAPI(){
    return {
        url: `/v1/lotteryCodes`,
        isOpenLoading: true
    }
}

//  获取基础数据
export function getLotteryDataAPI(){
    return {
        url: `/v1/lotteryData`,
        isOpenLoading: false
    }
}

//  获取长龙提醒
export function getLongDragonAPI(){
    return {
        url: `/v1/longDragon`,
        isOpenLoading: true
    }
}

//  获取双面统计
export function getSidesTotalAPI(){
    return {
        url: `/v1/sidesTotal`,
        isOpenLoading: true
    }
}

//  预测计划-排行榜(首页)
export function getForecastRankingAPI(){
    return {
        url: `/v1/ForecastRanking`,
        isOpenLoading: true
    }
}

//  获取预测计划
export function getForecastPlanAPI(){
    return {
        url: `/v1/ForecastPlan`,
        isOpenLoading: true
    }
}

//  开奖信息 
// export function getLotteryExpectAPI(){
//     return {
//         url: `/v1/lotteryExpect`,
//         isOpenLoading: false
//     }
// }

