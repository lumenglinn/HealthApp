import React, { Component } from 'react'
import Taro, { setWifiList } from '@tarojs/taro'
import { View, Button, Image, Text, Input, RadioGroup, Radio, Label, Checkbox, CheckboxGroup, Textarea } from '@tarojs/components'
import { AtImagePicker, AtRadio, AtCheckbox } from 'taro-ui'
import { queryHospital, querySkill, createWorker, uploadPic } from './service';
// import themeColor from '../../utils/constant';

import "taro-ui/dist/style/components/flex.scss";
import "taro-ui/dist/style/components/image-picker.scss";
// import "taro-ui/dist/style/components/checkbox.scss";
// import "taro-ui/dist/style/components/radio.scss";
import "taro-ui/dist/style/components/icon.scss";
import './index.scss'

// 错误提示
const toastError = msg => Taro.showToast({
  title: msg,
  icon: 'none',
})
export default class Index extends Component {
  state = {
    realName: '',
    age: '',
    sex: 'woman',
    identity: '',
    telephone: '',
    language: '["普通话", "粤语"]',
    languageOptions: [
      {
        value: "普通话",
        label: "普通话",
      }, {
        value: "粤语",
        label: "粤语"
      }
    ],
    hospitalOptions: [],
    hospitalIdList: [],
    skillOptions: [],
    skillIdList: [],
    filesList: [],
    introduce: '',
    isAgree: true
  }
  componentWillMount() { }

  componentDidMount() {
    this.queryHospitalList();
    this.querySkillList();
  }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  // 查询所有医院
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

  // 查询所有技能
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

  // 图片选择
  handlePicChange = async (file, doType, index) => { // doType代表操作类型，移除图片和添加图片,index为移除图片时返回的图片下标
    // 兼容taro ui bug
    setTimeout(() => {
      if (doType === 'add') {
        this.uploadPic(file);
      } else {
        this.removePic(index);
      }
    }, 300);
  }

  // 删除图片
  removePic = (index) => {
    const { filesList } = this.state;
    const list = [...filesList];
    list.splice(index, 1);
    this.setState({
      filesList: list
    })
  }

  // 上传图片
  uploadPic = (file) => {
    const self = this;
    const { filesList } = this.state;
    Taro.uploadFile({
      url: 'https://hugong.chenshengbao.com/upload/pic', //仅为示例，非真实的接口地址
      filePath: file[file.length - 1].url,
      name: 'file',
      formData: {
        'user': 'test'
      },
      success(res) {
        const result = JSON.parse(res.data);
        if (result.statusCode === '10001') {
          self.setState({
            filesList: filesList.concat({ url: result.data })
          })
        } else {
          Taro.showToast({
            title: result.msg,
            icon: 'none',
          })
        }
      },
      fail(res) {
        Taro.showToast({
          title: res.errMsg,
          icon: 'none',
        })
      }
    })
  }

  // 注册
  handleRegister = async () => {
    if (!this.validateData()) {
      return;
    }
    const { realName, age, sex, identity, telephone, language, skillIdList, hospitalIdList, filesList, introduce } = this.state;
    const { data: { data, msg, statusCode } } = await createWorker({
      realName,
      age,
      sex,
      identity,
      telephone,
      language,
      skillIdList,
      hospitalIdList,
      introduce,
      picUrlDtoList: filesList
    });
    if (statusCode === '10001') {
      Taro.navigateTo({
        url: '/pages/result/index'
      })
      // Taro.showToast({
      //   title: "注册成功",
      //   icon: 'success',
      // })
    } else {
      Taro.showToast({
        title: msg,
        icon: 'none',
      })
    }
  }

  // 格式校验
  validateData = () => {
    const { realName, age, sex, identity, telephone, language, skillIdList, hospitalIdList, filesList, introduce, isAgree } = this.state;
    if (!realName) {
      toastError('请输入姓名！');
      return false;
    }
    if (!age) {
      toastError('请输入年龄！');
      return false;
    }
    // if (!identity) {
    //   toastError('请输入身份证号！');
    //   return false;
    // }
    if (!telephone) {
      toastError('请输入电话号码！');
      return false;
    }
    if (telephone.length < 11) {
      toastError('电话号码格式不正确！');
      return false;
    }
    // if (!introduce) {
    //   toastError('请输入个人介绍！');
    //   return false;
    // }
    if (!isAgree) {
      toastError('请先勾选协议！');
      return false;
    }
    return true;
  }

  // 查看协议
  handleJumpProtocol = () => {
    Taro.navigateTo({
      url: '/pages/registerProtocol/index'
    })
  }

  render() {
    const { realName, age, sex, identity, telephone, language, languageOptions, skillOptions, hospitalOptions, skillIdList, hospitalIdList, introduce, isAgree } = this.state;
    return (
      <View className='register-page' >
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
                  type='number'
                  maxlength={11}
                  placeholder='请输入联系电话'
                  onInput={e => this.setState({ telephone: e.target.value })} /></View>
            </View>
          </View>
          <View className='info-item'>
            <View className="at-row">
              <View className='at-col at-col-4 info-label'>掌握的语言</View>
              <View className='at-col at-col-8'>
                {/* <AtCheckbox
                  options={languageOptions}
                  selectedList={JSON.parse(language)}
                  onChange={(e, ...a) => console.log(e, a, 'aaa')}
                /> */}
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
          <View className='info-item'>
            <View className="at-row ">
              <View className='at-col at-col-4 info-label'>上传生活照</View>
              <View className='at-col at-col-8'>
                <View className="upload-files">
                  <AtImagePicker
                    files={this.state.filesList}
                    onChange={this.handlePicChange}
                    multiple={false}
                  />
                </View>
              </View>
            </View>
          </View>
          <View className='info-item'>
            <View className="at-row">
              <View className='at-col at-col-4 info-label'>自我介绍</View>
              <View className='at-col at-col-8'>
                <Textarea className="my-textarea" value={introduce} onInput={e => this.setState({ introduce: e.detail.value })} />
              </View>
            </View>
          </View>
        </View>
        <View className="protocol-box" >
          <CheckboxGroup onChange={() => this.setState({ isAgree: !isAgree })}>
            <Checkbox color='#04a9f5' checked={isAgree} value={'选择'} >点击提交报名，即表示您已阅读并同意</Checkbox><Text onClick={this.handleJumpProtocol}>《一键科技服务平台注册协议》</Text>
          </CheckboxGroup>
        </View>
        <View className="btn-register" onClick={this.handleRegister}>马上申请</View>
      </View>
    )
  }
}
