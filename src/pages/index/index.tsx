import React, { Component } from 'react'
import { View, ScrollView, Text, Image } from '@tarojs/components'
import WorkerCard from './components/WorkerCard'
import { queryServerList } from './service';
import noDataImg from '../../assets/image/no-data.png';
import './index.scss'

class WorkerList extends Component {
  state = {
    serverList: [],
    pageNum: 1,
    totalSize: 99999,
  }

  componentDidShow() {
    this.setState({ pageNum: 1 })
    this.getServerList();
  }

  getServerList = async () => {
    const { serverList, pageNum } = this.state
    if (this.state.totalSize <= serverList.length) {
      return
    }
    const { data: { data, msg, statusCode, totalSize } } = await queryServerList({
      pageSize: 10,
      pageNum: pageNum,
      onlineStatus: "onLine",
      reviewStatus: "reviewed"
    });
    if (statusCode === '1') {
      this.setState({
        serverList: pageNum === 1 ? data : serverList.concat(data),
        totalSize,
        pageNum: pageNum + 1
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
    const { serverList, totalSize } = this.state;
    return (
      <View className='worker-list-page'>
        <ScrollView
          className='scrollview'
          scrollY
          style='height:100%;'
          scrollWithAnimation
          onScrollToLower={this.getServerList.bind(this)} // 使用箭头函数的时候 可以这样写 `onScrollToUpper={this.onScrollToUpper}`
        >
          {
            serverList.length > 0 && serverList.map((item, i) => {
              return <WorkerCard data={item} key={`worker_${i}`} />
            })
          }
          {
            serverList.length === 0 && <View className='no-data'>
              <Image src={noDataImg} className='no-data-img' />
              <view>暂无数据</view>
            </View>
          }

          {serverList.length > 0 && serverList.length === totalSize && <View className='no-more'>没有更多数据了</View>}
        </ScrollView>
      </View>
    )
  }
}

export default WorkerList

