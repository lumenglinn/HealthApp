import React, { Component } from 'react'
import { connect } from 'react-redux';
import Taro from '@tarojs/taro'
import { View, ScrollView, Button, Image } from '@tarojs/components'
import { AtNoticebar, AtButton, AtDrawer, AtCheckbox } from 'taro-ui'
import WorkerCard from './components/WorkerCard'
import { queryServerList } from './service';
import noDataImg from '../../assets/image/no-data.png';
import './index.scss'

@connect(({ global }) => ({
  ...global,
}))
class WorkerList extends Component {
  state = {
    serverList: [],
    pageNum: 1,
    totalSize: 99999,
    loading: true,
    showDrawer: false,
    genderOption: [{
      value: 'man',
      label: '男'
    }, {
      value: 'woman',
      label: '女',
    }],
    gender: ['man'],
    languageOption: [{
      value: '普通话',
      label: '普通话'
    }, {
      value: '粤语',
      label: '粤语',
    }],
    language: [],
    // ageOption: [{
    //   value: 'list2',
    //   label: '40-49'
    // }, {
    //   value: 'list3',
    //   label: '50-59',
    // }, {
    //   value: 'list3',
    //   label: '60以上',
    // }],
    // ageCheckedList: [],
    nativePlaceOption: [{
      value: '湛江本地',
      label: '湛江本地'
    }, {
      value: '非湛江本地',
      label: '非湛江本地',
    }],
    nativePlace: [],
  }

  componentDidShow() {
    this.setState({ pageNum: 1 })
    this.getServerList();
  }

  getServerList = async () => {
    const { serverList, pageNum, gender, language, nativePlace } = this.state
    const { hospitalId } = this.props
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
      reviewStatus: "reviewed",
      gender: gender.length > 0 ? gender[0] : [],
      language: language.length > 0 ? language[0] : [],
      nativePlace: nativePlace.length > 0 ? nativePlace[0] : [],
      hospitalId: hospitalId.length > 0 ? hospitalId[0] : []
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

  selectHospital = () => {
    Taro.navigateTo({
      url: `/pages/hospital/index`
    })
  }

  handleDrawer = action => {
    this.setState({
      showDrawer: action
    })
  }

  handleChange = (type, value) => {
    this.setState({
      [type]: value
    })
  }

  render() {
    const {
      serverList,
      totalSize,
      loading,
      showDrawer,
      genderOption,
      gender,
      // ageOption,
      // ageCheckedList,
      languageOption,
      language,
      nativePlaceOption,
      nativePlace
    } = this.state;

    return (
      <View className='worker-list-page'>
        <View className='top-wrap'>
          <View className='flex-box flex-around'>
            <AtButton type='secondary' size='small' className='btn' onClick={this.selectHospital}>选择医院</AtButton>
            <AtButton type='secondary' size='small' className='btn' onClick={this.handleDrawer.bind(this, true)}>筛选</AtButton>
          </View>
        </View>
        {/* <AtNoticebar icon='volume-plus' >好护工平台目前正大力征集护工信息，稍后正式开放使用，敬请期待！</AtNoticebar> */}
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
        <AtDrawer
          show={showDrawer}
          mask
          right
          onClose={this.getServerList.bind(this)}
        >
          <View className='drawer-item'>
            <View className='item-title'>性别</View>
            <AtCheckbox
              options={genderOption}
              selectedList={this.state.gender}
              onChange={this.handleChange.bind(this, 'gender')}
            />
          </View>
          {/* <View className='drawer-item'>
            <View className='item-title'>年龄</View>
            <AtCheckbox
              options={ageOption}
              selectedList={ageCheckedList}
              onChange={val => this.handleChange.bind(this, val, 'age')}
            />
          </View> */}
          <View className='drawer-item'>
            <View className='item-title'>语言</View>
            <AtCheckbox
              options={languageOption}
              selectedList={language}
              onChange={this.handleChange.bind(this, 'language')}
            />
          </View>
          <View className='drawer-item'>
            <View className='item-title'>贯籍</View>
            <AtCheckbox
              options={nativePlaceOption}
              selectedList={nativePlace}
              onChange={this.handleChange.bind(this, 'nativePlace')}
            />
          </View>
          {/* 湛江本地 非湛江本地 */}
          <AtButton type='primary' size='small' className='btn' onClick={this.handleDrawer.bind(this, false)}>确定</AtButton>
        </AtDrawer>
      </View>
    )
  }
}

export default WorkerList

