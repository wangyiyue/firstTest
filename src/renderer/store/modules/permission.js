import { constantRouterMap,noFound } from '@/router/constantRouterMap'; //不需要权限
import { asyncRouterMap } from '@/router/asyncRouterMap'; //需要权限
import { getNavList } from '../../api/system';
import Layout from '../../views/layout/Layout';

/*
* @过滤路由
* */
function filterAsyncRouter(menuList = [],routes = []) {
  menuList.forEach(element =>{
    const menu = {
      path: element.url ? element.url : '',
      component: !element.url ? Layout : resolve => require(["@/views" + element.url + ".vue"], resolve),
      icon: element.icon,
      name: element.name,
      index: element.url ? element.url : String(element.menuId),
      children: [],
      meta: { title: element.name,icon: element.icon }
    }
    if (element.list) {
      filterAsyncRouter(element.list,menu.children);
    }
    routes.push(menu)
  })
  return routes;
}
const state = {
  routers: constantRouterMap,
  addRouters: []
}

const mutations = {
  SET_ROUTERS: (state, routers) => { // 保存动态路由时 将静态路由和动态路由合并
    state.addRouters = routers
    state.routers = constantRouterMap.concat(routers);
    console.log(state.routers)
  }
}

const actions = {
  GenerateRoutes({ commit }) {
    return new Promise((resolve, reject) => {
      getNavList(Number(0)).then(response =>{
        let accessedRouters;
        if (response.code === 0) {
          localStorage.setItem('menuList', JSON.stringify(response.menuList));
          accessedRouters = filterAsyncRouter(response.menuList);
          accessedRouters.push(noFound);
          commit('SET_ROUTERS', accessedRouters); //保存路由
          resolve();
        } else {
          resolve();
        }
      })
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
