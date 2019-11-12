// 可重用组件，请加入到components数组以及export 中
import { Bar, Pie, BarMultid, Ellipsis, FooterToolbar, STable, MultiTab, AdvancedSelect, DictSelect, OpsSymbolSelect, OrganSelect, SimpleOrganSelect } from '@/components'
import { UserLayout, BasicLayout, BlankLayout, RouteView, PageView, TreeView } from '@/layouts'

import '@/utils/filter'
import { setDocumentTitle } from '@/utils/domUtil'
import '@/core/directives/action'
import bootstrap from '@/core/bootstrap'
import store from '@/store'
import PermissionHelper from '@/utils/helper/permission'

// 可重用工具类，请加入到 export 中
import { postAction, getAction, deleteAction, putAction, postFile, getFile } from '@/api/manage'
import { VueAxios, axios } from '@/utils/request'
import { mixin, AppDeviceEnquire, mixinDevice } from '@/utils/mixin'
import { initDictStore, initAdvancedStore, dictItemName, getDictItems, advancedItemName } from '@/components/Dict'
import { ModalMixin, ListMixin, FileUploadMixin } from '@/mixins'

// 可复用页面，请加入到 export 中
import { DictList } from '@/views/metadata/dict'
import FlexList from '@/views/flex/FlexList'
import { GenFromDatabase } from '@/views/codeGen'
import { UserList, OrganList, RoleList, PermissionList, DepartmentList } from '@/views/system'

export { DictList, FlexList, GenFromDatabase, UserList, OrganList, RoleList, PermissionList, DepartmentList }

// axios相关封装
export { postAction, getAction, deleteAction, putAction, postFile, getFile, VueAxios, axios }
// mixin代码
export { mixin, AppDeviceEnquire, mixinDevice }
// 启动配置 vuex
export { bootstrap, store }
export { setDocumentTitle, PermissionHelper }
export { initDictStore, initAdvancedStore, dictItemName, getDictItems, advancedItemName }
export { ModalMixin, ListMixin, FileUploadMixin }

// 以数组的结构保存组件，便于遍历
const components = [Bar, Pie, BarMultid, Ellipsis, FooterToolbar, STable, MultiTab, UserLayout, BasicLayout, BlankLayout, RouteView, PageView, TreeView, AdvancedSelect, DictSelect, OpsSymbolSelect, OrganSelect, SimpleOrganSelect, FlexList]

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
  // 组件列表
  Bar, Pie, BarMultid,
  Ellipsis,
  FooterToolbar,
  STable, MultiTab,
  UserLayout,
  BasicLayout,
  BlankLayout,
  RouteView,
  PageView,
  TreeView,
  AdvancedSelect, DictSelect, OpsSymbolSelect, OrganSelect, SimpleOrganSelect
}

export default {
  // 导出的对象必须具备一个 install 方法
  install
}
