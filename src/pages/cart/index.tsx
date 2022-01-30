import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux';
import Taro, { Config } from '@tarojs/taro'
import { View, ScrollView, Image, Icon } from '@tarojs/components'
// import { connect } from '@tarojs/redux'
// import Api from '../../utils/request'
// import Tips from '../../utils/tips'
import { OrderDetailProps, OrderDetailState } from './orderDetail.interface'
import { preOrder } from './service';
import noDataImg from '../../assets/image/no-data.png';
import './index.scss'

@connect(({ global }) => ({
  ...global,
}))
class Cart extends Component<OrderDetailProps, OrderDetailState> {
  state = {
  }

  componentDidMount() {
  }

  submitOrder = async () => {
    const { cartServerList } = this.props
    const { data: { data, msg, statusCode } } = await preOrder({
      serverList: cartServerList
    })
    console.log(data)
  }

  handleCart = (serverId) => {
    const { dispatch, cartServerList } = this.props
    const newList = [...cartServerList]
    var index = newList.findIndex(item => item.serverId === serverId);
    if (index > -1) {
      newList.splice(index, 1);
    } else {
      newList.push({ serverId });
    }
    dispatch({
      type: 'global/updateData',
      payload: {
        cartServerList: newList,
      }
    });
  }

  deleteCart = (serverId) => {
    const { dispatch, cartList } = this.props
    const newList = [...cartList]
    for (let i = 0; i < newList.length; i++) {
      if (newList[i].serverId == serverId) {
        newList.splice(i, 1);
        break
      }
    }
    dispatch({
      type: 'global/updateData',
      payload: {
        cartList: newList,
      }
    });
  }

  render() {
    const { cartList, cartServerList } = this.props
    return (
      <View className='cart-page'>
        {
          cartList.length > 0 ? <Fragment>
            <View className='worker-list'>
              {
                cartList.map((item, i) => {
                  return <View className='worker-item' key={`worker_${i}`}>
                    {cartServerList.findIndex(it => it.serverId === item.serverId) > -1 ? <Icon size='18' type='success' color='#78c8ec' className='select-icon' onClick={this.handleCart.bind(this, item.serverId)} />
                      : <View className='select-icon non-select' onClick={this.handleCart.bind(this, item.serverId)} />}
                    <Image mode='aspectFill' className='worker-header' src={item.fileVoList[0]?.url || 'https://haohugongtest.yukangpeng.com/pic/1626797901125.jpg'} />
                    <View className='worder-info'>{item.realName}</View>
                    <View className='delete-item' onClick={this.deleteCart.bind(this, item.serverId)}>删除</View>
                  </View>
                })
              }
            </View>
            <View className='order-detail'>
              <View>共{cartServerList.length}位护工</View>
              {/* <View>订单编号：002</View>
          <View>下单时间：2021-1-1 23:00:00</View>
          <View>状态：已完成</View> */}
              <View className='submit-order'></View>
              <View className='delete-item' onClick={this.submitOrder}>下单</View>
            </View>
          </Fragment>
            :
            <View className='no-data'>
              <Image src={noDataImg} className='no-data-img' />
              <view>暂无数据</view>
            </View>
        }
      </View>
    )
  }
}

export default Cart
