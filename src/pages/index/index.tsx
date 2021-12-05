import React, { Component } from 'react'
import Taro from '@tarojs/taro'
import { View, ScrollView, Text, Image } from '@tarojs/components'
import { AtNoticebar } from 'taro-ui'
import WorkerCard from './components/WorkerCard'
import { queryServerList } from './service';
import "taro-ui/dist/style/components/noticebar.scss";
import noDataImg from '../../assets/image/no-data.png';
import './index.scss'

class WorkerList extends Component {
  state = {
    serverList: [],
    pageNum: 1,
    totalSize: 99999,
    loading: true
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
    if (this.state.loading) {
      Taro.showLoading({
        title: '',
      })
    }
    const { data: { data, msg, statusCode, totalSize } } = await queryServerList({
      pageSize: 10,
      pageNum: pageNum,
      onlineStatus: "onLine",
      reviewStatus: "reviewed"
    });
    if (this.state.loading) {
      Taro.hideLoading()
    }
    if (statusCode === '1') {
      this.setState({
        serverList: pageNum === 1 ? data : serverList.concat(data),
        totalSize,
        pageNum: pageNum + 1,
        loading: false
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
    const { serverList, totalSize, loading } = this.state;
    return (
      <View className='worker-list-page'>
        {/* marquee={true} */}
        <AtNoticebar icon='volume-plus' >好护工平台目前正大力征集护工信息，稍后正式开放使用，敬请期待！</AtNoticebar>
        <ScrollView
          className='scrollview'
          scrollY
          style='height:100%;'
          scrollWithAnimation
          onScrollToLower={this.getServerList.bind(this)} // 使用箭头函数的时候 可以这样写 `onScrollToUpper={this.onScrollToUpper}`
        >
          {
            !loading && (serverList.length > 0 ? serverList.map((item, i) => {
              return <WorkerCard data={item} key={`worker_${i}`} />
            }) : <View className='no-data'>
              <Image src={noDataImg} className='no-data-img' />
              <view>暂无数据</view>
            </View>)
          }
          {serverList.length > 0 && serverList.length === totalSize && <View className='no-more'>没有更多数据了</View>}
        </ScrollView>
      </View>
    )
  }
}

export default WorkerList

