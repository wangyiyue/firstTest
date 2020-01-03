import router from './router'
import store from './store'
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css'// Progress 进度条样式
import { Message } from 'element-ui'

const whiteList = ['/login'] // 白名单
let flag = 0;//解决刷新后页面空白的问题
router.beforeEach(async(to, from, next) => {
  // NProgress.start()
  if (store.getters.token) {
    if (to.path === '/login') {
      next({ path: '/' })
      NProgress.done() // if current page is dashboard will not trigger	afterEach hook, so manually handle it
    } else {
      if (flag === 0) {
        store.dispatch('GetInfo').then(response =>{
          store.dispatch('permission/GenerateRoutes').then(response =>{
            router.addRoutes(store.getters.addRouters) // 动态添加可访问路由表
            flag++ ;
            next();
            //next({ ...to, replace: true })
          })
        }).catch(() => {
          store.dispatch('user/LogOut').then(() => {
            Message.error('验证失败,请重新登录');
            next({ path: '/login' });
          });
        });
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next('/login')
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  NProgress.done() // 结束Progress
})
