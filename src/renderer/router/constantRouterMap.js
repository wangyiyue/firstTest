/* Layout */
import Layout from '../views/layout/Layout'
const NotFound = () => import('@/views/404.vue');
/**
 * constantRoutes
 * 不需要权限的数由
 */
export const constantRouterMap = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: 'Dashboard',
    children: [{
      path: 'dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '首页', icon: 'example' },
    }]
  },
]
// 未找到页面路由
export const noFound = {
  path: '*',
  component: NotFound,
  name: '404',
  hidden: true
};
