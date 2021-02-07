import request from '../../utils/request';

export interface queryServerParamsType {
  // city: string;
  // area: string;
}

// 护工列表
export async function queryServer(params: queryServerParamsType): Promise<any> {
  return request({
    url: '/api/pc/server/query/server',
    method: 'POST',
    data: params,
  });
}

