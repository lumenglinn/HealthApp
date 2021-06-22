import request from '../../utils/request';

export interface queryServerListParamsType {
  // city: string;
  // area: string;
}

// 护工列表
export async function queryServerList(params: queryServerListParamsType): Promise<any> {
  return request({
    url: '/pc/server/query/server/list',
    method: 'POST',
    data: params,
  });
}
