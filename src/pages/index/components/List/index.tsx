import React, { Component } from 'react'
import { View, Button, Text } from '@tarojs/components'
import WorkerCard from '../WorkerCard'
// import { add, minus, asyncAdd } from '../../actions/counter'
import { queryServerList } from '../../service';
import { AtButton } from 'taro-ui'
import './index.scss'



class List extends Component {
  state = {
    serverList: [],
    totalSize: 99999,
  }
  componentDidMount() {
    this.queryServerList();
  }

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
    const { serverList } = this.state;
    return (
      <View className='index-list'>
        {
          serverList.map((item, i) => {
            return <WorkerCard data={item} key={`worker_${i}`} />
          })
        }
      </View>
    )
  }
}

export default List

