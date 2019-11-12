<template>
  <a-card :bordered="false" style="margin: -24px -24px 0px;">
    <result type="success" :description="description" :title="title">
      <template slot="action">
        <a-button type="primary" @click="$emit('back')">返回主页</a-button>
      </template>
      <div>
        <div style="margin-bottom : 10px">
          <label>列表页路由信息，请拷贝至router.config.js : </label>
          <div>
            <a-textarea :value="successData.listRoute" autosize style="width:48%;margin:5px" />
            <a-textarea
              v-if="successData.createRoute"
              :value="successData.createRoute"
              autosize
              style="width:48%;margin:5px"
            />
          </div>
        </div>
      </div>
    </result>
  </a-card>
</template>

<script>
import Result from './Result'

export default {
  name: 'Success',
  components: {
    Result
  },
  props: {
    successData: {}
  },
  data () {
    return {
      title: '提交成功',
      description: '对于当前表的增删改查代码、查询页、表单代码生成成功。\n'
    }
  }
}
</script>

<style scoped>
</style>
