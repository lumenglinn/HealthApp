import React, { Component } from 'react'
import Taro from '@tarojs/taro'
import { View, Text, Button } from '@tarojs/components'
import { AtButton, AtModal, AtModalHeader, AtModalContent, AtModalAction, AtMessage } from 'taro-ui'

import './index.scss'

export default class Index extends Component {

  componentWillMount() { }

  componentDidMount() { }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  handleSelect = (type) => {
    if (type === 'disease') {
      Taro.atMessage({
        'message': '该功能尚在开发中，敬请期待！',
        // 'type': type,
      })
    } else {
      Taro.navigateTo({
        url: '/pages/register/index'
      })
    }
  }

  render() {
    return (
      <View className='index-page'>
        <AtModal isOpened className="common-dialog identity-dialog">
          {/* <AtModalHeader>标题</AtModalHeader> */}
          <AtModalContent>
            请选择您的身份
          </AtModalContent>
          <AtModalAction>
            <Button onClick={this.handleSelect.bind(this, 'disease')}>我是患者</Button>
            <Button onClick={this.handleSelect.bind(this, 'server')}>我是护工</Button>
          </AtModalAction>
        </AtModal>
        <AtMessage />
      </View>
    )
  }
}
