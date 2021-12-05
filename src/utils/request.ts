
import Taro from '@tarojs/taro';
import { userLogin } from './function'

export default function request(options) {

  options.header = {
    ...options.header,
    token: Taro.getStorageSync('token') || '',
    // sessionId: Taro.getStorageSync('sessionId')
  }
  return Taro.request({
    ...options,
    // url: `https://haohugongpro.yukangpeng.com${options.url}`,
    url: `https://haohugongtest.yukangpeng.com${options.url}`,
    success: (res) => {
      if (res.data.statusCode === '0') {
        userLogin(() => {
          Taro.eventCenter.on('login', (options) => request(options));
        })
      }
      options.success && options.success(res.data)
      return res.data
    }
  })
}
