<template>
  <a-row :gutter="10">
    <a-spin :spinning="loading">
      <a-col :md="12" :sm="24">
        <a-card>
          <div class="table-operator">
            <a-button @click="handleAdd" type="primary" v-if="selectedOrgan.id">添加子机构</a-button>
            <a-button @click="handleAdd" type="primary" v-else>添加</a-button>
            <a-popconfirm title="请确认您将删除该机构及所有下属机构？" @confirm="handleDelete">
              <a-button type="primary" v-if="selectedOrgan.id">删除</a-button>
            </a-popconfirm>
            <a-button @click="handleSearch" type="primary">刷新</a-button>
          </div>

          <a-alert type="info" :showIcon="true">
            <div slot="message">
              当前选择：
              <span v-if="selectedOrgan.id">{{ selectedOrgan.name }}</span>
              <a v-if="selectedOrgan.id" style="margin-left: 8px" @click="onClearSelected">取消选择</a>
            </div>
          </a-alert>
          <a-tree
            :expandedKeys.sync="expandedKeys"
            :selectedKeys.sync="selectedIds"
            @select="selectOrgan"
            :treeData="organTree"
          >
          </a-tree>
        </a-card>
      </a-col>
      <a-col :md="12" :sm="24">
        <a-card :bordered="false">
          <a-form :form="form">
            <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="机构名称">
              <a-input placeholder="请输入机构/部门名称" v-decorator="['name', validatorRules.name]" />
            </a-form-item>
            <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="上级机构">
              <a-tree-select
                style="width:100%"
                :dropdownStyle="{ maxHeight: '200px', overflow: 'auto' }"
                :treeData="organTree"
                disabled
                v-model="selectedOrgan.parentId"
              >
              </a-tree-select>
            </a-form-item>
            <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="机构编码">
              <a-input placeholder="请输入机构编码" v-decorator="['code', validatorRules.code]" />
            </a-form-item>
            <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="机构类型">
              <dict-select
                dictCode="organ_type"
                v-decorator="['type', validatorRules.type]"
                placeholder="请选择机构类型"
              ></dict-select>
            </a-form-item>
            <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="排序">
              <a-input-number style="width: 100%" v-decorator="['sortOrder', { initialValue: 0 }]" />
            </a-form-item>
            <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="机构部门">
              <advanced-select type="department" v-decorator="['departmentList']" mode="multiple" />
            </a-form-item>
          </a-form>
          <div style="display: flex;justify-content: center;">
            <a-button
              v-if="selectedOrgan.id"
              @click="submitCurrForm"
              type="primary"
              htmlType="button"
            >修改并保存</a-button
            >
          </div>
        </a-card>
      </a-col>
    </a-spin>
    <organ-modal ref="modalForm" @ok="modalFormOk"></organ-modal>
  </a-row>
</template>

<script>
import OrganModal from './modals/OrganModal'
import { getAction, postAction, deleteAction } from '@/api/manage'
import pick from 'lodash.pick'

export default {
  name: 'OrganList',
  components: { OrganModal },
  data () {
    return {
      form: this.$form.createForm(this),
      loading: false,
      organTree: [],
      selectedOrgan: {},
      expandedKeys: [],
      rightClickSelectedKey: '',
      selectedIds: [],
      dropTrigger: '',
      validatorRules: {
        name: { rules: [{ required: true, message: '请输入机构/部门名称!' }] },
        code: { rules: [{ required: true, message: '请输入机构编码!' }] },
        type: { rules: [{ required: true, message: '请选择机构类型!' }] }
      },
      departmentList: [],
      labelCol: {
        xs: { span: 24 },
        sm: { span: 5 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
      }
    }
  },
  mounted () {
    this.loadOrganTree()
  },
  methods: {
    selectOrgan (selectedKey, e) {
      this.selectedOrgan = Object.assign({}, e.node.dataRef)
      this.form.setFieldsValue(pick(this.selectedOrgan, 'name', 'type', 'code', 'sortOrder'))
      getAction('/user/organ/department', { organCode: this.selectedOrgan.code }).then(res => {
        if (res.success) {
          this.departmentList = res.data
          this.form.setFieldsValue({ departmentList: this.departmentList })
        }
      })
    },
    loadOrganTree () {
      this.loading = true
      getAction('/user/organ/tree', { showRoot: true }).then(res => {
        if (res.success) {
          this.expandedKeys = res.data.map(x => x.id)
          this.organTree = res.data
        }
        this.loading = false
      })
    },
    handleAdd () {
      this.$refs.modalForm.title = '新增'
      this.$refs.modalForm.parent = this.selectedOrgan
      this.$refs.modalForm.organTree = this.organTree
      this.$refs.modalForm.add()
    },
    modalFormOk () {
      this.loadOrganTree()
    },
    handleDelete () {
      this.loading = true
      const list = []
      this.listChildrenIds(list, this.selectedOrgan)
      deleteAction('/user/organ', { ids: list.join(',') })
        .then(res => {
          if (res.success) {
            this.onClearSelected()
            this.$message.success(res.message)
            this.loadOrganTree()
          } else {
            this.$message.warning(res.message)
          }
          this.loading = false
        })
        .catch(e => {
          console.log(e)
          this.$message.warning('系统异常')
        })
    },
    listChildrenIds (list, organ) {
      list.push('"' + organ.id + '"')
      if (organ.children && organ.children.length !== 0) {
        organ.children.forEach(item => this.listChildrenIds(list, item))
      }
    },
    handleSearch () {
      this.loadOrganTree()
      this.onClearSelected()
    },
    onClearSelected () {
      this.selectedIds = []
      this.selectedOrgan = {}
      this.form.resetFields()
    },
    submitCurrForm () {
      this.form.validateFields((err, values) => {
        if (!err) {
          const formData = Object.assign(this.selectedOrgan, values)
          this.loading = true
          postAction('/user/organ/update', formData).then(res => {
            if (res.success) {
              this.$message.success('保存成功!')
              this.selectedOrgan = Object.assign(this.selectedOrgan, values)
              this.loadOrganTree()
            } else {
              this.$message.error(res.message)
            }
            this.loading = false
          })
        }
      })
    }
  }
}
</script>
