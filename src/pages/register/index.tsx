import React, { Component } from 'react'
import Taro, { setWifiList, getCurrentInstance } from '@tarojs/taro'
import { connect } from 'react-redux';
import { View, Button, Image, Text, Input, RadioGroup, Radio, Label, Checkbox, CheckboxGroup, Textarea } from '@tarojs/components'
import { AtImagePicker, AtRadio, AtCheckbox } from 'taro-ui'
import { queryWorker, queryHospital, querySkill, createWorker, updateWorker, uploadPic } from './service';

import './index.scss'
import { wxLogin } from '../../utils/function'

// 错误提示
const toastError = msg => Taro.showToast({
  title: msg,
  icon: 'none',
})

@connect(({ global }) => ({
  ...global,
}))
export default class Register extends Component {
  state = {
    serverId: null,
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
    const { userInfo } = this.props
    this.setState({
      telephone: userInfo.telephone
    })
    const isUpdate = userInfo.identity === 'server'
    if (isUpdate) {
      this.queryServerDetail()
    } else {
      this.queryHospitalList();
      this.querySkillList();
    }
  }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  // 反显护工信息
  queryServerDetail = async () => {
    const { serverId } = getCurrentInstance().router.params
    if (!serverId) {
      return
    }
    const { data: { data, msg, statusCode } } = await queryWorker({ serverId });
    if (statusCode === '1') {
      const {
        realName,
        age,
        sex,
        identity,
        telephone,
        language,
        skillItemList,
        hospitalList,
        introduce,
        fileVoList
      } = data
      this.setState({
        serverId,
        realName,
        age,
        sex,
        identity,
        telephone,
        language,
        skillIdList: skillItemList.map(e => e.skillId),
        hospitalIdList: hospitalList.map(e => e.hospitalId),
        introduce: introduce || '',
        filesList: fileVoList
      })
      this.queryHospitalList();
      this.querySkillList();
    } else {
      Taro.showToast({
        title: msg,
        icon: 'none',
      })
    }
  }

  // 查询所有医院
  queryHospitalList = async () => {
    const { userInfo } = this.props
    const { hospitalIdList } = this.state
    const isUpdate = userInfo.identity === 'server'
    const { data: { data, msg, statusCode } } = await queryHospital({
      city: "湛江市",
      // area: "霞山区"
    })
    if (statusCode === '1') {
      const options = data.map((item: any) => {
        return {
          text: item.name,
          value: item.hospitalId,
          checked: isUpdate ? hospitalIdList.includes(item.hospitalId) : true
        }
      });
      if (isUpdate) {
        this.setState({
          hospitalOptions: options,
        })
      } else {
        this.setState({
          hospitalOptions: options,
          hospitalIdList: data.map(e => e.hospitalId)
        })
      }
    } else {
      Taro.showToast({
        title: msg,
        icon: 'none',
      })
    }
  }

  // 查询所有技能
  querySkillList = async () => {
    const { userInfo } = this.props
    const { skillIdList } = this.state
    const isUpdate = userInfo.identity === 'server'
    const { data: { data, msg, statusCode } } = await querySkill();
    if (statusCode === '1') {
      const options = data.map((item: any) => {
        return {
          text: item.itemName,
          value: item.skillId,
          checked: isUpdate ? skillIdList.includes(item.skillId) : true
        }
      });
      if (isUpdate) {
        this.setState({
          skillOptions: options
        })
      } else {
        this.setState({
          skillOptions: options,
          skillIdList: data.map(e => e.skillId)
        })
      }
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
      // url: 'https://haohugongpro.yukangpeng.com/upload/pic',
      url: 'https://haohugongtest.yukangpeng.com/upload/pic',
      filePath: file[file.length - 1].url,
      name: 'file',
      formData: {
        'user': 'test'
      },
      success(res) {
        const result = JSON.parse(res.data);
        if (result.statusCode === '1') {
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

  handleSubmit = () => {
    const { userInfo } = this.props
    const isUpdate = userInfo.identity === 'server'
    if (isUpdate) {
      this.handleUpdate()
    } else {
      this.handleRegister()
    }
  }
  // 注册
  handleRegister = async () => {
    if (!this.validateData()) {
      return;
    }
    const { dispatch } = this.props;
    const { realName, age, sex, telephone, identity, language, skillIdList, hospitalIdList, filesList, introduce } = this.state;
    const params = {
      realName,
      age,
      sex,
      identity,
      telephone,
      language,
      skillIdList,
      hospitalIdList,
      introduce,
      picUrlDtoList: filesList,
    }

    const { data: { data, msg, statusCode } } = await createWorker(params);
    if (statusCode === '1') {
      Taro.navigateTo({
        url: '/pages/result/index'
      })
      wxLogin(res => {
        dispatch({
          type: 'global/login',
          payload: {
            code: res
          }
        });
      })
    } else {
      Taro.showToast({
        title: msg,
        icon: 'none',
      })
    }
  }

  // 更新
  handleUpdate = async () => {
    if (!this.validateData()) {
      return;
    }
    const { dispatch } = this.props;

    const { realName, age, sex, identity, telephone, language, skillIdList, hospitalIdList, filesList, introduce, serverId } = this.state;
    const params = {
      realName,
      age,
      sex,
      identity,
      telephone,
      language,
      skillIdList,
      hospitalIdList,
      introduce,
      picUrlDtoList: filesList,
      serverId
    }
    const { data: { data, msg, statusCode } } = await updateWorker(params);
    if (statusCode === '1') {
      Taro.showToast({
        title: '更新信息成功',
        icon: 'none',
      })
      wxLogin(res => {
        dispatch({
          type: 'global/login',
          payload: {
            code: res
          }
        });
      })
      setTimeout(() => {
        wx.switchTab({
          url: `/pages/index/index`
        })
      }, 2000);
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
    const { userInfo } = this.props
    const isUpdate = userInfo.identity === 'server'

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
    if (!isAgree && !isUpdate) {
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
    const { userInfo } = this.props
    const isUpdate = userInfo.identity === 'server'

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
              <View className='at-col at-col-4 info-label'>您的联系电话</View>
              <View className='at-col at-col-8 info-value text-grey'>
                {/* {telephone} */}
                <Input
                  value={telephone}
                  className="info-value"
                  type='number'
                  maxlength={11}
                  placeholder='请输入联系电话'
                  disabled
                  onInput={e => this.setState({ telephone: e.target.value })} />
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
                        <Checkbox className='checkbox-list__checkbox' color='#04a9f5' value={'普通话'} checked={language.includes('普通话')}>普通话</Checkbox>
                      </Label>
                    </View>
                    <View className="checkbox-list__item">
                      <Label className='checkbox-list__label' for={'粤语'} >
                        <Checkbox className='checkbox-list__checkbox' color='#04a9f5' value={'粤语'} checked={language.includes('粤语')}>粤语</Checkbox>
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
        {
          !isUpdate && <View className="protocol-box" >
            <CheckboxGroup onChange={() => this.setState({ isAgree: !isAgree })}>
              <Checkbox color='#04a9f5' checked={isAgree} value={'选择'} >点击提交报名，即表示您已阅读并同意</Checkbox><Text onClick={this.handleJumpProtocol}>《一键科技服务平台注册协议》</Text>
            </CheckboxGroup>
          </View>
        }
        <View className="btn-register" onClick={this.handleSubmit}>{isUpdate ? '提交保存' : '马上申请'}</View>
      </View>
    )
  }
}
