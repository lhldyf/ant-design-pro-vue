import pick from 'lodash.pick'
import { postAction } from '@/api/manage'

export const ModalMixin = {
  data () {
    return {
      title: '操作',
      // 弹出层默认不展示
      visible: false,
      // 点击确认时loading效果
      confirmLoading: false,
      disableSubmit: false,
      labelCol: {
        xs: { span: 24 },
        sm: { span: 5 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
      },
      form: this.$form.createForm(this),
      model: {},
      isEdit: false
    }
  },
  methods: {
    add () {
      this.edit({})
      this.isEdit = false
    },
    edit (record) {
      this.beforeEdit(record)
      this.form.resetFields()
      this.model = Object.assign({}, record)
      this.visible = true
      this.isEdit = true
      if (this.initFields) {
        this.$nextTick(() => {
          this.form.setFieldsValue(pick(this.model, this.initFields))
          this.setEditFieldsValue(this.model)
        })
      }
    },
    beforeEdit (record) {},
    setEditFieldsValue (record) {},
    detail (record) {
      this.edit(record)
      this.disableSubmit = true
    },
    handleCancel () {
      this.close()
    },
    close () {
      this.$emit('close')
      this.visible = false
    },
    handleOk () {
      if (this.disableSubmit) {
        this.close()
        return
      }
      // 触发表单验证
      this.form.validateFields((err, values) => {
        if (!err) {
          this.confirmLoading = true
          let response
          if (this.isEdit) {
            response = postAction(this.url.edit, this.wrapModalOkParams(Object.assign({}, this.model, values)))
          } else {
            response = postAction(this.url.create, this.wrapModalOkParams(Object.assign({}, this.model, values)))
          }
          response
            .then(res => {
              if (res.success) {
                this.$message.success(res.errorMsg)
                this.$emit('ok')
              } else {
                this.$message.warning(res.errorMsg)
              }
            })
            .finally(() => {
              this.confirmLoading = false
              this.close()
            })
        }
      })
    },
    wrapModalOkParams (params) {
      return params
    }
  }
}
