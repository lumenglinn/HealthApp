import React, { Component } from 'react'
import Taro from '@tarojs/taro'
import { getCurrentInstance } from '@tarojs/taro'
// import { connect } from 'src/pages/hospital/node_modules/react-redux'
// import { add, minus, asyncAdd } from '../../actions/counter'
import { View, Image, Text } from '@tarojs/components'
import { queryServer } from './service';
// import { AtCurtain } from 'taro-ui'
// import List from './components/List'
// import Search from './components/Search'

import './index.scss'
class WorkerDetail extends Component {
  state = {
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
    if (statusCode === '10001') {
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

  render() {
    const { realName, sex, age, language, serverNum, skillItemList, hospitalList, introduce, fileVoList } = this.state.serverInfo
    return (
      <View className='worker-detail-page'>
        <View className="banner-card">
          <View className="banner">
            <View className="banner-left">
              <Image className="worker-header" src={fileVoList[0]?.url} />
              <View className="btnn-collect">收藏</View>
            </View>
            <View className="banner-right">
              <View className="worker-name">{realName}</View>
              <View className="worker-info">
                <View>{sex === "man" ? "男" : "女"} <Text className="split">|</Text> {age}岁</View>
                <View>
                  擅长
                  {
                    JSON.parse(language).map((item, index) => {
                      return <Text className="language-icon" key={`language_${index}`}>{item}</Text>
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
          <View className="detail-card experience">
            <View className="detail-title">护理经验</View>
            <View className="exper-list">
              {
                skillItemList.map((item, i) => {
                  return <View className="item" key={`exper_${i}`}>{item.itemName}</View>
                })
              }
            </View>
          </View>
          <View className="detail-card experience">
            <View className="detail-title">服务医院</View>
            <View className="exper-list">
              {
                hospitalList.map((item, i) => {
                  return <View className="item" key={`exper_${i}`}>{item.name}</View>
                })
              }
            </View>
          </View>
        </View>
        {
          introduce && <View className="detail-card">
            <View className="detail-title">自我介绍</View>
            <View className="introduce">
              {introduce}
            </View>
          </View>
        }
        {
          fileVoList.length > 0 && <View className="detail-card">
            <View className="detail-title">生活照片</View>
            <View className="lifes">
              {
                fileVoList.map((item, index) => {
                  return <Image mode={'widthFix'} className="worker-header" src={item.url} />
                })
              }
            </View>
          </View>
        }
      </View>
    )
  }
}

export default WorkerDetail

