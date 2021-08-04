import React, { Component } from 'react'
import { View, ScrollView, Text } from '@tarojs/components'
import WorkerCard from '../WorkerCard'
// import { add, minus, asyncAdd } from '../../actions/counter'
import { queryServerList } from '../../service';
import { AtButton } from 'taro-ui'
import './index.scss'

class List extends Component {
  state = {
    serverList: [],
    pageNum: 1,
    totalSize: 99999,
  }
  componentDidMount() {
    this.queryServerList();
  }

  queryServerList = async () => {
    const { data: { data, msg, statusCode, totalSize } } = await queryServerList({
      pageSize: 10,
      pageNum: this.state.pageNum,
      onlineStatus: "onLine",
      reviewStatus: "reviewed"
    });
    if (statusCode === '1') {
      this.setState({
        serverList: data,
        totalSize,
        pageNum: this.state.pageNum + 1
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
    const { serverList } = this.state;
    return (
      <View className='index-list'>
        <ScrollView
          className='scrollview'
          scrollY
          scrollWithAnimation
          onScrollToLower={this.queryServerList.bind(this)} // 使用箭头函数的时候 可以这样写 `onScrollToUpper={this.onScrollToUpper}`
        >
          {
            serverList.map((item, i) => {
              return <WorkerCard data={item} key={`worker_${i}`} />
            })
          }
        </ScrollView>

      </View>
    )
  }
}

export default List

