<template>
  <a-list :dataSource="tableNames" :grid="{ gutter: 24, column: 3 }">
    <a-list-item slot="renderItem" slot-scope="item">
      <a-card :title="item.tableName">
        <span v-if="item.tableComment">{{ item.tableComment }}</span>
        <a-icon v-else type="question-circle" />
        <template class="ant-card-actions" slot="actions">
          <a @click="handleGenerate(item)">代码生成</a>
        </template>
      </a-card>
    </a-list-item>
  </a-list>
</template>
<script>
import { getAction } from '@/api/manage'

export default {
  data () {
    return {
      tableNames: []
    }
  },
  methods: {
    getTables () {
      getAction('/table').then(res => {
        if (res.success) {
          this.tableNames = res.data
        } else {
          this.$message.error('请求表名失败!')
        }
      })
    },
    handleGenerate (item) {
      const { tableName, tableComment } = item
      this.$store.commit('changeTable', { tableName, tableComment })
      this.$emit('next')
      // this.$router.push({ name: 'PageDesign_1' })
    }
  },
  mounted () {
    this.getTables()
  }
}
</script>
