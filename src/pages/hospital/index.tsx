
import React, { Component } from 'react'
import Taro, { Config } from '@tarojs/taro'
import { View, ScrollView, Icon } from '@tarojs/components'
import { AtButton } from 'taro-ui'
import { queryHospital } from './service';
import { HospitalProps, HospitalState } from './hospital.interface'
import './hospital.scss'

class Hospital extends Component<HospitalProps, HospitalState> {
  state = {
    hospitalList: [],
    hospitalId: []
  }

  componentDidMount() {
    this.queryHospitalList();
  }

  // 查询医院列表
  queryHospitalList = async () => {
    const { data: { data, msg, statusCode } } = await queryHospital({
      city: "湛江市",
      area: "霞山区"
    })
    if (statusCode === '1') {
      const options = data.map((item: any) => {
        return item
      });
      this.setState({
        hospitalList: options
      })
    } else {
      Taro.showToast({
        title: msg,
        icon: 'none',
      })
    }
  }

  handleSelect(hospital) {
    const { hospitalId } = this.state
    var index = hospitalId.indexOf(hospital.hospitalId);
    if (index > -1) {
      hospitalId.splice(index, 1)
    } else {
      hospitalId.push(hospital.hospitalId)
    }
    this.setState({
      hospitalId
    })
  }

  render() {
    const { hospitalList, hospitalId } = this.state
    return (
      <View className='hospital-page'>
        <ScrollView
          className='scrollview'
          scrollY
          style='height:100%;'
          scrollWithAnimation
          onScrollToLower={this.queryHospitalList.bind(this)} // 使用箭头函数的时候 可以这样写 `onScrollToUpper={this.onScrollToUpper}`
        >
          {
            hospitalList.map((item, i) => {
              return <View className='hospital-item' key={`hospital_${i}`} onClick={this.handleSelect.bind(this, item)}>
                <View>{item.name}</View>
                {
                  !!hospitalId.includes(item.hospitalId) && <Icon size='16' type='success' color='#78c8ec' />
                }
              </View>
            })
          }
          <AtButton type='primary' size='small' className='btn'>确定</AtButton>
        </ScrollView>
      </View>
    )
  }
}

export default Hospital
