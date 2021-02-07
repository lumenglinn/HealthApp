import React, { Component } from 'react'
// import { connect } from 'src/pages/hospital/node_modules/react-redux'

// import { add, minus, asyncAdd } from '../../actions/counter'
import { View, Image, Text } from '@tarojs/components'
// import { AtCurtain } from 'taro-ui'

// import List from './components/List'
// import Search from './components/Search'

import './index.scss'

type PageStateProps = {
  counter: {
    num: number
  }
}

type PageDispatchProps = {
  add: () => void
  dec: () => void
  asyncAdd: () => any
}

type PageOwnProps = {}

type PageState = {}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps

interface Index {
  props: IProps;
}

// @connect(({ counter }) => ({
//   counter
// }), (dispatch) => ({

// }))
class WorkerDetail extends Component {
  componentWillReceiveProps(nextProps) {
    console.log(this.props, nextProps)
  }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  render() {
    return (
      <View className='worker-detail-page'>
        <View className="banner-card">
          <View className="banner">
            <View className="banner-left">
              <Image className="worker-header" src="http://www.1haohg.com/api/uploads/head/201805/20180514/1526278622MsSu1Cxk51.jpeg" />
              <View className="btnn-collect">收藏</View>
            </View>
            <View className="banner-right">
              <View className="worker-name">李小凭</View>
              <View className="worker-info">
                女 | 50岁 | 河北
                服务过100个家庭，获得100%好评
            </View>
              <View className="certificate">
                <View className="cert-item"><View className="icon">证</View>身份证</View>
                <View className="cert-item"><View className="icon">证</View>身份证</View>
                <View className="cert-item"><View className="icon">证</View>身份证</View>
              </View>
            </View>
          </View>
          <View className="detail-card experience">
            <View className="detail-title">护理经验</View>
            <View className="exper-list">
              {
                [1, 2, 3, 4, 5, 6, 7, 8, 9].map((item, i) => {
                  return <View className="item" key={`exper_${i}`}>引流管护理</View>
                })
              }
            </View>
          </View>
        </View>
        <View className="detail-card">
          <View className="detail-title">自我介绍</View>
          <View className="introduce">
            我叫张小平，张家口人，是曹老师名下的一名金牌护工。我一直在照顾一个痴呆阿姨二年多了。她一切生活全得我来照顾。尤其今年阿姨反复住院，我更累了。但为了阿姨早日康复，我一直坚持着，换得家属的信任并拿到了锦旗。谢谢曹老师和客户对我的信任，鼓励和支持。
          </View>
        </View>

        <View className="detail-card">
          <View className="detail-title">生活照片</View>
          <View className="lifes">
            <Image mode={'widthFix'} className="worker-header" src="http://www.1haohg.com/api/uploads/head/201805/20180514/1526278622MsSu1Cxk51.jpeg" />
            <Image mode={'widthFix'} className="worker-header" src="http://www.1haohg.com/api/uploads/head/201805/20180514/1526278622MsSu1Cxk51.jpeg" />
          </View>
        </View>
      </View>
    )
  }
}

export default WorkerDetail

