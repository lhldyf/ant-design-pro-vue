import Vue from 'vue'
/**
 * 向后端请求用户的菜单，动态生成路由
 */
import { constantRouterMap, constantRouterComponents, notFoundRouter } from '@/config/router.config'

const permission = {
  state: {
    routers: constantRouterMap,
    addRouters: []
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers
      state.routers = constantRouterMap.concat(routers)
    },
    SET_ROUTERS_BY_MENUS: (state, menus) => {
      const routers = convert2Router(menus)
      state.addRouters = routers
      state.routers = constantRouterMap.concat(routers)
    }
  },
  actions: {
    GenerateRoutes ({ commit }, data) {
      return new Promise(resolve => {
        const { token } = data
        generatorDynamicRouter(token).then(routers => {
          commit('SET_ROUTERS', routers)
          resolve()
        })
      })
    }
  }
}

// 根级菜单
const rootRouter = {
  name: 'index',
  path: '/',
  component: 'BasicLayout',
  meta: { title: '首页' },
  children: []
}

const generatorDynamicRouter = (token) => {
  return new Promise((resolve, reject) => {
    Vue.axios.get('/system/permission/getUserPermission', { token }).then(res => {
      if (res.success) {
        resolve(convert2Router(res.data))
      }
    }).catch(err => {
      console.error('用户菜单加载失败', err)
      resolve([])
    })
  })
}

const convert2Router = (menus) => {
  const menuNav = []
  rootRouter.children = menus
  rootRouter.redirect = rootRouter.children && rootRouter.children[0] && rootRouter.children[0].path || '/home'
  menuNav.push(rootRouter)
  const routers = generator(menuNav)
  routers.push(notFoundRouter)
  return routers
}

/**
 * 格式化树形结构数据 生成 vue-router 层级路由表
 *
 * @param routerMap
 * @param parent
 * @returns {*}
 */
const generator = (routerMap, parent) => {
  return routerMap.map(item => {
    const { title, keepAlive, hiddenHeaderContent, target, icon } = item.meta || {}
    let component = constantRouterComponents[item.component]
    if (!component) {
      component = () => import(`@/views/${item.component}`)
    }
    const currentRouter = {
      // 如果路由设置了 path，则作为默认 path，否则 路由地址 动态拼接生成如 /dashboard/workplace
      path: item.path || `${parent && parent.path || ''}/${item.key}`,
      // 路由名称，建议唯一
      name: item.name || item.key || '',
      // component: constantRouterComponents[item.component || item.key],
      // 该路由对应页面的 组件 :方案2 (动态加载)
      component: component,
      // component: constantRouterComponents[item.component || item.key] || () => import(`@/views/${item.component}`),
      hidden: item.hidden || false,
      hideChildrenInMenu: item.hideChildrenInMenu || false,

      // meta: 页面标题, 菜单图标, 页面权限(供指令权限用，可去掉)
      meta: { title, keepAlive, hiddenHeaderContent, target, icon: icon || undefined }
    }

    // 为了防止出现后端返回结果不规范，处理有可能出现拼接出两个 反斜杠
    if (!currentRouter.path.startsWith('http')) {
      currentRouter.path = currentRouter.path.replace('//', '/')
    }
    // 重定向
    item.redirect && (currentRouter.redirect = item.redirect)
    // 是否有子菜单，并递归处理
    if (item.children && item.children.length > 0) {
      // Recursion
      currentRouter.children = generator(item.children, currentRouter)
    }
    return currentRouter
  })
}

export default permission
