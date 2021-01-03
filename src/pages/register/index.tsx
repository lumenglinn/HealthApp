import React, { Component } from 'react'
import Taro from '@tarojs/taro'
import { View, Button, Image, Text, Input, RadioGroup, Radio, Label, Checkbox, CheckboxGroup, Textarea } from '@tarojs/components'
import { AtImagePicker, AtCheckbox } from 'taro-ui'
import { queryHospital, querySkill, createWorker } from './service';

import "taro-ui/dist/style/components/flex.scss";
import "taro-ui/dist/style/components/image-picker.scss";
// import "taro-ui/dist/style/components/checkbox.scss";
import './index.scss'

export default class Index extends Component {
  state = {
    realName: '',
    age: '',
    sex: 'woman',
    identity: '',
    telephone: '',
    language: '["普通话", "粤语"]',
    hospitalOptions: [],
    hospitalIdList: [],
    skillOptions: [],
    skillIdList: [],
    files: [{
      url: 'https://storage.360buyimg.com/mtd/home/111543234387022.jpg',
    },
    {
      url: 'https://storage.360buyimg.com/mtd/home/111543234387022.jpg',
    },
    {
      url: 'https://storage.360buyimg.com/mtd/home/111543234387022.jpg',
    }]
  }
  componentWillMount() { }

  componentDidMount() {
    this.queryHospitalList();
    this.querySkillList();
  }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  queryHospitalList = async () => {
    const { data: { data, msg, statusCode } } = await queryHospital({
      city: "湛江市",
      area: "霞山区"
    })
    if (statusCode === '10001') {
      const options = data.map((item: any) => {
        return {
          text: item.name,
          value: item.hospitalId,
          checked: true
        }
      });
      this.setState({
        hospitalOptions: options,
        hospitalIdList: data.map(e => e.hospitalId)
      })
    } else {
      Taro.showToast({
        title: msg,
        icon: 'none',
      })
    }
  }

  querySkillList = async () => {
    const { data: { data, msg, statusCode } } = await querySkill();
    if (statusCode === '10001') {
      const options = data.map((item: any) => {
        return {
          text: item.itemName,
          value: item.skillId,
          checked: true
        }
      });
      this.setState({
        skillOptions: options,
        skillIdList: data.map(e => e.skillId)
      })
    } else {
      Taro.showToast({
        title: msg,
        icon: 'none',
      })
    }
  }

  handleRegister = async () => {
    const { realName, age, sex, identity, telephone, language, skillIdList, hospitalIdList } = this.state;
    const { data: { data, msg, statusCode } } = await createWorker({
      realName,
      age,
      sex,
      identity,
      telephone,
      language,
      skillIdList,
      hospitalIdList
    });
    if (statusCode === '10001') {
      Taro.showToast({
        title: "注册成功",
        icon: 'success',
      })
    } else {
      Taro.showToast({
        title: msg,
        icon: 'none',
      })
    }
  }

  render() {
    const { realName, age, sex, identity, telephone, language, skillOptions, hospitalOptions, skillIdList, hospitalIdList } = this.state;
    return (
      <View className='register-page'>
        <View className="info-list">
          <View className='info-item'>
            <View className="at-row">
              <View className='at-col at-col-4 info-label'>您的姓名</View>
              <View className='at-col at-col-8'>
                <Input
                  value={this.state.realName}
                  className="info-value"
                  type='text'
                  placeholder='请输入姓名'
                  onInput={e => this.setState({ realName: e.target.value })} />
              </View>
            </View>
          </View>
          <View className='info-item'>
            <View className="at-row">
              <View className='at-col at-col-4 info-label'>您的年龄</View>
              <View className='at-col at-col-8'>
                <Input
                  value={age}
                  className="info-value"
                  type='number'
                  placeholder='请输入年龄'
                  onInput={e => this.setState({ age: e.target.value })} />
              </View>
            </View>
          </View>
          <View className='info-item'>
            <View className="at-row">
              <View className='at-col at-col-4 info-label'>您的性别</View>
              <View className='at-col at-col-8'>
                <View className='radio-list'>
                  <RadioGroup onChange={e => this.setState({ sex: e.target.value })}>
                    <View className="radio-list__item" >
                      <Label className='radio-list__label' for={'man'}>
                        <Radio className='radio-list__radio' color='#04a9f5' value={'man'} checked={false}>男</Radio>
                      </Label>
                    </View>
                    <View className="radio-list__item" >
                      <Label className='radio-list__label' for={'woman'} >
                        <Radio className='radio-list__radio' color='#04a9f5' value={'woman'} checked={true}>女</Radio>
                      </Label>
                    </View>
                  </RadioGroup>
                </View>
              </View>
            </View>
          </View>
          <View className='info-item'>
            <View className="at-row">
              <View className='at-col at-col-4 info-label'>您的身份证号</View>
              <View className='at-col at-col-8'>
                <Input
                  value={identity}
                  className="info-value"
                  type='idcard'
                  placeholder='请输入身份证号'
                  onInput={e => this.setState({ identity: e.target.value })} /></View>
            </View>
          </View>
          <View className='info-item'>
            <View className="at-row">
              <View className='at-col at-col-4 info-label'>您的联系电话</View>
              <View className='at-col at-col-8'>
                <Input
                  value={telephone}
                  className="info-value"
                  type='text'
                  placeholder='请输入联系电话'
                  onInput={e => this.setState({ telephone: e.target.value })} /></View>
            </View>
          </View>
          <View className='info-item'>
            <View className="at-row">
              <View className='at-col at-col-4 info-label'>掌握的语言</View>
              <View className='at-col at-col-8'>
                <CheckboxGroup onChange={e => this.setState({ language: JSON.stringify(e.target.value) })}>
                  <View className='checkbox-list'>
                    <View className="checkbox-list__item">
                      <Label className='checkbox-list__label' for={'普通话'} >
                        <Checkbox className='checkbox-list__checkbox' color='#04a9f5' value={'普通话'} checked={true}>普通话</Checkbox>
                      </Label>
                    </View>
                    <View className="checkbox-list__item">
                      <Label className='checkbox-list__label' for={'粤语'} >
                        <Checkbox className='checkbox-list__checkbox' color='#04a9f5' value={'粤语'} checked={true}>粤语</Checkbox>
                      </Label>
                    </View>
                  </View>
                </CheckboxGroup>
              </View>
            </View>
          </View>
          <View className='info-item'>
            <View className='info-label'>护理技能</View>
            <CheckboxGroup onChange={e => this.setState({ skillIdList: e.target.value })}>
              <View className='checkbox-list'>
                {skillOptions.map((item, i) => {
                  return (
                    <View className="checkbox-list__item" key={`checkout_${i}`}>
                      <Label className='checkbox-list__label' for={i} key={i}>
                        <Checkbox className='checkbox-list__checkbox' color='#04a9f5' value={item.value} checked={item.checked}>{item.text}</Checkbox>
                      </Label>
                    </View>
                  )
                })}
              </View>
            </CheckboxGroup>
          </View>
          <View className='info-item'>
            <View className='info-label'>可服务医院</View>
            <CheckboxGroup onChange={e => this.setState({ hospitalIdList: e.target.value })}>
              <View className='checkbox-list'>
                {hospitalOptions.map((item, i) => {
                  return (
                    <View className="checkbox-list__item" key={`checkout_${i}`}>
                      <Label className='checkbox-list__label' for={i} key={i}>
                        <Checkbox className='checkbox-list__checkbox' color='#04a9f5' value={item.value} checked={item.checked}>{item.text}</Checkbox>
                      </Label>
                    </View>
                  )
                })}
              </View>
            </CheckboxGroup>
          </View>
          {/* <View className='info-item'>
            <View className="at-row">
              <View className='at-col at-col-4 info-label'>您的姓名</View>
              <View className='at-col at-col-8'>
                <View className='checkbox-list'>
                  {this.state.list.map((item, i) => {
                    return (
                      <View className="checkbox-list__item" key={`checkout_${i}`}>
                        <Label className='checkbox-list__label' for={i} key={i}>
                          <Checkbox className='checkbox-list__checkbox' color='#04a9f5' value={item.value} checked={item.checked}>{item.text}</Checkbox>
                        </Label>
                      </View>
                    )
                  })}
                </View>
              </View>
            </View>
          </View> */}
          {/* <View className='info-item'>
            <View className="at-row">
              <View className='at-col at-col-4 info-label'>自我介绍</View>
              <View className='at-col at-col-8'>
                <Textarea className="my-textarea" />
              </View>
            </View>
          </View>
          <View className='info-item'>
            <View className="at-row ">
              <View className='at-col at-col-4 info-label'>上传生活照</View>
              <View className='at-col at-col-8'>
                <View className="upload-files">
                  <AtImagePicker
                    files={this.state.files}
                    onChange={() => { }}
                  />
                </View>
              </View>
            </View>
          </View> */}
        </View>
        <View className="btn-register" onClick={this.handleRegister}>马上申请</View>
        {/* <Image src="http://www.1haohg.com/images/recruit_btn_3.png" mode="widthFix" className="bg-img" /> */}
      </View>
    )
  }
}
