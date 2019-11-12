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
          <a-form-item label="机构名称" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-input placeholder="请输入机构/部门名称" v-decorator="['name', validatorRules.name]" />
          </a-form-item>
          <a-form-item label="上级机构" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-tree-select
              style="width:100%"
              :dropdownStyle="{ maxHeight: '200px', overflow: 'auto' }"
              :treeData="organTree"
              v-decorator="['parentId', validatorRules.parentId]"
            >
            </a-tree-select>
            <!-- <simple-organ-select v-decorator="['parentId', validatorRules.parentId]" /> -->
          </a-form-item>
          <a-form-item label="机构编码" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-input placeholder="请输入机构编码" v-decorator="['code', validatorRules.code]" />
          </a-form-item>
          <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="机构类型">
            <dict-select
              :disabled="organTypeDisabled"
              v-decorator="['type', validatorRules.type]"
              dictCode="organ_type"
            ></dict-select>
          </a-form-item>
          <a-form-item label="排序号" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-input-number
              style="width: 100%"
              placeholder="请输入排序号"
              v-decorator="['sortOrder', validatorRules.sortOrder]"
            />
          </a-form-item>
          <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="机构部门">
            <advanced-select type="department" v-decorator="['departmentList']" mode="multiple" />
          </a-form-item>
        </a-row>
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
import { ModalMixin } from '@/mixins'

export default {
  name: 'OrganModal',
  mixins: [ModalMixin],
  data () {
    return {
      parent: {},
      organTree: [],
      departmentList: [],
      organTypeDisabled: false,
      validatorRules: {
        parentId: { rules: [{ required: true, message: '请选择父机构' }] },
        name: { rules: [{ required: true, message: '请输入机构名称' }] },
        sortOrder: { initialValue: 0, rules: [{ required: true, message: '请输入排序号' }] },
        code: { rules: [{ required: true, message: '请输入机构编码' }] },
        type: { rules: [{ required: true, message: '请选择机构类型' }] }
      },
      initFields: ['parentId', 'type', 'departmentList'],
      url: {
        create: '/user/organ/create',
        edit: '/user/organ/update'
      }
    }
  },
  methods: {
    beforeEdit (record) {
      record.parentId = this.parent.id
      record.departmentList = this.departmentList
    }
  }
}
</script>
