import React, { Component } from 'react'
import Taro from '@tarojs/taro'
import { View, Text, Button } from '@tarojs/components'
import { AtButton, AtModal, AtModalHeader, AtModalContent, AtModalAction, AtMessage } from 'taro-ui'
import List from './components/List'
import { login, queryUserInfo } from './service'
import './index.scss'

export default class Index extends Component {
  state = {
    identity: ''
  }
  componentWillMount() { }

  componentDidMount() {
    this.getToken()
  }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  getToken = () => {
    const self = this
    wx.login({
      success: async function (res) {
        if (res.code) {
          const { data: { data, msg, statusCode } } = await login({
            code: res.code
          });
          if (statusCode === '1') {
            Taro.setStorageSync('token', data.token)
            self.getUserInfo()
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

  getUserInfo = async () => {
    const { data: { data, msg, statusCode } } = await queryUserInfo()
    if (statusCode === '1') {
      this.setState({
        identity: data.identity
      })
      data.identity === 'server' && Taro.navigateTo({
        url: '/pages/workerList/index'
      })
    } else {
      Taro.showToast({
        title: msg,
        icon: 'none',
      })
    }
  }

  // handleSelect = (type) => {
  //   if (type === 'disease') {
  //     Taro.atMessage({
  //       'message': '该功能尚在开发中，敬请期待！',
  //       // 'type': type,
  //     })
  //   } else {
  //     Taro.navigateTo({
  //       url: '/pages/register/index'
  //     })
  //   }
  // }

  render() {
    const { identity } = this.state
    return (
      <View className='index-page'>
        {/* <List /> */}
        {/* {
          identity !== 'server' && <AtModal isOpened className="common-dialog identity-dialog">
            <AtModalContent>
              请选择您的身份
          </AtModalContent>
            <AtModalAction>
              <Button onClick={this.handleSelect.bind(this, 'disease')}>我是患者</Button>
              <Button onClick={this.handleSelect.bind(this, 'server')}>我是护工</Button>
            </AtModalAction>
          </AtModal>
        } */}
        <AtMessage />
      </View>
    )
  }
}
