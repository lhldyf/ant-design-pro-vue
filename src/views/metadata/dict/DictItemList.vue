<template>
  <a-card :bordered="false">
    <!-- 抽屉 -->
    <a-drawer title="字典列表" :width="screenWidth" @close="onClose" :visible="visible">
      <!-- 抽屉内容的border -->
      <div
        :style="{
          padding: '10px',
          border: '1px solid #e9e9e9',
          background: '#fff'
        }"
      >
        <div class="table-page-search-wrapper">
          <a-form layout="inline">
            <a-row :gutter="10">
              <a-col :md="8" :sm="12">
                <a-form-item label="名称">
                  <a-input style="width: 120px;" placeholder="请输入名称" v-model="queryParam.itemText"></a-input>
                </a-form-item>
              </a-col>
              <a-col :md="9" :sm="24">
                <a-form-item label="状态" style="width: 170px" :labelCol="labelCol" :wrapperCol="wrapperCol">
                  <dict-select placeholder="请选择" dictCode="enable_status" v-model="queryParam.status" />
                </a-form-item>
              </a-col>
              <a-col :md="7" :sm="24">
                <span style="float: left;" class="table-page-search-submitButtons">
                  <a-button type="primary" @click="handleSearch">搜索</a-button>
                  <a-button type="primary" @click="handleReset">重置</a-button>
                </span>
              </a-col>
            </a-row>
            <a-row>
              <a-col :md="2" :sm="24">
                <a-button style="margin-bottom: 10px" type="primary" @click="handleAdd">新增</a-button>
              </a-col>
            </a-row>
          </a-form>
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
              <a-popconfirm title="确定删除吗?" @confirm="() => handleDelete(record.id)">
                <a>删除</a>
              </a-popconfirm>
            </span>
          </a-table>
        </div>
      </div>
    </a-drawer>
    <dict-item-modal ref="modalForm" @ok="modalFormOk"></dict-item-modal>
    <!-- 字典数据 -->
  </a-card>
</template>

<script>
import { DictSelect } from '@/components/Dict'
import DictItemModal from './modals/DictItemModal'
import { ListMixin } from '@/mixins/ListMixins'

export default {
  name: 'DictItemList',
  mixins: [ListMixin],
  components: { DictItemModal, DictSelect },
  data () {
    return {
      columns: [
        {
          title: '字典键值',
          align: 'center',
          dataIndex: 'itemCode'
        },
        {
          title: '字典项名称',
          align: 'center',
          dataIndex: 'itemName'
        },
        {
          title: '操作',
          dataIndex: 'action',
          align: 'center',
          scopedSlots: { customRender: 'action' }
        }
      ],
      screenWidth: 800,
      dictCode: '',
      dictId: '',
      visible: false,
      status: 1,
      labelCol: {
        xs: { span: 5 },
        sm: { span: 5 }
      },
      wrapperCol: {
        xs: { span: 12 },
        sm: { span: 12 }
      },
      url: {
        list: '/metadata/dictItem/page',
        delete: '/sys/dictItem'
      }
    }
  },
  created () {
    // 当页面初始化时,根据屏幕大小来给抽屉设置宽度
    this.resetScreenSize()
  },
  methods: {
    edit (record) {
      if (record.code) {
        this.dictCode = record.code
        this.dictId = record.id
      }
      // 当其它模块调用该模块时,调用此方法加载字典数据
      this.loadPage()
      this.visible = true
    },
    handleAdd () {
      this.$refs.modalForm.add(this.dictId, this.dictCode)
      this.$refs.modalForm.title = '新增'
      this.$refs.modalForm.disableSubmit = false
    },
    wrapListQueryParams (params) {
      params.dictCode = this.dictCode
      return params
    },
    showDrawer () {
      this.visible = true
    },
    onClose () {
      this.visible = false
      this.dataSource = []
    },
    // 抽屉的宽度随着屏幕大小来改变
    resetScreenSize () {
      const screenWidth = document.body.clientWidth
      if (screenWidth < 600) {
        this.screenWidth = screenWidth
      } else {
        this.screenWidth = 600
      }
    }
  }
}
</script>
