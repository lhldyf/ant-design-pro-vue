<template>
  <a-card>
    <div class="table-operator">
      <a-button @click="handleAdd" type="primary" icon="plus">添加</a-button>
    </div>

    <div>
      <a-table
        ref="table"
        size="default"
        :columns="columns"
        :rowKey="item => item.id"
        :pagination="false"
        :dataSource="dataSource"
        @change="onTableChange"
        :loading="tableLoading"
      >
        <span slot="action" slot-scope="text, record">
          <a @click="handleEdit(record)">编辑</a>
          <a-divider type="vertical" />
          <a @click="handleAddSub(record)">添加子菜单</a>
          <a-divider type="vertical" />
          <a-popconfirm title="请确认您将删除该菜单及所有子菜单？" @confirm="() => handleDelete(record)">
            <a>删除</a>
          </a-popconfirm>
        </span>
      </a-table>
    </div>
    <permission-drawer :treeData="dataSource" ref="modalForm" @ok="modalFormOk"></permission-drawer>
  </a-card>
</template>

<script>
import { ListMixin, dictItemName } from '@/components/Dict'
import PermissionDrawer from './modals/PermissionDrawer'
import { getAction, deleteAction } from '@/api/manage'

export default {
  name: 'PermissionList',
  mixins: [ListMixin],
  components: { PermissionDrawer },
  data () {
    return {
      columns: [
        {
          title: '菜单名称',
          dataIndex: 'name'
        },
        {
          title: '路径',
          dataIndex: 'url'
        },
        {
          title: '组件',
          dataIndex: 'component'
        },
        {
          title: '菜单类型',
          dataIndex: 'menuType',
          customRender: text => dictItemName('menu_type', text)
        },
        {
          title: '排序',
          dataIndex: 'sortNo'
        },
        {
          title: '操作',
          dataIndex: 'action',
          scopedSlots: { customRender: 'action' }
        }
      ],
      url: {
        list: '/system/permission/tree',
        delete: '/system/permission'
      }
    }
  },
  methods: {
    loadPage () {
      this.tableLoading = true
      getAction(this.url.list).then(res => {
        this.tableLoading = false
        if (res.success) {
          this.dataSource = res.data
        }
      })
    },
    handleDelete (record) {
      this.loading = true
      const list = []
      this.listChildrenIds(list, record)
      deleteAction(this.url.delete, { ids: list.join(',') })
        .then(res => {
          if (res.success) {
            this.$message.success(res.message)
            this.loadPage()
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
    listChildrenIds (list, treeNode) {
      list.push('"' + treeNode.id + '"')
      if (treeNode.children && treeNode.children.length !== 0) {
        treeNode.children.forEach(item => this.listChildrenIds(list, item))
      }
    },
    handleAddSub (record) {
      this.$refs.modalForm.title = '添加子菜单'
      this.$refs.modalForm.localMenuType = 1
      this.$refs.modalForm.disableSubmit = false
      this.$refs.modalForm.edit({ status: '1', permsType: '1', route: true, parentId: record.id })
    }
  }
}
</script>
