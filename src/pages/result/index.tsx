import React, { Component } from 'react'
import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import themeColor from '../../utils/constant';
import { AtIcon } from 'taro-ui'

import "taro-ui/dist/style/components/icon.scss";
import './index.scss'
// import { } from '../../components'


export default class Protocol extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {
  }

  render() {
    return (
      <View className='result-page'>
        <AtIcon value='check-circle' size='60' color='#50a14f'></AtIcon>
        <View className="tips">注册成功！</View>
      </View>
    )
  }
}

