<template>
  <a-card>
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="48">
          <a-col :md="8" :sm="12">
            <a-form-item label="用户名">
              <a-input placeholder="请输入用户名" v-model="queryParam.username" />
            </a-form-item>
          </a-col>
          <a-col :md="8" :sm="12">
            <a-form-item label="真实姓名">
              <a-input placeholder="请输入真实姓名" v-model="queryParam.realName" />
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
        :loading="tableLoading">
        <span slot="action" slot-scope="text, record">
          <a @click="handleEdit(record)">编辑</a>
          <a-divider type="vertical" />
          <a-popconfirm title="确定删除吗?" @confirm="() => handleDelete(record.id)">
            <a>删除</a>
          </a-popconfirm>
        </span>
      </a-table>
    </div>
    <user-modal ref="modalForm" @ok="modalFormOk"></user-modal>
  </a-card>
</template>

<script>
import { dictItemName } from '@/components/Dict'
import { ListMixin } from '@/mixins'
import UserModal from './modals/UserModal'

export default {
  name: 'UserList',
  mixins: [ListMixin],
  components: { UserModal },
  data () {
    return {
      columns: [
        {
          title: 'ID',
          align: 'center',
          dataIndex: 'id'
        },
        {
          title: '用户名',
          align: 'center',
          dataIndex: 'username'
        },
        {
          title: '真实姓名',
          align: 'center',
          dataIndex: 'realName'
        },
        {
          title: '状态',
          align: 'center',
          dataIndex: 'status',
          customRender: text => dictItemName('enable_status', text)
        },
        {
          title: '邮箱',
          align: 'center',
          dataIndex: 'email'
        },
        {
          title: '手机号',
          align: 'center',
          dataIndex: 'telephone'
        },
        {
          title: '备用手机号',
          align: 'center',
          dataIndex: 'telephoneBackup'
        },
        {
          title: '电话',
          align: 'center',
          dataIndex: 'phone'
        },
        {
          title: '单位编码',
          align: 'center',
          dataIndex: 'organCode'
        },
        {
          title: '创建人',
          align: 'center',
          dataIndex: 'createUser'
        },
        {
          title: '创建时间',
          align: 'center',
          dataIndex: 'createTime'
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
          title: '最后登录时间',
          align: 'center',
          dataIndex: 'lastLoginTime'
        },
        {
          title: '操作',
          dataIndex: 'action',
          align: 'center',
          scopedSlots: { customRender: 'action' }
        }
      ],
      url: {
        list: '/user/user/page',
        delete: '/user/user'
      }
    }
  }
}
</script>
