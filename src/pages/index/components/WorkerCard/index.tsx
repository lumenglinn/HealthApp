import React, { Component } from 'react'
import Taro from '@tarojs/taro'
// import { connect } from 'src/pages/index/components/WorkerCard/node_modules/react-redux'
import { View, Image, Text } from '@tarojs/components'

// import { add, minus, asyncAdd } from '../../actions/counter'
// import { AtButton } from 'src/pages/index/components/WorkerCard/node_modules/taro-ui'
import './index.scss'


class WorkerCard extends Component {

  jumpToDetail = (data) => {
    Taro.navigateTo({
      url: `/pages/workerDetail/index?serverId=${data.serverId}`
    })
  }

  render() {
    const { data } = this.props;
    const { realName, age, language, skillItemList = [], serverNum, sex, fileVoList = [] } = data;

    return (
      <View className='index-workerCard' onClick={this.jumpToDetail.bind(this, data)}>
        <View className="card-left">
          <Image mode="aspectFill" className="worker-header" src={fileVoList[0]?.url || 'https://haohugongtest.yukangpeng.com/pic/1626797901125.jpg'} />

          {/* <Image className="worker-header" src="https://haohugongtest.yukangpeng.com/pic/1626797901125.jpg" /> */}
          <View>服务范围：</View>
        </View>
        <View className="card-right">
          <View className="worker-name">{realName}</View>
          <View className="worker-intro">
            {/* 广东 */}
            <View>{sex === "woman" ? "女" : "男"}<Text className="split">|</Text>{age}岁  </View>
            <View>用心服务过{serverNum}个家庭</View>
          </View>
          <View className="tags">
            {
              skillItemList.map((item, i) => {
                return <View key={`tag_${i}`} className="tag">{item.itemName}</View>
              })
            }
          </View>
        </View>
      </View>
    )
  }
}

export default WorkerCard

