
import request from '../../utils/request';

export interface queryOrderListParamsType {
  // serverList: object;
}

// 订单列表
export async function queryOrderList(params: queryOrderListParamsType): Promise<any> {
  return request({
    url: '/order/query/list',
    method: 'POST',
    data: params,
  });
}