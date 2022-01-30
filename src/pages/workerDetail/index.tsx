import React, { Component } from 'react'
import { connect, useDispatch } from 'react-redux';
import Taro, { getCurrentInstance } from '@tarojs/taro'

// import { connect } from 'src/pages/hospital/node_modules/react-redux'
// import { add, minus, asyncAdd } from '../../actions/counter'
import { View, Image, Text } from '@tarojs/components'
import { queryServer } from './service';
import { AtToast } from 'taro-ui'
// import List from './components/List'
// import Search from './components/Search'

import './index.scss'

@connect(({ global }) => ({
  ...global,
}))
class WorkerDetail extends Component {
  state = {
    isOpenToast: false,
    serverInfo: {
      realName: "",
      sex: "woman",
      age: 0,
      language: "[]",
      serverNum: 0,
      skillItemList: [],
      hospitalList: [],
      introduce: '',
      fileVoList: []
    }
  }

  componentDidMount() {
    this.queryServerList();
  }

  queryServerList = async () => {
    const { data: { data, msg, statusCode } } = await queryServer({
      serverId: getCurrentInstance().router.params.serverId
    });
    if (statusCode === '1') {
      this.setState({
        serverInfo: data,
      })

    } else {
      Taro.showToast({
        title: msg,
        icon: 'none',
      })
    }
  }

  addCart = () => {
    const { serverInfo } = this.state
    const { dispatch, cartData } = this.props
    dispatch({
      type: 'global/updateData',
      payload: {
        cartData: [
          ...cartData,
          serverInfo
        ],
      }
    });
    this.setState({
      isOpenToast: true
    })
  }

  render() {
    const { serverInfo, isOpenToast } = this.state
    const {
      realName,
      sex,
      age,
      language,
      serverNum,
      skillItemList,
      hospitalList,
      introduce,
      fileVoList
    } = serverInfo
    return (
      <View className='worker-detail-page'>
        <View className='banner-card'>
          <View className='banner'>
            <View className='banner-left'>
              <Image mode='aspectFill' className='worker-header' src={fileVoList[0]?.url || 'https://haohugongtest.yukangpeng.com/pic/1626797901125.jpg'} />
              {/* <View className="btnn-collect">收藏</View> */}
            </View>
            <View className='banner-right'>
              <View className='worker-name'>{realName}</View>
              <View className='worker-info'>
                <View>{sex === "man" ? "男" : "女"} <Text className='split'>|</Text> {age}岁</View>
                <View>
                  擅长
                  {
                    JSON.parse(language).map((item, index) => {
                      return <Text className='language-icon' key={`language_${index}`}>{item}</Text>
                    })
                  }
                </View>
                <View>已服务过{serverNum}个家庭</View>
              </View>
              {/* <View className="certificate">
                <View className="cert-item"><View className="icon">证</View>身份证</View>
                <View className="cert-item"><View className="icon">证</View>身份证</View>
                <View className="cert-item"><View className="icon">证</View>身份证</View>
              </View> */}
            </View>
          </View>
          <View className='detail-card experience'>
            <View className='detail-title'>护理经验</View>
            <View className='exper-list'>
              {
                skillItemList.map((item, i) => {
                  return <View className='item' key={`exper_${i}`}>{item.itemName}</View>
                })
              }
            </View>
          </View>
          <View className='detail-card experience'>
            <View className='detail-title'>服务医院</View>
            <View className='exper-list'>
              {
                hospitalList.map((item, i) => {
                  return <View className='item' key={`exper_${i}`}>{item.name}</View>
                })
              }
            </View>
          </View>
        </View>
        {
          introduce && <View className='detail-card'>
            <View className='detail-title'>自我介绍</View>
            <View className='introduce'>
              {introduce}
            </View>
          </View>
        }
        {
          fileVoList.length > 0 && <View className='detail-card'>
            <View className='detail-title'>生活照片</View>
            <View className='lifes'>
              {
                fileVoList.map((item, index) => {
                  return <Image mode='widthFix' className='worker-header' src={item.url} />
                })
              }
            </View>
          </View>
        }
        <View className='fix-box'>
          <View className='add-cart' onClick={this.addCart}>加入清单</View>
        </View>
        <AtToast isOpened={isOpenToast} text='添加成功' ></AtToast>
      </View>
    )
  }
}

export default WorkerDetail

