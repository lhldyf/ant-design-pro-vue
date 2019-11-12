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
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="字典项键值">
          <a-input placeholder="请输入字典项键值" v-decorator="['itemCode', validatorRules.itemCode]" />
        </a-form-item>

        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="字典项名称">
          <a-input placeholder="请输入字典项名称" v-decorator="['itemName', validatorRules.itemName]" />
        </a-form-item>

        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="描述">
          <a-input v-decorator="['description']" />
        </a-form-item>

        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="排序值">
          <a-input-number :min="1" v-decorator="['sortOrder', { initialValue: 1 }]" />
          值越小越靠前，支持小数
        </a-form-item>

        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="是否启用" hasFeedback>
          <dict-select
            placeholder="请选择状态"
            v-decorator="['status', { initialValue: 1 }]"
            dictCode="enable_status"
          >
          </dict-select>
        </a-form-item>
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
import { ModalMixin } from '@/mixins/ModalMixins'

export default {
  name: 'DictItemModal',
  mixins: [ModalMixin],
  data () {
    return {
      visibleCheck: true,
      dictId: '',
      dictCode: '',
      status: 1,
      validatorRules: {
        itemCode: { rules: [{ required: true, message: '请输入字典项键值!' }] },
        itemName: { rules: [{ required: true, message: '请输入字典项名称!' }] }
      },
      initFields: ['itemCode', 'itemName', 'description', 'sortOrder', 'status'],
      url: {
        edit: '/metadata/dictItem/update',
        create: '/metadata/dictItem/create'
      }
    }
  },
  methods: {
    add (dictId, dictCode) {
      this.dictId = dictId
      this.dictCode = dictCode
      this.edit({})
      this.isEdit = false
    },
    wrapModalOkParams (params) {
      params.dictId = this.dictId
      params.dictCode = this.dictCode
      return params
    }
  }
}
</script>
