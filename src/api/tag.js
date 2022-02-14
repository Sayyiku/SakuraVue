import request from '../utils/request'

/**
 * 获取标签列表
 */
export function tagList() {
  return request.get('/tag/list')
}
