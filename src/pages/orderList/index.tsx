import React, { Component } from 'react'
import Taro, { Config } from '@tarojs/taro'
import { connect } from 'react-redux';
import { View, ScrollView, Image } from '@tarojs/components'
// import { connect } from '@tarojs/redux'
// import Api from '../../utils/request'
// import Tips from '../../utils/tips'
import { queryOrderList } from './service';
import { OrderListProps, OrderListState } from './orderList.interface'
import './orderList.scss'
import noDataImg from '../../assets/image/no-data.png';

@connect(({ global }) => ({
  ...global,
}))
class OrderList extends Component<OrderListProps, OrderListState> {
  state = {
    orderList: [{
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
    }, {
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
    }]
  }

  componentDidMount() {
    this.queryList()
  }

  queryList = async () => {
    console.log(this.props, 888)
    const { data: { data, msg, statusCode, totalSize } } = await queryOrderList({
      userId: this.props.userInfo.userId
    });
    if (statusCode === '1') {
      // this.setState({
      //   orderList: data
      // })
    }
  }

  jumpOrderDetail = (orderId) => {
    Taro.navigateTo({
      url: `/pages/orderDetail/index?orderId=${orderId}`
    })
  }

  render() {
    const { orderList } = this.state;
    return (
      <View className='orderList-page'>
        {
          orderList.length > 0 ? <ScrollView
            className='scrollview'
            scrollY
            style='height:100%;'
            scrollWithAnimation
            onScrollToLower={() => { }} // 使用箭头函数的时候 可以这样写 `onScrollToUpper={this.onScrollToUpper}`
          >
            {
              orderList.map((item, i) => {
                return <View className='order-item' key={`order_${i}`} onClick={this.jumpOrderDetail.bind(this, item.orderId)}>
                  <View className='order-title'>订单{i + 1}</View>
                  <View className='worker-list'>
                    {
                      item.serverList.map((it, i) => {
                        return <View className='worker-item' key={`worker_${i}`} >
                          <Image mode='aspectFill' className='worker-header' src={it.fileVoList[0]?.url || 'https://haohugongtest.yukangpeng.com/pic/1626797901125.jpg'} />
                          <View className='worder-info'>{it.realName}</View>
                        </View>
                      })
                    }
                  </View>
                  <View className='order-detail'>
                    <View className=''>共{item.serverList.length}位护工</View>
                    <View className=''>订单日期：2021-1-1</View>
                    <View className=''>状态：已完成</View>
                  </View>
                </View>
              })
            }
          </ScrollView> : <View className='no-data'>
            <Image src={noDataImg} className='no-data-img' />
            <view>暂无数据</view>
          </View>
        }

      </View>
    )
  }
}

export default OrderList
