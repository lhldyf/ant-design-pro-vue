// 导入单个组件
import { Bar, Pie, BarMultid, Ellipsis, FooterToolbar, STable } from '@/components'
import { UserLayout, BasicLayout, BlankLayout, RouteView, PageView } from '@/layouts'
import { postAction, getAction, deleteAction, putAction } from '@/api/manage'
import { VueAxios, axios } from '@/utils/request'
import { mixin, AppDeviceEnquire, mixinDevice } from '@/utils/mixin'
import '@/utils/filter'
import { setDocumentTitle } from '@/utils/domUtil'
import '@/core/directives/action'
import bootstrap from '@/core/bootstrap'
import store from '@/store'
import PermissionHelper from '@/utils/helper/permission'

// axios相关封装
export { postAction, getAction, deleteAction, putAction, VueAxios, axios }
// mixin代码
export { mixin, AppDeviceEnquire, mixinDevice }
// 启动配置 vuex
export { bootstrap, store }
export { setDocumentTitle, PermissionHelper }

// 以数组的结构保存组件，便于遍历
const components = [Bar, Ellipsis, FooterToolbar, STable, UserLayout, BasicLayout, BlankLayout, RouteView, PageView]

// 为每个组件定义install
components.forEach(component => {
  component.install = function (Vue) {
    Vue.component(component.name, component)
  }
})

// 定义 install 方法
const install = function (Vue) {
  if (install.installed) return
  install.installed = true
  // 遍历并注册全局组件
  components.map(component => {
    Vue.component(component.name, component)
  })
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export {
  // 导出的对象必须具备一个 install 方法
  install,
  // 组件列表
  Bar, Pie, BarMultid,
  Ellipsis,
  FooterToolbar,
  STable,
  UserLayout,
  BasicLayout,
  BlankLayout,
  RouteView,
  PageView
}

export default {
  // 导出的对象必须具备一个 install 方法
  install
}
