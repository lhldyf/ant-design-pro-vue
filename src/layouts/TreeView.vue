<template>
  <a-card>
    <a-row :gutter="8">
      <a-col :span="5">
        <a-card :title="leftTitle" class="left-card">
          <a-tree
            :treeData="treeData"
            :checkStrictly="checkStrictly"

            :autoExpandParent="true"
            :defaultExpandAll="true"
            @select="treeSelect"

            multiple
          ></a-tree>
        </a-card>
      </a-col>
      <a-col :span="19">
        <a-card :title="rightTitle" class="right-card">
          <slot name="right" />
        </a-card>
      </a-col>
    </a-row>
  </a-card>
</template>

<script>
export default {
  name: 'TreeView',
  props: {
    treeData: Array,
    leftTitle: {
      type: String,
      default: '资产树列表'
    },
    rightTitle: {
      type: String,
      default: '指标采集配置'
    },

    checkStrictly: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {}
  },
  methods: {
    treeSelect (val) {
      console.log('treeSelect', val)
      this.$emit('treeSelect', val)
    },
    treeCheck (val) {
      this.$emit('treeCheck', val)
    }
  }
}
</script>

<style lang="less" scoped>
/deep/ .left-card,
.right-card {
  min-height: calc(100vh - 302px);
}
</style>
