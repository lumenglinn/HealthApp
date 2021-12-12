import request from '../../utils/request';

export interface queryHospitalParamsType {
  city: string;
  area: string;
}

// 查询医院列表
export async function queryHospital(params: queryHospitalParamsType): Promise<any> {
  return request({
    url: '/base/query/list/hospital',
    method: 'POST',
    data: params,
  });
}
