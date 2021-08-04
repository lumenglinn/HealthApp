import React, { Component } from 'react'
import Taro from '@tarojs/taro'
import { connect } from 'react-redux';
import { View, Button } from '@tarojs/components'
import { AtIcon, AtGrid } from 'taro-ui'
import { getUserInfo } from '../../utils/function'
import './index.scss'

@connect(({ global }) => ({
  ...global,
}))
export default class mine extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidShow() {
  }

  toRegister = (e) => {
    // console.log(e.detail.encryptedData)
    const { userInfo } = this.props
    Taro.navigateTo({
      url: `/pages/register/index${userInfo.identity === "server" ? '?serverId=' + userInfo.server.serverId : ''}`,
    })
  }

  render() {
    const { userInfo } = this.props
    const isServer = userInfo.identity === "server"
    return (
      <View className='mine-page'>
        <View className="user-wrap">
          <View className="user-head">
            <open-data type="userAvatarUrl" ></open-data>
          </View>
          <View className="user-name">
            <open-data type="userNickName" lang="zh_CN"></open-data>
          </View>
        </View>
        <View className="myorder-wrap">
          <View className="mine-title">我的服务</View>
          <View className="myorder">
            {/* openType='getPhoneNumber' onGetPhoneNumber={this.toRegister} */}
            <Button className="order-item" onClick={this.toRegister}>
              <AtIcon value='money' size='24' color='#333'></AtIcon>
              <View>{isServer ? '修改护工信息' : '注册护工'}</View>
            </Button>
            {/* <View className="order-item" onClick={this.toMyOrder}>
              <AtIcon value='shopping-bag' size='24' color='#333'></AtIcon>
              <View>代付款</View>
            </View>
            <View className="order-item" onClick={this.toMyOrder}>
              <AtIcon value='shopping-bag-2' size='24' color='#333'></AtIcon>
              <View>代付款</View>
            </View> */}
          </View>
        </View>
        {/* <View className="myorder-wrap">
          <View className="mine-title">我的服务</View>
          <View className="">
            <AtGrid data={
              [
                {
                  image: 'https://img12.360buyimg.com/jdphoto/s72x72_jfs/t6160/14/2008729947/2754/7d512a86/595c3aeeNa89ddf71.png',
                  value: '领取中心'
                },
                {
                  image: 'https://img20.360buyimg.com/jdphoto/s72x72_jfs/t15151/308/1012305375/2300/536ee6ef/5a411466N040a074b.png',
                  value: '找折扣'
                },
                {
                  image: 'https://img10.360buyimg.com/jdphoto/s72x72_jfs/t5872/209/5240187906/2872/8fa98cd/595c3b2aN4155b931.png',
                  value: '领会员'
                },
                {
                  image: 'https://img12.360buyimg.com/jdphoto/s72x72_jfs/t10660/330/203667368/1672/801735d7/59c85643N31e68303.png',
                  value: '新品首发'
                },
                {
                  image: 'https://img14.360buyimg.com/jdphoto/s72x72_jfs/t17251/336/1311038817/3177/72595a07/5ac44618Na1db7b09.png',
                  value: '领京豆'
                },
                {
                  image: 'https://img30.360buyimg.com/jdphoto/s72x72_jfs/t5770/97/5184449507/2423/294d5f95/595c3b4dNbc6bc95d.png',
                  value: '手机馆'
                }
              ]
            } />
          </View>
        </View> */}
      </View>
    )
  }
}

