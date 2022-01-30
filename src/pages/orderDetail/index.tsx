import React, { Component } from 'react'
import Taro, { Config, getCurrentInstance } from '@tarojs/taro'
import { View, ScrollView, Image } from '@tarojs/components'
// import { connect } from '@tarojs/redux'
// import Api from '../../utils/request'
// import Tips from '../../utils/tips'
import { OrderDetailProps, OrderDetailState } from './orderDetail.interface'
import './orderDetail.scss'
import { queryOrderDetail } from './service';

// @connect(({ orderDetail }) => ({
//     ...orderDetail,
// }))

class OrderDetail extends Component<OrderDetailProps, OrderDetailState> {
  state = {
    orderDetail: {
      serverList: [
        {
          "serverId": "1631030611623",
          "userId": "1626621674078",
          "realName": "张大龙",
          "fileId": "0",
          "state": null,
          "remark": null,
          "updateAt": "2021-09-14T15:00:03.000+0000",
          "createAt": "2021-09-08 00:03:31",
          "serverNum": "0",
          "identity": "",
          "introduce": null,
          "reviewStatus": "reviewed",
          "onlineStatus": "onLine",
          "telephone": "18825182319",
          "age": "23",
          "sex": "woman",
          "language": "[\"普通话\", \"粤语\"]",
          "fileVoList": []
        }, {
          "serverId": "1631030611623",
          "userId": "1626621674078",
          "realName": "张大龙",
          "fileId": "0",
          "state": null,
          "remark": null,
          "updateAt": "2021-09-14T15:00:03.000+0000",
          "createAt": "2021-09-08 00:03:31",
          "serverNum": "0",
          "identity": "",
          "introduce": null,
          "reviewStatus": "reviewed",
          "onlineStatus": "onLine",
          "telephone": "18825182319",
          "age": "23",
          "sex": "woman",
          "language": "[\"普通话\", \"粤语\"]",
          "fileVoList": []
        }
      ]
    }
  }

  componentDidMount() {

  }

  queryDetail = async () => {
    const { data: { data, msg, statusCode, totalSize } } = await queryOrderDetail({
      orderId: getCurrentInstance().router.params.orderId
    });
    if (statusCode === '1') {
      // this.setState({
      //   orderDetail: data
      // })
    }
  }

  render() {
    const { orderDetail } = this.state
    return (
      <View className='orderDetail-page'>
        <View className='worker-list'>
          {
            orderDetail.serverList.map((it, i) => {
              return <View className='worker-item' key={`worker_${i}`} >
                <Image mode='aspectFill' className='worker-header' src={it.fileVoList[0]?.url || 'https://haohugongtest.yukangpeng.com/pic/1626797901125.jpg'} />
                <View className='worder-info'>{it.realName}</View>
              </View>
            })
          }
        </View>
        <View className='order-detail'>
          <View>共{orderDetail.serverList.length}位护工</View>
          <View>订单编号：002</View>
          <View>下单时间：2021-1-1 23:00:00</View>
          <View>状态：已完成</View>
        </View>
      </View>
    )
  }
}

export default OrderDetail
