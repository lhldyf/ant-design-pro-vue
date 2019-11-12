<template>
  <a-tree-select
    :dropdownStyle="{ maxHeight: '400px', overflow: 'auto' }"
    :treeData="treeData"
    :multiple="multiple"
    placeholder="请选择单位"
    treeDefaultExpandAll
    :value="value"
    :treeCheckable="treeCheckable"
    @change="handleChange"
    :disabled="disabled"
  >
  </a-tree-select>
</template>

<script>
import { postAction } from '@/api/manage'

export default {
  name: 'SimpleOrganSelect',
  props: {
    multiple: Boolean,
    treeCheckable: {
      type: Boolean,
      default: false
    },
    value: [String, Number, Array],
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      treeData: []
    }
  },
  mounted () {
    postAction('/user/organ/tree').then(res => {
      if (res.success) {
        this.treeData = res.data
      }
    })
  },
  methods: {
    handleChange (val) {
      this.$emit('change', val)
    }
  },
  model: {
    prop: 'value',
    event: 'change'
  }
}
</script>

<style>

</style>
