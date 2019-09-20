import * as types from './mutationsTypes';
import * as api from '@/js/api';
import { saveAccessToken } from '@/js/cache';
import storage from "good-storage";

// 获取access token
export const getAccessToken = ({
  commit,
  state,
  dispatch
}) => {
  return api.getAccessToken().then((res) => {
    if (res.code == 200) {
      // 保存assess token
      saveAccessToken(res.data.access_token);

      // 获取基础参数
      dispatch('getSetting');

      // 彩种编码
      // dispatch('getLotteryCodes');

    } else {
      return 404;
    }
  }).catch(e => {
    // return 408;
  });
}

// 基础参数
export const getSetting = ({
  commit,
  state
}) => {
  api.getSetting().then(res => {
    if (res.code == 200) {
      document.title = res.data.base.site_title;
      document.querySelector('#favicon').setAttribute('href',res.data.base.site_favicon);
      // base
      commit(types.BASE_SETTING_BASE, res.data.base);
      // lottery_data
      commit(types.BASE_SETTING_LOTTERYDATA, res.data.lottery_data);
      // sys
      commit(types.BASE_SETTING_SYS, res.data.sys);
      // upload
      commit(types.BASE_SETTING_UPLOAD, res.data.upload);
      if(storage.get('headerImg') == undefined) {
        storage.set('headerImg', res.data.base.phone_site_logo)
      }else {
        if(storage.get('headerImg') == res.data.base.phone_site_logo) {
          return
        } else {
          storage.set('headerImg', res.data.base.phone_site_logo)
        }
      }
    } else {
      // todo
    }
  });
}

// 彩种编码
export const getLotteryCodes = ({
  commit,
  state
}, params) => {
  return api.getLotteryCodes(params).then((res) => {
    if (res.code == 200) {
      commit(types.LOTTERY_CODES, res.data);
      if(storage.get('H5_CUR_LOTTERY_CODE') == undefined || storage.get('H5_CUR_LOTTERY_TYPE') == undefined) {
        commit('CUR_LOTTERY_CODE', res.data[0].code);
        commit('CUR_LOTTERY_TYPE', res.data[0].code_type);
      }
      //console.log(res)
    } else {
      //console.log(res)
    }
  }).catch(e => {
    //console.log(e)
  });
}

// 修改当前彩种类型
export const chenge_cur_lootery_type = ({
  commit,
  state
}, type) => {
  commit(types.CUR_LOTTERY_TYPE, type);
}

// 修改当前彩种code
export const chengecurLotteryCode = ({
  commit,
  state
}, code) => {
  commit(types.CUR_LOTTERY_CODE, code);
}

// 获取基础数据
export const getLotteryData = ({
  commit,
  state
}, params) => {
  return api.getLotteryData(params).then((res) => {
    if (res.code == 200) {
      // console.log(params)    
      let result = res.data.rows
      if(params.page == 1) {
        commit(types.LOTTERY_DATA, result);
      }else {
        commit(types.LOTTERY_DATA, [...state.lotteryData,...result]);
        if(result.length == 0) {
          commit(types.NO_CONTENT, true)
        }else {
          commit(types.NO_CONTENT, false)
        }
      }
    } else {
      //console.log(res)
    }
  }).catch(e => {
    //console.log(e)
  });
}

// 获取长龙提醒
export const getLongDragon = ({
  commit,
  state
}, params) => {
  return api.getLongDragon(params).then((res) => {
    if (res.code == 200) {
      // todo
      commit(types.SAVE_CHANGLONG_DATA, res.data);
    } else {
      //console.log(res)
    }
  }).catch(e => {
    //console.log(e)
  });
}

// 获取双面统计
export const getSidesTotal = ({
  commit,
  state
}, params) => {
  return api.getSidesTotal(params).then((res) => {
    if(res.code == 200) {
      commit(types.SAVE_SIDES_TOTAL, res.data)
    } else {
      //console.log(res)
    }
  }).catch(e => {
    // console.log(e)
  })
}

// 预测计划-排行榜(首页)
export const getForecastRanking = ({
  commit,
  state
}, params) => {
  return api.getForecastRanking(params).then((res) => {
    if(res.code == 200) {
      commit(types.FORECATST_RANKING, res.data)
    } else {
      //console.log(res)
    }
  }).catch(e => {
    // console.log(e)
  })
}

// 获取预测计划
export const getForecastPlan = ({
  commit,
  state
}, params) => {
  return api.getForecastPlan(params);
}

// 开奖信息
// export const getLotteryExpect = ({
//   commit,
//   state
// }, code) => {
//   api.getLotteryExpect(code).then(res => {
//     if (res.code == 200) {
//       commit(types.OPEN_RESULT,res.data);
//     }
//   });;
// }

