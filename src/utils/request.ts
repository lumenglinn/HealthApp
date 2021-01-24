
import Taro from '@tarojs/taro';
// import { getAccessToken } from '../services/global'
 
export default function request(options) {
  options.header = {
    ...options.header,
    sessionId: Taro.getStorageSync('sessionId')
  }
  return Taro.request({...options,
    // url: `http://hugong.chenshengbao.com${options.url}`,
    url: `https://hugong.chenshengbao.com${options.url}`,
    success:(res) => {
      // if (res.data.code === 401) {
      //   wx.login({
      //     success(res) {
      //       if (res.code) {
      //         getAccessToken(res.code);
      //       } else {
      //         console.log('登录失败！' + res.errMsg)
      //       }
      //       Taro.eventCenter.on('login', (options)=>request(options));
      //     }
      //   })
      // }
      options.success && options.success(res.data)
      // console.log(res.data,)
      return res.data
    }
  })
}


// export default function(options) {
//   return Taro.request(options).then((res) => {
//     const { statusCode, data } = res;
//     if (statusCode >= 200 && statusCode < 300) {
//       return data;
//     } else {
//       throw new Error(`网络请求错误，状态码${statusCode}`);
//     }
//   })
// }