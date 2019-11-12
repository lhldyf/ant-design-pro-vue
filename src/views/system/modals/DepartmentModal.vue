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
          <a-form-item label="部门编码" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-input placeholder="请输入部门编码" v-decorator="['code', validatorRules.code]" />
          </a-form-item>
          <a-form-item label="部门名称" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-input placeholder="请输入部门名称" v-decorator="['name', validatorRules.name]" />
          </a-form-item>
          <a-form-item label="排序号" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-input placeholder="请输入排序号" v-decorator="['sortOrder', validatorRules.sortOrder]" />
          </a-form-item>
        </a-row>
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
import { ModalMixin } from '@/mixins'

export default {
  name: 'DepartmentModal',
  mixins: [ModalMixin],
  data () {
    return {
      validatorRules: {
        code: { rules: [{ required: true, message: '请输入部门编码' }] },
        name: { rules: [{ required: true, message: '请输入部门名称' }] },
        sortOrder: { rules: [{ required: true, message: '请输入排序号' }] },
        createUser: { rules: [{ required: true, message: '请输入创建人' }] },
        createTime: { rules: [{ required: true, message: '请输入创建时间' }] }
      },
      initFields: ['code', 'name', 'sortOrder', 'createUser', 'createTime'],
      url: {
        create: '/user/department/create',
        edit: '/user/department/update'
      }
    }
  }
}
</script>
