import Taro from '@tarojs/taro'
import { wxLogin } from '../utils/function'
import { login, queryUserInfo } from '../services/global'

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
    *getUserInfo({ payload }, { call, put }) {
      const { data: { data, msg, statusCode } } = yield call(queryUserInfo, payload);
      if (statusCode === '1') {
        yield put({
          type: 'updateData',
          payload: {
            userInfo: data
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
