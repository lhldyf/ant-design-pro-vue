<template>
  <div>
    <a-drawer
      title="查询页面预览"
      :height="600"
      :placement="placement"
      :closable="true"
      @close="onClose"
      :visible="visible">
      <a-row>
        <a-col :span="22">
          <form-items :formItems="formItems"/>
        </a-col>
        <a-col :span="2">
          <div>
            <a-button type="dashed" :style="{margin:'10px 10px'}">重置</a-button>
            <a-button type="primary" :style="{margin:'10px 10px'}">查询</a-button>
          </div>
        </a-col>
      </a-row>

      <a-table :columns="columns" :dataSource="data" bordered size="small" />

    </a-drawer>
  </div>
</template>

<script>
import FormItems from './FormItems'

export default {
  data () {
    return {
      visible: false,
      placement: 'top'
    }
  },
  components: {
    FormItems
  },
  props: ['formItems', 'columns', 'data'],
  methods: {
    onClose () {
      this.visible = false
    }
  },
  computed: {

  },
  mounted () {

  }
}
</script>

<style scoped>
.list-group {
    margin-top: 2px;
    margin-left: 5px;
    text-align: right;
}

.list-group-item {
    background-color: #fff;
    padding: 1.25rem 1.25rem;
    text-align: right;
}
</style>
