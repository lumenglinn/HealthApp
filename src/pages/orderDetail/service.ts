
import request from '../../utils/request';

export interface queryOrderDetailParamsType {
  orderId: string;
}

// 订单列表
export async function queryOrderDetail(params: queryOrderDetailParamsType): Promise<any> {
  return request({
    url: '/order/query/one',
    method: 'POST',
    data: params,
  });
}