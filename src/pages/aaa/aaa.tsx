
import Taro, { Component, Config } from '@tarojs/taro'
import { View } from '@tarojs/components'
// import { connect } from '@tarojs/redux'
// import Api from '../../utils/request'
// import Tips from '../../utils/tips'
import { AaaProps, AaaState } from './aaa.interface'
import './aaa.scss'
// import { } from '../../components'

// @connect(({ aaa }) => ({
//     ...aaa,
// }))

class Aaa extends Component<AaaProps,AaaState > {
  config:Config = {
    navigationBarTitleText: '标题'
  }
  constructor(props: AaaProps) {
    super(props)
    this.state = {}
  }

  componentDidMount() {
    
  }

  render() {
    return (
      <View className='aaa-page'>
          
      </View>
    )
  }
}

export default Aaa
