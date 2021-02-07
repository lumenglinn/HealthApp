import React, { Component } from 'react'
// import { connect } from 'src/pages/index/components/WorkerCard/node_modules/react-redux'
import { View, Image, Text } from '@tarojs/components'

// import { add, minus, asyncAdd } from '../../actions/counter'
// import { AtButton } from 'src/pages/index/components/WorkerCard/node_modules/taro-ui'
import { queryServerList } from '../../service';
import './index.scss'


class WorkerCard extends Component {

  queryServerList = async () => {
    const { data: { data, msg, statusCode, totalSize } } = await queryServerList({
      pageSize: 20,
      pageNum: 1,
      onlineStatus: "offLine",
      reviewStatus: "notReviewed"
    });
    if (statusCode === '10001') {
      this.setState({
        serverList: data,
        totalSize,
        // onlineStatus: "onLine",
      })

    } else {
      Taro.showToast({
        title: msg,
        icon: 'none',
      })
    }
  }

  render() {
    const { data } = this.props;
    const { realName, age, language, skillItemList = [], serverNum, sex } = data;

    return (
      <View className='index-workerCard'>
        <View className="card-left">
          <Image className="worker-header" src="http://www.1haohg.com/api/uploads/head/201805/20180514/1526278622MsSu1Cxk51.jpeg" />
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

