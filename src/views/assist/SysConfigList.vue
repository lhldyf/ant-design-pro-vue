<template>
  <a-card>
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="48">
          <a-col :md="8" :sm="12">
            <a-form-item label="配置key">
              <a-input placeholder="请输入配置key" v-model="queryParam.configKey" />
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
        <template slot="configValue" slot-scope="text">
          <ellipsis :length="20" tooltip>{{ text }}</ellipsis>
        </template>
        <template slot="configRemark" slot-scope="text">
          <ellipsis :length="20" tooltip>{{ text }}</ellipsis>
        </template>
        <span slot="action" slot-scope="text, record">
          <a @click="handleEdit(record)">编辑</a>
          <a-divider type="vertical" />
          <a-popconfirm title="确定删除吗?" @confirm="() => handleDelete(record.id)">
            <a>删除</a>
          </a-popconfirm>
        </span>
      </a-table>
    </div>
    <sysConfig-modal ref="modalForm" @ok="modalFormOk"></sysConfig-modal>
  </a-card>
</template>

<script>
import { ListMixin } from '@/mixins'
import { dictItemName } from '@/components/Dict'
import SysConfigModal from './modals/SysConfigModal'

export default {
  name: 'SysConfigList',
  mixins: [ListMixin],
  components: { SysConfigModal },
  data () {
    return {
      columns: [
        {
          title: '配置key',
          align: 'center',
          dataIndex: 'configKey'
        },
        {
          title: '配置值',
          align: 'center',
          dataIndex: 'configValue',
          scopedSlots: { customRender: 'configValue' }
        },
        {
          title: '配置说明',
          align: 'center',
          dataIndex: 'configRemark',
          scopedSlots: { customRender: 'configRemark' }
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
        list: '/assist/config/page',
        delete: '/assist/config'
      }
    }
  }
}
</script>
