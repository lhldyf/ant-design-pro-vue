<template>
  <div>
    <a-drawer
      title="表单预览"
      :height="600"
      :placement="placement"
      :closable="true"
      @close="onClose"
      :visible="visible">
      <form-items :formItems="formItems"/>

      <div style="text-align:center">
        <a-button type="dashed" :style="{margin:'0px 10px'}">重置</a-button>
        <a-button type="primary" :style="{margin:'0px 10px'}">提交</a-button>
      </div>

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
  props: [ 'formItems' ],
  components: {
    FormItems
  },
  methods: {
    showDrawer () {
      this.visible = true
    },
    onClose () {
      this.visible = false
    },
    onChange (e) {}
  },
  computed: {
  },
  mounted () {

  }
}
</script>

<style lan="less" scoped>

</style>
