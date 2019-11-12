<template>
  <a-card :bordered="false">
    <!-- 左侧面板 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="12">
          <a-col :md="8">
            <a-form-item label="字典名称" :labelCol="{ span: 6 }" :wrapperCol="{ span: 14, offset: 1 }">
              <a-input placeholder="请输入字典名称" v-model="queryParam.name"></a-input>
            </a-form-item>
          </a-col>
          <a-col :md="8">
            <a-form-item label="字典编号" :labelCol="{ span: 6 }" :wrapperCol="{ span: 14, offset: 1 }">
              <a-input placeholder="请输入字典编号" v-model="queryParam.code"></a-input>
            </a-form-item>
          </a-col>
          <a-col :md="8">
            <span class="table-page-search-submitButtons">
              <a-button type="primary" @click="handleSearch()" icon="search">查询</a-button>
              <a-button type="primary" @click="handleReset()" icon="reload">重置</a-button>
            </span>
          </a-col>
        </a-row>
      </a-form>
    </div>

    <div class="table-operator" style="border-top: 5px">
      <a-button @click="handleAdd" type="primary" icon="plus">添加</a-button>
      <!-- <a-button type="primary" icon="download" @click="handleExportXls('字典信息')">导出</a-button>
      <a-upload
        name="file"
        :showUploadList="false"
        :multiple="false"
        :headers="tokenHeader"
        :action="importExcelUrl"
        @change="handleImportExcel"
      >
        <a-button type="primary" icon="import">导入</a-button>
      </a-upload> -->
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
          <a @click="handleEdit(record)">
            <a-icon type="edit" />
            编辑
          </a>
          <a-divider type="vertical" />
          <a @click="editDictItem(record)"><a-icon type="setting" /> 字典配置</a>
          <a-divider type="vertical" />
          <a-popconfirm title="确定删除吗?" @confirm="() => handleDelete(record.id)">
            <a>删除</a>
          </a-popconfirm>
        </span>
      </a-table>
    </div>
    <dict-modal ref="modalForm" @ok="modalFormOk"></dict-modal>
    <!-- 字典类型 -->
    <dict-item-list ref="dictItemList"></dict-item-list>
  </a-card>
</template>

<script>
import { ListMixin } from '@/mixins/ListMixins'
import DictModal from './modals/DictModal'
import DictItemList from './DictItemList'

export default {
  name: 'DictList',
  mixins: [ListMixin],
  components: { DictModal, DictItemList },
  data () {
    return {
      visible: false,
      // 表头
      columns: [
        {
          title: '字典名称',
          align: 'left',
          dataIndex: 'name'
        },
        {
          title: '字典编号',
          align: 'left',
          dataIndex: 'code'
        },
        {
          title: '描述',
          align: 'left',
          dataIndex: 'description'
        },
        {
          title: '操作',
          dataIndex: 'action',
          align: 'center',
          scopedSlots: { customRender: 'action' }
        }
      ],
      url: {
        list: '/metadata/dict/page',
        delete: '/metadata/dict'
      }
    }
  },
  methods: {
    // 编辑字典数据
    editDictItem (record) {
      this.$refs.dictItemList.edit(record)
    }
  }
}
</script>
