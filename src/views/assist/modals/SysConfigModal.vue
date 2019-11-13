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
          <a-form-item label="配置key" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-input placeholder="请输入配置key" v-decorator="['configKey', validatorRules.configKey]" />
          </a-form-item>
          <a-form-item label="配置值" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-textarea placeholder="请输入配置值" v-decorator="['configValue', validatorRules.configValue]" autosize />
          </a-form-item>
          <a-form-item label="配置备注" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-textarea
              placeholder="请输入配置备注"
              v-decorator="['configRemark', validatorRules.configRemark]"
              autosize
            />
          </a-form-item>
        </a-row>
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
import { ModalMixin } from '@/mixins'

export default {
  name: 'SysConfigModal',
  mixins: [ModalMixin],
  data () {
    return {
      validatorRules: {
        configKey: { rules: [{ required: true, message: '请输入配置key' }] },
        configValue: { rules: [{ required: true, message: '请输入配置值' }] },
        configRemark: { rules: [{ required: true, message: '请输入配置备注' }] }
      },
      initFields: ['configKey', 'configValue', 'configRemark'],
      url: {
        create: '/assist/config/create',
        edit: '/assist/config/update'
      }
    }
  }
}
</script>
