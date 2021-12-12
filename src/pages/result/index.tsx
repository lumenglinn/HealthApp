import React, { Component } from 'react'
import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtIcon } from 'taro-ui'
import themeColor from '../../utils/constant';
import './index.scss'
// import { } from '../../components'


export default class Protocol extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {
  }

  toWorkerList = () => {
    wx.switchTab({
      url: `/pages/index/index`
    })
  }

  render() {
    return (
      <View className='result-page'>
        <AtIcon value='check-circle' size='60' color='#50a14f'></AtIcon>
        <View className="tips">注册成功！</View>
        <View className="btn-finish" onClick={this.toWorkerList}>回到首页</View>
      </View>
    )
  }
}

