import jsMd5 from "js-md5";
import {getCurTime} from "@/js/utils";

// appid
export const app_id = 2026668444;

// grant_type      
export const grant_type = 'access_token';

// timestamp 时间
export const timestamp = getCurTime('YYYY-MM-DD HH:mm:ss');

// signature 参数签名
export const signature = build_signature({ app_id: app_id, grant_type: grant_type, timestamp: timestamp.replace(/[\:]/g,"|") });

// 生成加密签名(去掉了sort()排序)
function build_signature(param) {
    // appSecret
    const appSecret = 'ZrIn80rRrNSRREirS9Rx0PrRUnnk7RXI';
    // const appSecret = 'aFXqzhIbO54498u2p5UpQ4F85HCCf89U'; // huidu
    if (!param) return '';
    let arr = []
    for (let i in param) {
        let o = {};
        o[i] = param[i];
        arr.push(o)
    }
    
    let str = JSON.stringify(arr).replace(/[{[\,\:\"\]}]/g, "");
    str = str.replace(/[|]/g,":");
    str = appSecret + str + appSecret;
    str = jsMd5(str).toUpperCase();
    return str;
}

// 生成加密签名
// function build_signature(param) {
//     // appSecret
//     const appSecret = 'ZrIn80rRrNSRREirS9Rx0PrRUnnk7RXI';
//     if (!param) return '';
//     let arr = []
//     for (let i in param) {
//         let o = {};
//         o[i] = param[i];
//         arr.push(o)
//     }
    
//     let str = JSON.stringify(arr.sort()).replace(/[{[\,\:\"\]}]/g, "");
//     str = str.replace(/[|]/g,":");
//     str = appSecret + str + appSecret;
//     str = jsMd5(str).toUpperCase();
//     return str;
// }