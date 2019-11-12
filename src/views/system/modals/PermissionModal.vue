<template>
  <a-modal
    :title="title"
    :width="600"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @ok="handleOk"
    @cancel="handleCancel"
    cancelText="关闭"
  >
    <a-spin :spinning="confirmLoading">
      <a-form :form="form">
        <a-row :gutter="48">
          <a-form-item label="父id" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-input placeholder="请输入父id" v-decorator="['parentId', validatorRules.parentId]"/>
          </a-form-item>
          <a-form-item label="菜单标题" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-input placeholder="请输入菜单标题" v-decorator="['name', validatorRules.name]"/>
          </a-form-item>
          <a-form-item label="路径" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-input placeholder="请输入路径" v-decorator="['url', validatorRules.url]"/>
          </a-form-item>
          <a-form-item label="组件" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-input placeholder="请输入组件" v-decorator="['component', validatorRules.component]"/>
          </a-form-item>
          <a-form-item label="组件名字" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-input placeholder="请输入组件名字" v-decorator="['componentName', validatorRules.componentName]"/>
          </a-form-item>
          <a-form-item label="一级菜单跳转地址" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-input placeholder="请输入一级菜单跳转地址" v-decorator="['redirect', validatorRules.redirect]"/>
          </a-form-item>
          <a-form-item label="菜单类型(0:一级菜单;" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <dict-select placeholder="请选择菜单类型(0:一级菜单;" v-decorator="['menuType', validatorRules.menuType]" :triggerChange="true" dictCode="menu_type">
            </dict-select>
          </a-form-item>
          <a-form-item label="菜单权限编码" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-input placeholder="请输入菜单权限编码" v-decorator="['perms', validatorRules.perms]"/>
          </a-form-item>
          <a-form-item label="权限策略1显示2禁用" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-input placeholder="请输入权限策略1显示2禁用" v-decorator="['permsType', validatorRules.permsType]"/>
          </a-form-item>
          <a-form-item label="菜单排序" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-input placeholder="请输入菜单排序" v-decorator="['sortNo', validatorRules.sortNo]"/>
          </a-form-item>
          <a-form-item label="聚合子路由:" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-input placeholder="请输入聚合子路由:" v-decorator="['alwaysShow', validatorRules.alwaysShow]"/>
          </a-form-item>
          <a-form-item label="菜单图标" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-input placeholder="请输入菜单图标" v-decorator="['icon', validatorRules.icon]"/>
          </a-form-item>
          <a-form-item label="是否路由菜单:" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-input placeholder="请输入是否路由菜单:" v-decorator="['isRoute', validatorRules.isRoute]"/>
          </a-form-item>
          <a-form-item label="是否叶子节点:" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-input placeholder="请输入是否叶子节点:" v-decorator="['isLeaf', validatorRules.isLeaf]"/>
          </a-form-item>
          <a-form-item label="是否缓存该页面:" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-input placeholder="请输入是否缓存该页面:" v-decorator="['keepAlive', validatorRules.keepAlive]"/>
          </a-form-item>
          <a-form-item label="是否隐藏路由:" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-input placeholder="请输入是否隐藏路由:" v-decorator="['hidden', validatorRules.hidden]"/>
          </a-form-item>
          <a-form-item label="描述" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-input placeholder="请输入描述" v-decorator="['description', validatorRules.description]"/>
          </a-form-item>
          <a-form-item label="创建人" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-input placeholder="请输入创建人" v-decorator="['createUser', validatorRules.createUser]"/>
          </a-form-item>
          <a-form-item label="创建时间" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-input placeholder="请输入创建时间" v-decorator="['createTime', validatorRules.createTime]"/>
          </a-form-item>
          <a-form-item label="删除状态" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-input placeholder="请输入删除状态" v-decorator="['deleted', validatorRules.deleted]"/>
          </a-form-item>
          <a-form-item label="是否添加数据权限1是0否" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-input placeholder="请输入是否添加数据权限1是0否" v-decorator="['ruleFlag', validatorRules.ruleFlag]"/>
          </a-form-item>
          <a-form-item label="按钮权限状态(0无效1有效)" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-input placeholder="请输入按钮权限状态(0无效1有效)" v-decorator="['status', validatorRules.status]"/>
          </a-form-item>
          <a-form-item label="菜单配置json" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-input placeholder="请输入菜单配置json" v-decorator="['metaParams', validatorRules.metaParams]"/>
          </a-form-item>
        </a-row>
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
import { ModalMixin } from '@/mixins'

export default {
  name: 'PermissionModal',
  mixins: [ModalMixin],
  data () {
    return {
      validatorRules: {
        parentId: { rules: [{ required: true, message: '请输入父id' }] },
        name: { rules: [{ required: true, message: '请输入菜单标题' }] },
        url: { rules: [{ required: true, message: '请输入路径' }] },
        component: { rules: [{ required: true, message: '请输入组件' }] },
        componentName: { rules: [{ required: true, message: '请输入组件名字' }] },
        redirect: { rules: [{ required: true, message: '请输入一级菜单跳转地址' }] },
        menuType: { rules: [{ required: true, message: '请输入菜单类型(0:一级菜单;' }] },
        perms: { rules: [{ required: true, message: '请输入菜单权限编码' }] },
        permsType: { rules: [{ required: true, message: '请输入权限策略1显示2禁用' }] },
        sortNo: { rules: [{ required: true, message: '请输入菜单排序' }] },
        alwaysShow: { rules: [{ required: true, message: '请输入聚合子路由:' }] },
        icon: { rules: [{ required: true, message: '请输入菜单图标' }] },
        isRoute: { rules: [{ required: true, message: '请输入是否路由菜单:' }] },
        isLeaf: { rules: [{ required: true, message: '请输入是否叶子节点:' }] },
        keepAlive: { rules: [{ required: true, message: '请输入是否缓存该页面:' }] },
        hidden: { rules: [{ required: true, message: '请输入是否隐藏路由:' }] },
        description: { rules: [{ required: true, message: '请输入描述' }] },
        createUser: { rules: [{ required: true, message: '请输入创建人' }] },
        createTime: { rules: [{ required: true, message: '请输入创建时间' }] },
        deleted: { rules: [{ required: true, message: '请输入删除状态' }] },
        ruleFlag: { rules: [{ required: true, message: '请输入是否添加数据权限1是0否' }] },
        status: { rules: [{ required: true, message: '请输入按钮权限状态(0无效1有效)' }] },
        metaParams: { rules: [{ required: true, message: '请输入菜单配置json' }] }
      },
      initFields: ['parentId', 'name', 'url', 'component', 'componentName', 'redirect', 'menuType', 'perms', 'permsType', 'sortNo', 'alwaysShow', 'icon', 'isRoute', 'isLeaf',
        'keepAlive', 'hidden', 'description', 'createUser', 'createTime', 'deleted', 'ruleFlag', 'status', 'metaParams' ],
      url: {
        create: '/system/permission/create',
        edit: '/system/permission/update'
      }
    }
  }
}
</script>
