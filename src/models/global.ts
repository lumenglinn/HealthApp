import Taro from '@tarojs/taro'
import { wxLogin } from '../utils/function'
import { login, queryUserInfo, queryMineTelephone } from '../services/global'

export default {
  namespace: 'global',

  state: {
    userInfo: {}
  },

  subscriptions: {
    setup({ dispatch, history }) {
      wxLogin(res => {
        dispatch({
          type: 'login',
          payload: {
            code: res
          }
        });
      })
    }
  },

  effects: {
    // 登陆
    *login({ payload }, { call, put }) {
      const { data: { data, msg, statusCode } } = yield call(login, payload);
      if (statusCode === '1') {
        Taro.setStorageSync('token', data.token)
        const res = yield call(queryUserInfo, payload);
        if (res.data.statusCode === '1') {
          yield put({
            type: 'updateData',
            payload: {
              userInfo: res.data.data
            }
          });
        }
      } else {
        Taro.showToast({
          title: msg,
          icon: 'none',
        })
      }
    },
    // 获取用户信息
    *getUserInfo({ payload }, { call, put, select }) {
      const { data: { data, msg, statusCode } } = yield call(queryUserInfo, payload);
      const userInfo = yield select(state => state.userInfo);
      if (statusCode === '1') {
        yield put({
          type: 'updateData',
          payload: {
            userInfo: {
              ...userInfo,
              telephone: data.phoneNumber
            }
          }
        });
      }
    },
    // 获取手机号码
    *getUserPhone({ payload }, { call, put, select }) {
      const { data: { data, msg, statusCode } } = yield call(queryMineTelephone, payload);
      const userInfo = yield select(state => state.userInfo);
      if (statusCode === '1') {
        yield put({
          type: 'updateData',
          payload: {
            userInfo: {
              ...userInfo,
              telephone: data.phoneNumber
            }
          }
        });
      }
    },
  },

  reducers: {
    updateData(state, { payload }) {
      return {
        ...state,
        ...payload
      };
    }
  }
};
