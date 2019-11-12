<template>
  <a-card>
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="48">
          <a-col :md="8" :sm="12">
            <a-form-item label="角色名称">
              <a-input placeholder="请输入角色名称" v-model="queryParam.roleName" />
            </a-form-item>
          </a-col>
          <a-col :md="8" :sm="12">
            <a-form-item label="角色编码">
              <a-input placeholder="请输入角色编码" v-model="queryParam.roleCode" />
            </a-form-item>
          </a-col>
          <a-col :md="(!toggleSearchStatus && 8) || 24" :sm="24">
            <span
              :style="(toggleSearchStatus && { float: 'right', overflow: 'hidden' }) || {}"
              class="table-page-search-submitButtons"
            >
              <a-button type="primary" @click="handleSearch" icon="search">查询</a-button>
              <a-button type="primary" @click="handleReset" icon="reload">重置</a-button>
            </span>
          </a-col>
        </a-row>
      </a-form>
    </div>

    <div class="table-operator">
      <a-button @click="handleAdd" type="primary" icon="plus">添加</a-button>
    </div>

    <div>
      <a-table
        ref="table"
        size="default"
        :columns="columns"
        :rowKey="(record, index) => index"
        :pagination="pagination"
        :dataSource="dataSource"
        @change="onTableChange"
        :loading="tableLoading"
      >
        <span slot="action" slot-scope="text, record">
          <a @click="handleEdit(record)">编辑</a>
          <a-divider type="vertical" />
          <a @click="grantPermission(record.id)">授权</a>
          <a-divider type="vertical" />
          <a-popconfirm title="确定删除吗?" @confirm="() => handleDelete(record.id)">
            <a>删除</a>
          </a-popconfirm>
        </span>
      </a-table>
    </div>
    <role-modal ref="modalForm" @ok="modalFormOk"></role-modal>
    <role-permission-drawer ref="rolePermission" @ok="modalFormOk"></role-permission-drawer>
  </a-card>
</template>

<script>
import { ListMixin } from '@/components/Dict'
import RolePermissionDrawer from './modals/RolePermissionDrawer'
import RoleModal from './modals/RoleModal'

export default {
  name: 'RoleList',
  mixins: [ListMixin],
  components: { RoleModal, RolePermissionDrawer },
  data () {
    return {
      columns: [
        {
          title: '角色名称',
          align: 'center',
          dataIndex: 'roleName'
        },
        {
          title: '角色编码',
          align: 'center',
          dataIndex: 'roleCode'
        },
        {
          title: '创建人',
          align: 'center',
          dataIndex: 'createUser'
        },
        {
          title: '更新人',
          align: 'center',
          dataIndex: 'updateUser'
        },
        {
          title: '更新时间',
          align: 'center',
          dataIndex: 'updateTime'
        },
        {
          title: '操作',
          dataIndex: 'action',
          align: 'center',
          scopedSlots: { customRender: 'action' }
        }
      ],
      url: {
        list: '/system/role/page',
        delete: '/system/role'
      }
    }
  },
  methods: {
    grantPermission (roleId) {
      this.$refs.rolePermission.show(roleId)
    }
  }
}
</script>
