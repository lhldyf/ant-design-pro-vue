<template>
  <div>
    <!-- table -->
    <a-card>
      <a-table :columns="columns" :dataSource="data" :pagination="false" :loading="memberLoading" size="small">
        <span slot="componentTpye" slot-scope="text, record">
          <a-select v-if="record.editable" class="t-input" v-model="record.componentTpye" placeholder="控件类型">
            <a-select-option value="input">input</a-select-option>
            <a-select-option value="select">select</a-select-option>
            <a-select-option value="textarea">textarea</a-select-option>
          </a-select>
          <template v-else>{{ text }}</template>
        </span>
        <template slot="tagName" slot-scope="text, record">
          <a-input v-if="record.editable" class="t-input" v-model="record.tagName" placeholder="标签名" />
          <template v-else>{{ text }}</template>
        </template>
        <template slot="columnName" slot-scope="text, record">
          <a-input v-if="record.editable" class="t-input" v-model="record.columnName" placeholder="列名" />
          <template v-else>{{ text }}</template>
        </template>
        <template slot="componentSetting" slot-scope="text, record">
          <a-input
            v-if="record.editable"
            class="t-input"
            v-model="record.componentSetting"
            :placeholder="(record.componentTpye == 'select' && '请输入字典名') || '控件设置'"
          />
          <template v-else>{{ text }}</template>
        </template>

        <template slot="operation" slot-scope="text, record, index">
          <template v-if="record.editable">
            <span v-if="record.isNew">
              <a @click="saveRow(record)">添加</a>
              <a-divider type="vertical" />
              <a-popconfirm title="是否要删除此行？" @confirm="remove(record.key)">
                <a>删除</a>
              </a-popconfirm>
            </span>
            <span v-else>
              <a @click="saveRow(record)">保存</a>
              <a-divider type="vertical" />
              <a @click="cancel(record.key)">取消</a>
            </span>
          </template>
          <span v-else>
            <a @click="toggle(record.key)">编辑</a>
            <a-divider type="vertical" />
            <a-popconfirm title="是否要删除此行？" @confirm="remove(record.key)">
              <a>删除</a>
            </a-popconfirm>
          </span>
          <a-divider type="vertical" />
          <a-icon
            v-if="index > 0"
            type="arrow-up"
            style="color:blue;cursor:pointer"
            @click="data[index - 1] = data.splice(index, 1, data[index - 1])[0]"
          />
          <a-icon v-else type="minus" style="color:blue" />
          <a-divider type="vertical" />
          <a-icon
            v-if="index <= data.length - 2"
            type="arrow-down"
            style="color:blue;cursor:pointer"
            @click="data[index + 1] = data.splice(index, 1, data[index + 1])[0]"
          />
          <a-icon v-else type="minus" style="color:blue" />
        </template>
      </a-table>
      <a-button
        style="width: 100%; margin-top: 16px; margin-bottom: 8px"
        type="dashed"
        icon="plus"
        @click="newMember"
      >新增表单项</a-button
      >
      <a-input placeholder="请输入该EntityName" v-model="frontendEntityName" style="width:160px;margin:10px"></a-input>
      <a-button type="primary" @click="generateForm">生成</a-button>
    </a-card>
    <a-textarea v-model="generatedCode" autosize></a-textarea>
  </div>
</template>

<script>
import './template/template-web.js'
import { formTemplate } from './template/modalForm.art.js'
const columns = [
  {
    align: 'center',
    title: '字段名',
    dataIndex: 'columnName',
    key: 'columnName',
    scopedSlots: {
      customRender: 'columnName'
    }
  },
  {
    align: 'center',
    title: '标签名',
    key: 'tagName',
    dataIndex: 'tagName',
    scopedSlots: {
      customRender: 'tagName'
    }
  },
  {
    title: '控件类型',
    align: 'center',
    dataIndex: 'componentTpye',
    key: 'componentTpye',
    // slot: "componentTpye",
    scopedSlots: {
      customRender: 'componentTpye'
    }
  },
  {
    title: '控件设置',
    key: 'componentSetting',
    dataIndex: 'componentSetting',
    align: 'center',
    // slot: "componentSetting",
    scopedSlots: {
      customRender: 'componentSetting'
    }
  },
  {
    title: '操作',
    key: 'action',
    scopedSlots: {
      customRender: 'operation'
    }
  }
]
const data = [
  {
    key: '1',
    columnName: 'id',
    tagName: '主键',
    componentTpye: 'input',
    componentSetting: '主键设置',
    editable: false,
    isNew: false
  },
  {
    key: '2',
    columnName: 'creator',
    tagName: '创建者',
    componentTpye: 'select',
    componentSetting: '创建者设置',
    editable: false,
    isNew: false
  }
]

export default {
  name: 'GenFromPage',
  components: {},
  data () {
    return {
      memberLoading: false,
      frontendEntityName: '',
      // table
      columns,
      data,
      generatedCode: ''
    }
  },
  methods: {
    generateForm () {
      // web环境不支持读取模板文件,所以将模板文件作为一个script引入
      const script = document.createElement('script')
      script.type = 'text/html'
      script.id = 'temp1'
      script.text = formTemplate
      console.log(script)
      document.getElementsByTagName('head')[0].appendChild(script)
      const html = template('temp1', {
        // ./template/modalForm.art
        frontendEntityName: this.frontendEntityName,
        formItems: this.data
      })
      this.generatedCode = html
    },
    handleSubmit (e) {
      e.preventDefault()
    },
    newMember () {
      const length = this.data.length
      this.data.push({
        key: length === 0 ? '1' : (parseInt(this.data.length) + 1).toString(),
        columnName: '',
        tagName: '',
        componentTpye: '',
        componentSetting: '',
        editable: true,
        isNew: true
      })
    },
    remove (key) {
      const newData = this.data.filter(item => item.key !== key)
      this.data = newData
    },
    saveRow (record) {
      this.memberLoading = true
      const { key, columnName, tagName, componentTpye, componentSetting } = record
      console.log('record', record)
      if (!columnName || !tagName || !componentTpye || !componentSetting) {
        this.memberLoading = false
        this.$message.error('请填写完整成员信息。')
        return
      }
      // 模拟网络请求、卡顿 800ms
      new Promise(resolve => {
        setTimeout(() => {
          resolve({
            loop: false
          })
        }, 200)
      }).then(() => {
        const target = this.data.filter(item => item.key === key)[0]
        target.editable = false
        target.isNew = false
        this.memberLoading = false
      })
    },
    toggle (key) {
      const target = this.data.filter(item => item.key === key)[0]
      target.editable = !target.editable
    },
    cancel (key) {
      const target = this.data.filter(item => item.key === key)[0]
      target.editable = false
    },
    handleChange (value, key, column) {
      const newData = [...this.data]
      const target = newData.filter(item => key === item.key)[0]
      if (target) {
        target[column] = value
        this.data = newData
      }
    },

    scrollToField (fieldKey) {
      const labelNode = document.querySelector(`label[for="${fieldKey}"]`)
      if (labelNode) {
        labelNode.scrollIntoView(true)
      }
    }
  },
  mounted () {}
}
</script>

<style lang="less" scoped>
.t-input {
  width: 150px;
  margin: -5px 0;
}
</style>
