<template>
  <a-card :title="$store.state.cg.currentTable">
    <a-button type="primary" @click="$emit('next')" slot="extra">提交</a-button>
    <a-table
      :bordered="true"
      :columns="columns"
      :dataSource="data"
      :pagination="false"
      :loading="loading"
      size="small"
      :rowKey="(record, index) => index"
    >
      <span slot="inFormTitle">
        新增表单
        <a-checkbox @change="allSelected('inForm')" />
      </span>
      <span slot="inUpdateTitle">
        是否更新
        <a-checkbox @change="allSelected('inUpdate')" />
      </span>
      <span slot="inQueryTitle">
        列表查询
        <a-checkbox @change="allSelected('inQuery')" />
      </span>
      <span slot="inTableTitle">
        列表显示
        <a-checkbox @change="allSelected('inTable')" />
      </span>
      <a-select
        slot="componentTpye"
        slot-scope="text, record"
        style="width:100px"
        defaultValue="input"
        v-model="record.componentTpye"
      >
        <a-select-option key="componentTpye" value="input">input</a-select-option>
        <a-select-option key="componentTpye" value="select">select</a-select-option>
        <a-select-option key="componentTpye" value="textarea">textarea</a-select-option>
        <a-select-option key="componentTpye" value="datapicker">日期选择器</a-select-option>
      </a-select>
      <template slot="componentSetting" slot-scope="text, record">
        <div v-if="record.componentTpye === 'select'">
          <a-input v-model="record.componentSetting" placeholder="输入字典code" style="width:100%" />
        </div>
        <div v-else-if="record.componentTpye === 'input'">
          <a-input v-model="record.placeholder" placeholder="输入placeholder" style="width:100%" />
        </div>
      </template>
      <a-checkbox
        slot="inForm"
        slot-scope="text, record"
        :checked="record.inForm"
        :disabled="record.columnName === ('id' || 'ID')"
        @change="handleSelectChange(record.key, 'inForm')"
      />
      <a-checkbox
        slot="inQuery"
        slot-scope="text, record"
        :checked="record.inQuery"
        :disabled="record.columnName === ('id' || 'ID')"
        @change="handleSelectChange(record.key, 'inQuery')"
      />
      <a-checkbox
        slot="inTable"
        slot-scope="text, record"
        :checked="record.inTable"
        :disabled="record.columnName === ('id' || 'ID')"
        @change="handleSelectChange(record.key, 'inTable')"
      />
      <a-checkbox
        slot="inUpdate"
        slot-scope="text, record"
        :checked="record.inUpdate"
        :disabled="record.columnName === ('id' || 'ID')"
        @change="handleSelectChange(record.key, 'inUpdate')"
      />
    </a-table>
    <footer-tool-bar>
      <a-button type="primary" @click="$emit('next')">提交</a-button>
    </footer-tool-bar>
  </a-card>
</template>

<script>
import { toHump } from '../../utils/tools'
import { getAction } from '@/api/manage'
import { mapMutations } from 'vuex'

const columns = [
  {
    align: 'center',
    title: '字段名',
    dataIndex: 'columnName',
    key: 'columnName',
    width: 100
  },
  {
    align: 'center',
    title: '说明',
    width: 100,
    dataIndex: 'columnComment',
    key: 'columnComment'
  },
  {
    align: 'center',
    width: 40,
    key: 'inForm',
    dataIndex: 'inForm',
    slots: {
      title: 'inFormTitle'
    },
    scopedSlots: {
      customRender: 'inForm'
    }
  },
  {
    align: 'center',
    width: 40,
    key: 'inUpdate',
    dataIndex: 'inUpdate',
    slots: {
      title: 'inUpdateTitle'
    },
    scopedSlots: {
      customRender: 'inUpdate'
    }
  },
  {
    align: 'center',
    title: '标签名',
    key: 'tagName',
    width: 100,
    dataIndex: 'columnComment',
    slots: {
      title: 'tagName'
    },
    scopedSlots: {
      customRender: 'tagName'
    }
  },
  {
    title: '代码名',
    align: 'center',
    width: 100,
    key: 'codeName',
    dataIndex: 'codeName',
    slots: {
      title: 'codeName'
    },
    scopedSlots: {
      customRender: 'codeName'
    }
  },
  {
    align: 'center',
    width: 40,
    key: 'inQuery',
    dataIndex: 'inQuery',
    slots: {
      title: 'inQueryTitle'
    },
    scopedSlots: {
      customRender: 'inQuery'
    }
  },
  {
    align: 'center',
    width: 40,
    key: 'inTable',
    dataIndex: 'inTable',
    slots: {
      title: 'inTableTitle'
    },
    scopedSlots: {
      customRender: 'inTable'
    }
  },
  {
    title: '控件类型',
    align: 'center',
    key: 'componentTpye',
    width: 150,
    slot: 'componentTpye',
    scopedSlots: {
      customRender: 'componentTpye'
    }
  },
  {
    title: '控件设置',
    key: 'componentSetting',
    align: 'center',
    slot: 'componentSetting',
    width: 150,
    scopedSlots: {
      customRender: 'componentSetting'
    }
  }
]
const data = [] // 填充表格的数据，即数据库列
const selectedRows = [] // 选中要生成表单的列

export default {
  data () {
    return {
      data,
      columns,
      selectedRows,
      loading: false
    }
  },
  computed: {
    curTableName () {
      return this.$store.state.cg.currentTable
    }
  },
  // props:[curDataBase,],
  methods: {
    ...mapMutations(['setColumns']),
    getTableColumns (tableName) {
      this.loading = true
      var vm = this
      getAction('/table' + '/' + tableName)
        .then(response => {
          window.console.log(response)
          if (response.success) {
            var columns = response.data
            vm.data = columns
            for (var i = 0; i < vm.data.length; i++) {
              const cur = vm.data[i]
              const codeName = toHump(cur.columnName)
              const title = cur.columnComment
              vm.$set(cur, 'key', i)
              vm.$set(cur, 'title', title)
              vm.$set(cur, 'dataIndex', codeName)
              vm.$set(cur, 'align', 'center')
              vm.$set(cur, 'codeName', codeName)
              vm.$set(cur, 'componentTpye', 'input')
              vm.$set(cur, 'componentSetting', '')
              vm.$set(cur, 'placeholder', '请输入' + title)
              const defaultChecked = codeName === ('id' || 'ID')
              vm.$set(cur, 'inForm', defaultChecked) // 当前字段是否在新增表单中
              vm.$set(cur, 'inQuery', defaultChecked) // 当前字段是否在查询表单中
              vm.$set(cur, 'inTable', defaultChecked) // 当前字段是否在查询列表中
              vm.$set(cur, 'inUpdate', defaultChecked) // 当前字段是否在更新列表中
              if (cur.columnType === 'text') {
                vm.$set(cur, 'scopedSlots', {
                  customRender: codeName
                })
              }
            }
            window.console.log('请求到列数据:', vm.data)
            this.setColumns(this.data)
            // this.$emit('getRowInfo', this.data)
            this.loading = false
          } else {
            this.$message.error('请求数据库列名失败')
          }
        })
        .catch(() => {})
    },
    handleSelectChange (recordKey, checkAttr) {
      console.log('select change : ', checkAttr, window.event.target.checked)
      this.data[recordKey][checkAttr] = window.event.target.checked
      this.setColumns(this.data)
    },
    allSelected (checkAttr) {
      this.data.forEach(element => {
        if (element.columnName !== ('id' || 'ID')) {
          element[checkAttr] = window.event.target.checked
        }
      })
      this.setColumns(this.data)
    }
  },
  mounted () {
    this.getTableColumns(this.curTableName)
  },
  created () {},
  watch: {
    curTableName (newTable) {
      this.getTableColumns(newTable)
    }
  }
}
</script>
