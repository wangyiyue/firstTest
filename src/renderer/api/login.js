import request from '@/utils/request'
import sys from '@/config/config';

/**
 * @description 登录接口
 * @param data 参数
 */
export function login(data) {
  return request({
    url: sys.sysName + '/sys/login.json',
    method: 'post',
    data
  });
}

export function getInfo(token) {
  return request({
    url: '/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}
