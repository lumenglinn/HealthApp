import Taro from '@tarojs/taro'
import { login, queryUserInfo } from '../services/global'

export function wxLogin(callback) {
  wx.login({
    success: async function (res) {
      if (res.code) {
        if (callback) {
          callback(res.code)
        }
      } else {
        console.log('获取用户登录态失败：' + res.errMsg);
      }
    }
  })
}

export function userLogin(callback) {
  wx.login({
    success: async function (res) {
      if (res.code) {
        const { data: { data, msg, statusCode } } = await login({
          code: res.code
        });
        if (statusCode === '1') {
          Taro.setStorageSync('token', data.token)
          callback && callback()
        } else {
          Taro.showToast({
            title: msg,
            icon: 'none',
          })
        }
      } else {
        console.log('获取用户登录态失败：' + res.errMsg);
      }
    }
  })
}

export async function getUserInfo() {
  const token = Taro.getStorageSync('token')
  if (token) {
    queryMineInfo()
  } else {
    userLogin(queryMineInfo)
  }
}

export async function queryMineInfo() {
  const userInfo = Taro.getStorageSync('userInfo')
  if (userInfo) {
    return userInfo
  }
  const { data: { data, msg, statusCode } } = await queryUserInfo()
  if (statusCode === '1') {
    Taro.setStorageSync('userInfo', data)
    return data
  } else {
    Taro.showToast({
      title: msg,
      icon: 'none',
    })
  }
}
