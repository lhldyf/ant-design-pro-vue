<template>
  <a-select :value="value" @change="selectChange" :placeholder="placeholder">
    <a-select-option v-if="allOption" value>全部</a-select-option>
    <a-select-option v-for="item in options" :key="item.id" :value="item.id">{{ item.opsDisplayName }}</a-select-option>
  </a-select>
</template>

<script>
import { initOpsSymbolStore, opsSymbolItemStore } from './utils'

export default {
  name: 'OpsSymbolSelect',
  props: {
    // eslint-disable-next-line
    type: String,
    // eslint-disable-next-line
    value: {
      type: [String, Number],
      required: false
    },
    placeholder: {
      type: String,
      default: '请选择'
    },
    triggerChange: {
      type: Boolean,
      default: false
    },
    allOption: {
      type: Boolean,
      default: false
    }
  },
  async mounted () {
    await initOpsSymbolStore(this.type)
    this.filterOptions(this.type)
  },
  data () {
    return {
      options: []
    }
  },
  methods: {
    selectChange (val) {
      // 告诉父节点v-model绑定的值变化了，父组件更新value值，再次传递新值给该组件，该组件value更新
      if (this.triggerChange) {
        this.$emit('change', val)
      } else {
        this.$emit('input', val)
      }
    },

    filterOptions (type) {
      console.log('555:', opsSymbolItemStore[type])
      this.options = opsSymbolItemStore[type]
    }
  }
}
</script>
