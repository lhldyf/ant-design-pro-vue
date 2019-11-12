<template>
  <div class="wrapper">
    <!-- <a-card title="拖拽调整新增表单布局" style="margin:10px" v-if="columnsInForm.length > 0">
      <a slot="extra">
        <a-button type="primary" icon="zoom-in" @click="() => ($refs.formPreview.visible = true)">预览</a-button>
      </a>
      <drag-form
        @formDesignResult="data => (createFormDesignResult = data)"
        :formItems="columnsInForm || []"
        :style="{ margin: '5px 5px' }"
      />
      <form-preview :formItems="createFormDesignResult" ref="formPreview" />
    </a-card>

    <a-card title="拖拽调整查询页布局" style="margin:10px">
      <a slot="extra">
        <a-button type="primary" icon="zoom-in" @click="() => ($refs.tablePreview.visible = true)">预览</a-button>
      </a>
      <drag-form @formDesignResult="data => (queryFormDesignResult = data)" :formItems="columnsInQuery || []" />
      <drag-table
        @tableDesignResult="data => (tableDesignResult = data)"
        :columnsDTO="columnsInTable"
        :datas="mockData"
      />

      <table-preview
        :formItems="queryFormDesignResult"
        :columns="tableDesignResult"
        :data="mockData"
        ref="tablePreview"
      />
    </a-card> -->

    <a-card title="路径相关配置" style="margin:10px">
      <!-- <div style="margin-bottom : 10px" v-if="columnsInForm.length > 0">
        <label>新增方式 : </label>
        <a-radio-group v-model="createFormType">
          <a-radio value="MODAL">弹窗</a-radio>
          <a-radio value="ROUTER">跳转</a-radio>
          <a-radio value="NONE">无新增</a-radio>
        </a-radio-group>
      </div> -->
      <a-form>
        <a-row :gutter="48">
          <a-col :span="12">
            <a-form-item label="前端工程路径">
              <a-input
                placeholder="右键IDE工程路径 Copy Path(例如:E:\Code\vue\twmw-ui) "
                v-model="frontendProjectPath"
              />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="后端工程路径">
              <a-input
                placeholder="右键IDE工程路径 Copy Path（例如E:\Code\tw-all\twmw\twmw-system）"
                v-model="backendProjectPath"
              />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="模块名称">
              <a-input placeholder="比如 alert,system,user,judge,metric" v-model="moduleName" />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="实体名称">
              <a-input placeholder="比如 AlertBatch,AlertConfig" v-model="entityName" />
            </a-form-item>
          </a-col>
          <a-col :span="24">
            <a-form-item label="前端文件路径">
              <a-input disabled v-model="frontendFileConfig.moduleFilePath" style="width:32%" />
              /
              <a-input placeholder="模块路径" v-model="frontendFileConfig.moduleName" style="width:12%" />
              / <a-input disabled :value="entityNameUpFirst" style="width:12%" />List.vue
            </a-form-item>
          </a-col>
          <a-col :span="24">
            <a-form-item label="后端文件路径">
              <a-input placeholder="项目根目录,如C:/twmw" v-model="backendFileConfig.projectPath" style="width:30%" />
              <a-divider type="vertical" />
              <a-input placeholder="模块名" disabled :value="backendFileConfig.moduleName" style="width:12%" />
              <a-divider type="vertical" />
              <a-input placeholder="Entity名" disabled :value="entityNameUpFirst" style="width:13%" />DO.java
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
      <!-- <div style="margin-bottom : 10px">
        <label>api设置信息，请拷贝至api.js中 : </label>
        <div>
          <a-input v-model="getQueryAPI" style="width:60%"></a-input>
        </div>
      </div> -->
      <div style="margin-bottom : 10px">
        <label>以下是表单和查询页的路由信息，请拷贝至router.config.js : </label>
        <div>
          <a-textarea :value="getRouteInfo('query')" autosize style="width:48%;margin:5px" />
          <a-textarea
            v-if="$store.state.cg.columnsInForm.length > 0 && createFormType == 'ROUTER'"
            :value="getRouteInfo('create')"
            autosize
            style="width:48%;margin:5px"
          />
        </div>
      </div>
    </a-card>
    <div style="text-align:center">
      <a-button
        type="primary"
        icon="cloud-upload"
        style="width:80%;"
        @click="handleSubmmit"
        :loading="loading"
      >生成</a-button
      >
    </div>
  </div>
</template>

<script>
import DragForm from './Draggable/DragForm'
import DragTable from './Draggable/DragTable'
import FormPreview from './Drawer/FormPreview'
import TablePreview from './Drawer/TablePreview'
import { toHump } from '../utils/tools'
import pick from 'lodash.pick'
import { postAction } from '@/api/manage'

export default {
  components: {
    DragForm,
    DragTable,
    FormPreview,
    TablePreview
  },
  data () {
    return {
      frontendProjectPath: '',
      backendProjectPath: '',
      moduleName: '',
      entityName: '',
      frontendFileConfig: {
        moduleFilePath: '',
        moduleName: '',
        entityName: ''
      },
      backendFileConfig: {
        projectPath: '',
        moduleName: '',
        entityName: '',
        entityDesc: ''
      },
      createFormType: '',
      createFormDesignResult: [],
      queryFormDesignResult: [],
      tableDesignResult: [],
      labelCol: { span: 6 },
      wrapperCol: { span: 18 },
      loading: false
    }
  },
  watch: {
    frontendProjectPath (value) {
      if (value) {
        const temp = value.replace(/\\/g, '/')
        if (temp.substring(temp.length - 1) === '/') {
          this.frontendFileConfig.moduleFilePath = temp + 'src/views'
        } else {
          this.frontendFileConfig.moduleFilePath = temp + '/src/views'
        }
      }
    },
    backendProjectPath (value) {
      if (value) {
        const temp = value.replace(/\\/g, '/')
        this.backendFileConfig.projectPath = temp
      }
    },
    moduleName (value) {
      if (value) {
        const temp = this.firstLowercase(value)
        this.frontendFileConfig.moduleName = temp
        this.backendFileConfig.moduleName = temp
      }
    },
    entityName (value) {
      if (value) {
        const temp = this.firstLowercase(value)
        this.frontendFileConfig.entityName = temp
        this.backendFileConfig.entityName = temp
      }
    }
  },
  computed: {
    // getQueryAPI() {
    //   return `export const query${this.firstUppercase(
    //     this.frontendFileConfig.entityName
    //   )}Page = params => postAction('/${this.backendFileConfig.moduleName}/${
    //     this.backendFileConfig.entityName
    //   }/page', params)`
    // },
    entityNameUpFirst () {
      return this.firstUppercase(this.frontendFileConfig.entityName)
    },
    getFileName () {
      return function (mode) {
        if (this.frontendFileConfig.moduleName && this.frontendFileConfig.entityName) {
          const hump = this.firstUppercase(this.frontendFileConfig.entityName)
          if (mode == 'query') {
            return hump + 'List'
          } else if (mode == 'create') {
            return hump + 'Modal'
          }
        } else {
          return ''
        }
      }
    },
    getRouteInfo () {
      return function (mode) {
        let title = ''
        let url = ''
        if (mode == 'create') {
          title = '新建'
          url = 'create'
        } else if (mode == 'query') {
          title = 'xxx列表'
          url = 'list'
        }
        var filePath = '@/views'
        var fileName = this.getFileName(mode)
        return (
          '{' +
          '\n' +
          '  path: ' +
          "'/" +
          this.frontendFileConfig.moduleName +
          '/' +
          this.frontendFileConfig.entityName +
          '/' +
          url +
          "',\n" +
          "  name: '" +
          fileName +
          "',\n" +
          '  component: ' +
          "() => import('" +
          filePath +
          '/' +
          this.frontendFileConfig.moduleName +
          '/' +
          fileName +
          "')" +
          ',\n' +
          '  meta: { \n' +
          "    title: '" +
          title +
          "', \n" +
          '    keepAlive: true,\n' +
          '  }\n' +
          '},'
        )
      }
    },
    mockData () {
      var mock_datas = []
      var columns = this.$store.state.cg.columnsInTable || []
      for (var i = 0; i < 3; i++) {
        var new_mock = {}
        for (var j = 0; j < columns.length; j++) {
          this.$set(new_mock, 'key', i)
          var curT = columns[j]
          this.$set(new_mock, curT.dataIndex, curT.title + '_' + i)
        }
        mock_datas.push(new_mock)
      }
      return mock_datas
    }
  },
  methods: {
    firstUppercase (str) {
      return str.slice(0, 1).toUpperCase() + str.slice(1)
    },
    firstLowercase (str) {
      return str.slice(0, 1).toLowerCase() + str.slice(1)
    },
    handleSubmmit () {
      this.loading = true
      localStorage.setItem('frontendFilePath', this.frontendProjectPath.replace(/\\/g, '/'))
      localStorage.setItem('backendFilePath', this.backendProjectPath.replace(/\\/g, '/'))
      postAction('/page_design', this.buildPostData()).then(res => {
        this.loading = false
        if (res.success) {
          window.console.log(res)
          this.$message.success('生成成功')
          this.$emit('success', {
            listRoute: this.getRouteInfo('query')
          })
        } else {
          this.$message.error('生成失败!')
        }
      })
    },
    buildPostData () {
      var pageDesignDTO = {
        createForm: {
          itemLists: this.$store.state.cg.columnsInForm.map(element =>
            pick(element, [
              'columnName',
              'codeName',
              'columnComment',
              'componentTpye',
              'placeholder',
              'componentSetting',
              'columnType'
            ])
          ),
          ...this.frontendFileConfig
        },
        queryForm: {
          itemLists: this.$store.state.cg.columnsInQuery.map(element =>
            pick(element, [
              'columnName',
              'codeName',
              'columnComment',
              'componentTpye',
              'placeholder',
              'componentSetting',
              'columnType'
            ])
          ),
          ...this.frontendFileConfig
        },
        queryTable: {
          createFormType: this.createFormType,
          tableDataList: this.$store.state.cg.columnsInTable.map(element =>
            pick(element, [
              'columnName',
              'title',
              'dataIndex',
              'columnType',
              'componentTpye',
              'componentSetting',
              'scopedSlots'
            ])
          ),
          ...this.frontendFileConfig
        },
        updateForm: {
          itemLists: this.$store.state.cg.columnsInUpdate.map(element =>
            pick(element, [
              'columnName',
              'codeName',
              'columnComment',
              'componentTpye',
              'placeholder',
              'componentSetting',
              'columnType'
            ])
          ),
          ...this.frontendFileConfig
        },
        backendConfig: {
          dataBaseTableName: this.$store.state.cg.currentTable,
          entityDesc: this.$store.state.cg.tableComment,
          ...this.backendFileConfig
        }
      }
      window.console.log('上传的数据:', pageDesignDTO)
      return pageDesignDTO
    }
  },
  created () {},
  mounted () {
    this.frontendProjectPath = localStorage.getItem('frontendFilePath') || ''
    this.backendProjectPath = localStorage.getItem('backendFilePath') || ''
  }
}
</script>
