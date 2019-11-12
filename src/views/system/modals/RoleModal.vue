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
          <a-form-item label="角色名称" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-input placeholder="请输入角色名称" v-decorator="['roleName', validatorRules.roleName]" />
          </a-form-item>
          <a-form-item label="角色编码" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-input placeholder="请输入角色编码" v-decorator="['roleCode', validatorRules.roleCode]" />
          </a-form-item>
          <a-form-item label="描述" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-input placeholder="请输入描述" v-decorator="['description']" />
          </a-form-item>
        </a-row>
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
import { ModalMixin } from '@/mixins'

export default {
  name: 'RoleModal',
  mixins: [ModalMixin],
  data () {
    return {
      validatorRules: {
        roleName: { rules: [{ required: true, message: '请输入角色名称' }] },
        roleCode: { rules: [{ required: true, message: '请输入角色编码' }] }
      },
      initFields: ['roleName', 'roleCode', 'description'],
      url: {
        create: '/system/role/create',
        edit: '/system/role/update'
      }
    }
  }
}
</script>
