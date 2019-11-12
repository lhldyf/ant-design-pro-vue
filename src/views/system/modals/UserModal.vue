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
          <a-form-item label="用户名" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-input
              placeholder="请输入用户名"
              v-decorator="['username', validatorRules
                .username]"/>
          </a-form-item>
          <a-form-item label="真实姓名" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-input
              placeholder="请输入真实姓名"
              v-decorator="['realName', validatorRules
                .realName]"/>
          </a-form-item>
          <a-form-item label="密码" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-input
              placeholder="请输入密码"
              v-decorator="['password', validatorRules
                .password]"/>
          </a-form-item>
          <a-form-item label="状态" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <dict-select placeholder="请选择状态" v-decorator="['status', validatorRules.status]" :triggerChange="true" dictCode="enable_status">
            </dict-select>
          </a-form-item>
          <a-form-item label="邮箱" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-input
              placeholder="请输入邮箱"
              v-decorator="['email', validatorRules
                .email]"/>
          </a-form-item>
          <a-form-item label="手机号" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-input
              placeholder="请输入手机号"
              v-decorator="['telephone', validatorRules
                .telephone]"/>
          </a-form-item>
          <a-form-item label="备用手机号" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-input
              placeholder="请输入备用手机号"
              v-decorator="['telephoneBackup', validatorRules
                .telephoneBackup]"/>
          </a-form-item>
          <a-form-item label="电话" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-input
              placeholder="请输入电话"
              v-decorator="['phone', validatorRules
                .phone]"/>
          </a-form-item>
          <a-form-item label="单位编码" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-input
              placeholder="请输入单位编码"
              v-decorator="['organCode', validatorRules
                .organCode]"/>
          </a-form-item>
        </a-row>
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
import { ModalMixin } from '@/mixins'

export default {
  name: 'UserModal',
  mixins: [ModalMixin],
  data () {
    return {
      validatorRules: {
        username: { rules: [{ required: true, message: '请输入用户名' }] },
        realName: { rules: [{ required: true, message: '请输入真实姓名' }] },
        password: { rules: [{ required: true, message: '请输入密码' }] },
        status: { rules: [{ required: true, message: '请输入状态' }] },
        email: { rules: [{ required: true, message: '请输入邮箱' }] },
        telephone: { rules: [{ required: true, message: '请输入手机号' }] },
        telephoneBackup: { rules: [{ required: true, message: '请输入备用手机号' }] },
        phone: { rules: [{ required: true, message: '请输入电话' }] },
        organCode: { rules: [{ required: true, message: '请输入单位编码' }] }
      },
      initFields: [ 'username', 'realName', 'password', 'status', 'email', 'telephone', 'telephoneBackup', 'phone', 'organCode' ],
      url: {
        create: '/user/user/create',
        edit: '/user/user/update'
      }
    }
  }
}
</script>
