<template>
  <a-card :bordered="false">
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="48">
          <template v-for="(item, key, index) in queryParam">
            <a-col
              :md="item.md || md"
              :sm="item.sm || sm"
              :xxl="item.xxl || xxl"
              :xl="item.xl || xl"
              :key="item.label"
              v-show="toggleSearchStatus || index < 3"
            >
              <a-form-item :label="item.label">
                <a-input
                  v-if="item.type === 'input'"
                  :placeholder="item.placeholder || '请输入' + item.label"
                  v-model="item.value"
                />
                <dict-select
                  v-if="item.type === 'DictSelect'"
                  :dictCode="item.dictCode"
                  v-model="item.value"
                  :allOption="true"
                />
                <advanced-select
                  v-if="item.type === 'AdvancedSelect'"
                  :type="item.dictCode"
                  v-model="item.value"
                  :allOption="true"
                ></advanced-select>
                <user-organ-select
                  v-if="item.type === 'UserOrganSelect'"
                  :showRoot="true"
                  v-model="item.value"
                  :allOption="true"
                ></user-organ-select>
                <a-date-picker
                  v-if="item.type === 'datepicker' && item.queryMode === '1'"
                  @change="(date, dateStr) => (item.value = dateStr)"
                />
                <a-range-picker
                  v-if="item.type === 'datepicker' && item.queryMode === '2'"
                  @change="(date, dateStr) => onDateRangeChange(date, dateStr, item)"
                />
              </a-form-item>
            </a-col>
          </template>

          <a-col
            :md="(!toggleSearchStatus && md) || 24"
            :sm="(!toggleSearchStatus && sm) || 24"
            :xxl="(!toggleSearchStatus && xxl) || 24"
            :xl="(!toggleSearchStatus && xl) || 24"
          >
            <!-- <a-col :md="(!toggleSearchStatus && 8) || 24" :sm="24"> -->
            <span
              class="table-page-search-submitButtons"
              :style="(toggleSearchStatus && { float: 'right', overflow: 'hidden' }) || {}"
            >
              <a-button type="primary" @click="handleSearch">查询</a-button>
              <a-button @click="handleReset">重置</a-button>
              <a @click="() => (toggleSearchStatus = !toggleSearchStatus)" v-if="Object.keys(queryParam).length > 3">
                {{ toggleSearchStatus ? '收起' : '展开' }}
                <a-icon :type="toggleSearchStatus ? 'up' : 'down'" />
              </a>
            </span>
          </a-col>
        </a-row>
      </a-form>
    </div>

    <div class="table-operator">
      <!-- <a-button @click="$emit('handleAdd')" type="primary" icon="plus">添加</a-button> -->
    </div>

    <div ref="tableDiv">
      <a-table
        ref="table"
        size="default"
        :columns="columns"
        :rowKey="(record, index) => index"
        :pagination="pagination"
        :dataSource="dataSource"
        @change="onTableChange"
        :loading="tableLoading"
        :scroll="{ x: xScroll }"
      >
        <div slot="filterDropdown">
          <a-card style="width: 500px;">
            <a-checkbox-group
              @change="onColSettingsChange"
              v-model="selectedColumnKeys"
              :defaultValue="selectedColumnKeys"
            >
              <a-row>
                <template v-for="item in allColumns">
                  <template v-if="item.key != 'rowIndex' && item.dataIndex != 'action'">
                    <a-col :span="12" :key="item.dataIndex">
                      <a-checkbox :value="item.dataIndex">{{ item.title }}</a-checkbox>
                    </a-col>
                  </template>
                </template>
              </a-row>
            </a-checkbox-group>
          </a-card>
        </div>
        <a-icon slot="filterIcon" type="setting" :style="{ fontSize: '16px', color: '#108ee9' }" />
        <!-- 未解决问题，这里不能连续使用slot-scope这个关键字，如果两个template都使用了slot-scope关键字，前面这个tempalate将失效 -->
        <template v-for="item in columns" :slot="item.dataIndex" slot-scope="text, record, index">
          <span :key="item.dataIndex">
            <slot :name="item.dataIndex" :text="text" :record="record" :index="index">
              <ellipsis :length="item.ellipsisLength || 20" tooltip>{{ text }}</ellipsis>
            </slot>
          </span>
        </template>
        <span slot="action"></span>
      </a-table>
    </div>
  </a-card>
</template>

<script>
import { ListMixin, dictItemName, advancedItemName, initAdvancedStore } from '@/components/Dict'
import { getAction, postAction } from '@/api/manage'
import Vue from 'vue'

const actionColumn = {
  title: '',
  dataIndex: 'action',
  align: 'center',
  width: 10,
  fixed: 'right',
  scopedSlots: {
    filterDropdown: 'filterDropdown',
    filterIcon: 'filterIcon',
    customRender: 'action'
  }
}

export default {
  name: 'FlexList',
  mixins: [ListMixin],
  data () {
    return {
      test: 'description',
      // 页面实际展示的列
      columns: [],
      // 页面支持的所有的列
      allColumns: [],
      // 已选择的列的key, 以dataIndex为key
      selectedColumnKeys: [],
      url: {
        list: '/pageData',
        delete: '/demo'
      },
      queryParam: {},
      pageId: '',
      xScroll: undefined,
      sm: 24,
      md: 12,
      xl: 8,
      xxl: 6,
      mountedLoadPage: false
    }
  },
  created () {
  },
  async mounted () {
    this.pageId = this.$route.params.pageId
    if (!this.pageId) {
      this.pageId = this.$route.meta.params && this.$route.meta.params.pageId
    }
    if (!this.pageId) {
      console.log('TablePage配置错误')
      return
    }
    this.initSearchForm()
    await this.initTableColumn()
    this.loadPage()
  },
  watch: {
    columns (val) {
      const maxWidth = this.$refs.tableDiv.offsetWidth
      if (maxWidth < val.length * 100) {
        this.xScroll = val.length * 100
      } else {
        this.xScroll = undefined
      }
    }
  },
  methods: {
    onDateChange (date, dateStrings) {
      this.queryParam.occurDateBegin = dateStrings[0]
      this.queryParam.occurDateEnd = dateStrings[1]
    },
    async initTableColumn () {
      const url = `/flex/list/tableColumn/${this.pageId}`
      const advancedType = []
      await getAction(url).then(async res => {
        if (res.success) {
          const temp = res.data
          temp.forEach(column => {
            if (column.renderType === 'DictSelect') {
              column.customRender = text => dictItemName(column.dictCode, text)
            } else if (column.renderType === 'AdvancedSelect') {
              advancedType.push(column.dictCode)
              column.customRender = text => advancedItemName(column.dictCode, text)
            } else if (column.renderType === 'UserOrganSelect') {
              column.customRender = text => advancedItemName(column.dictCode, text)
            } else {
              column.scopedSlots = { customRender: column.dataIndex }
            }
          })
          this.allColumns = temp.concat(actionColumn)
          const selectedColumnKeysCache = Vue.ls.get(this.selectedColumnKeysCacheName())
          if (selectedColumnKeysCache) {
            this.selectedColumnKeys = selectedColumnKeysCache
            this.columns = this.allColumns.filter(item => {
              if (item.key == 'rowIndex' || item.dataIndex == 'action') {
                return true
              }
              if (selectedColumnKeysCache.includes(item.dataIndex)) {
                return true
              }
              return false
            })
          } else {
            this.columns = this.allColumns.filter(item => {
              if (item.key == 'rowIndex' || item.dataIndex == 'action') {
                return true
              }
              return item.defaultShow
            })
            this.selectedColumnKeys = this.columns.map(x => x.dataIndex)
          }
        }
      })
      if (advancedType.length != 0) {
        for (const item of advancedType) {
          await initAdvancedStore(item)
        }
      }
    },
    initSearchForm () {
      const url = `/flex/list/searchForm/${this.pageId}`
      getAction(url).then(res => {
        if (res.success) {
          this.queryParam = res.data
        }
      })
    },
    loadData (params) {
      const url = `/flex/list/pageData/${this.pageId}`
      const temp = Object.assign({}, params)
      Object.keys(this.queryParam).forEach(key => {
        if (this.queryParam[key].value) {
          temp[key] = this.queryParam[key].value
        }
      })

      return postAction(url, temp)
    },
    onColSettingsChange (checkedValues) {
      Vue.ls.set(this.selectedColumnKeysCacheName(), checkedValues, 7 * 24 * 60 * 60 * 1000)
      this.selectedColumnKeys = checkedValues
      const cols = this.allColumns.filter(item => {
        if (item.key == 'rowIndex' || item.dataIndex == 'action') {
          return true
        }
        if (this.selectedColumnKeys.includes(item.dataIndex)) {
          return true
        }
        return false
      })
      this.columns = cols
    },
    selectedColumnKeysCacheName () {
      return this.$route.fullPath + ':colSettings'
    },
    handleReset () {
      Object.keys(this.queryParam).forEach(x => {
        this.queryParam[x].value = undefined
      })
      this.loadPage()
    },
    onDateRangeChange (date, dateStr, item) {
      if (date.length === 0) {
        item.value = undefined
      } else {
        item.value = dateStr
      }
    }
  }
}
</script>
