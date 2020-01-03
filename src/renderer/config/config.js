// 系统名称
let sysName = ''
if (process.env.NODE_ENV === 'development') {
  sysName = '/api/farm-admin-om'
} else {
  sysName = '/farm-admin-om'
}
/**
 * 配置每页的条数
 **/
const pageSize = 10

export default {
  sysName,
  pageSize
}
