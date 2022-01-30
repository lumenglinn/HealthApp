
import request from '../../utils/request';

export interface preOrderParamsType {
  serverList: object;
}

// 护工列表
export async function preOrder(params: preOrderParamsType): Promise<any> {
  return request({
    url: '/wechat/order/preOrder',
    method: 'POST',
    data: params,
  });
}