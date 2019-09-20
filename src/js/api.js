import axios from "./axios";
import * as urls from "./apiUrl";
import * as apiConfig from "./config";

//  获取Token Code
export function getAccessToken(params) {
    let param = Object.assign({}, {
        app_id: apiConfig.app_id,
        grant_type: apiConfig.grant_type,
        timestamp: apiConfig.timestamp,
        signature: apiConfig.signature,
    });
    return axios.get(urls.getAccessTokenAPI(), param);
}

//  基础参数
export function getSetting() {
    return axios.get(urls.getSettingAPI(), {});
}

//  彩种编码
export function getLotteryCodes() {
    return axios.get(urls.getLotteryCodesAPI(), {});
}

//  获取基础数据
export function getLotteryData(params) {
    let param = Object.assign({}, {
        open_date: params.open_date,
        page_size: params.page_size || 30,
        page: params.page || 1,
        code: params.code,
        is_phone: 1
    });
    return axios.get(urls.getLotteryDataAPI(), param);
}

//  获取长龙提醒
export function getLongDragon(params) {
    let param = Object.assign({}, {
        code: params.code,
    });
    return axios.get(urls.getLongDragonAPI(), param);
}

//  获取双面统计
export function getSidesTotal(params) {
    let param = Object.assign({}, {
        open_date: params.open_date,
        code: params.code,
    });
    return axios.get(urls.getSidesTotalAPI(), param);
}

//  开奖信息
// export function getLotteryExpect(code) {
//     let param = Object.assign({}, {
//         code: code,
//     });
//     return axios.get(urls.getLotteryExpectAPI(), param);
// }

// 预测计划-排行榜(首页)
export function getForecastRanking(params) {
    let param = Object.assign({}, {
        code: params.code
    });
    return axios.get(urls.getForecastRankingAPI(), param);
}

//  预测计划
export function getForecastPlan(params) {
    let param = Object.assign({}, {
        code: params.code,
        expert_id: params.expert_id,
        open_date: params.open_date,
        forecast_quantity: params.forecast_quantity,
        location: params.location,
        at_last_expect: params.at_last_expect || 0
    });
    return axios.get(urls.getForecastPlanAPI(), param);
}
