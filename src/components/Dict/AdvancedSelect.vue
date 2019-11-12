<template>
  <a-select
    :value="value"
    @change="selectChange"
    :placeholder="placeholder"
    :disabled="disabled"
    :mode="mode"
    :getPopupContainer="triggerNode => triggerNode.parentNode">
    <a-select-option v-if="allOption" value>全部</a-select-option>
    <a-select-option v-for="item in options" :key="item.key" :value="item.key">{{ item.text }}</a-select-option>
  </a-select>
</template>

<script>
import { initAdvancedStore, advancedItemOptionStore } from './utils'

export default {
  name: 'AdvancedSelect',
  props: {
    type: {
      type: String,
      default: undefined
    },
    param: {
      type: String,
      required: false,
      default: undefined
    },
    forceParam: {
      type: Boolean,
      default: false
    },
    value: {
      type: [String, Number, Array],
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
    },
    disabled: {
      type: Boolean,
      default: false
    },
    mode: {
      type: String,
      default: 'default'
    }
  },
  async mounted () {
    // 加载完成后，根据传入的dictType初始化下拉选项
    if (!this.forceParam || this.param) {
      await initAdvancedStore(this.type, this.param).then(() => {
        if (this.param) {
          this.options = advancedItemOptionStore[this.type][this.param]
        } else {
          this.options = advancedItemOptionStore[this.type]
        }
      })
    }
  },
  watch: {
    async param () {
      await this.initOptions()
    },
    async type () {
      await this.initOptions()
    }
  },
  data () {
    return {
      options: [],
      timeout: null
    }
  },
  methods: {
    selectChange (val) {
      // 告诉父节点v-model绑定的值变化了，父组件更新value值，再次传递新值给该组件，该组件value更新
      this.$emit('change', val)
    },
    async initOptions () {
      if (this.timeout) {
        clearTimeout(this.timeout)
      }
      this.timeout = setTimeout(() => {
        this.options = []
        this.value = undefined
        this.selectChange(this.val)
        initAdvancedStore(this.type, this.param).then(() => {
          if (this.param) {
            this.options = advancedItemOptionStore[this.type][this.param]
          } else {
            this.options = advancedItemOptionStore[this.type]
          }
        })
      }, 20)
    }
  },
  model: {
    prop: 'value',
    event: 'change'
  }
}
</script>
