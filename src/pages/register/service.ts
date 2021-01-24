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

// 护工技能
export async function querySkill(): Promise<any> {
  return request({
    url: '/base/query/list/skill',
    method: 'POST',
  });
}

// 上传头像 /upload/server/pic

export interface createParamsType {

}

// 新增/更新护工
export async function createWorker(params: createParamsType): Promise<any> {
  return request({
    url: '/pc/server/create/server',
    method: 'POST',
    data: params,
  });
}