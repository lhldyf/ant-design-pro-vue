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
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="字典名称">
          <a-input placeholder="请输入字典名称" v-decorator="['name', validatorRules.name]" />
        </a-form-item>

        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="字典编码">
          <a-input placeholder="请输入字典编码" v-decorator="['code', validatorRules.code]" />
        </a-form-item>

        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="描述">
          <a-input v-decorator="['description']" />
        </a-form-item>
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>

import { ModalMixin } from '@/mixins/ModalMixins'

export default {
  name: 'DictModal',
  mixins: [ModalMixin],
  data () {
    return {
      validatorRules: {
        name: { rules: [{ required: true, message: '请输入字典名称' }] },
        code: {
          rules: [{ required: true, message: '请输入字典编码' }, { validator: this.validateDictCode }]
        }
      },
      initFields: ['name', 'code', 'description'],
      url: {
        create: '/metadata/dict/create',
        edit: '/metadata/dict/update'
      }
    }
  },
  methods: {
    validateDictCode (rule, value, callback) {
      // 重复校验
      // var params = {
      //   tableName: 'sys_dict',
      //   fieldName: 'dict_code',
      //   fieldVal: value,
      //   dataId: this.model.id
      // }
      // duplicateCheck(params).then(res => {
      //   if (res.success) {
      //     callback()
      //   } else {
      //     callback(res.message)
      //   }
      // })
      callback()
    }
  }
}
</script>
