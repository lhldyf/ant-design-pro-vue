<template>
  <a-card>
    <a-tabs v-model="activeKey">
      <a-tab-pane key="1" tab="表列表">
        <database-tables @next="() => (activeKey = '2')" />
      </a-tab-pane>
      <a-tab-pane key="2" tab="页面配置" :disabled="!$store.state.cg.currentTable">
        <config-table @next="() => (activeKey = '3')" />
      </a-tab-pane>
      <a-tab-pane key="3" tab="生成配置" :disabled="!$store.state.cg.currentTable">
        <database-gen-config @success="handleGenSuccess" />
      </a-tab-pane>
      <a-tab-pane key="4" tab="生成成功" disabled>
        <database-gen-success :successData="successData" @back="() => (activeKey = '1')" />
      </a-tab-pane>
    </a-tabs>
  </a-card>
</template>

<script>
import DatabaseTables from './components/List/DatabaseTables'
import ConfigTable from './components/Table/ConfigTable'
import DatabaseGenConfig from './components/DatabaseGenConfig'
import DatabaseGenSuccess from './components/DatabaseGenSuccess'

export default {
  name: 'GenFromDatabase',
  components: {
    DatabaseTables,
    ConfigTable,
    DatabaseGenConfig,
    DatabaseGenSuccess
  },
  data () {
    return {
      activeKey: '1',
      successData: {}
    }
  },
  mounted () {},
  methods: {
    handleGenSuccess (data) {
      this.successData = data
      this.activeKey = '4'
    }
  }
}
</script>
