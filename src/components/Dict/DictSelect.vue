<template>
  <a-select
    :disabled="disabled"
    :value="valueStr"
    @change="selectChange"
    :placeholder="placeholder"
    :getPopupContainer="triggerNode => triggerNode.parentNode">
    <a-select-option v-if="allOption" value>全部</a-select-option>
    <a-select-option v-for="item in options" :key="item.key" :value="item.key">{{ item.text }}</a-select-option>
  </a-select>
</template>

<script>
import { dictItemOptionStore, initDictStore } from './utils'

export default {
  name: 'DictSelect',
  props: {
    dictCode: {
      type: String,
      default: null
    },
    disabled: {
      type: Boolean,
      default: false
    },
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
    },
    excludes: {
      type: Array,
      required: false
    }
  },
  mounted () {
    // 加载完成后，根据传入的dictType初始化下拉选项
    this.initOptions()
  },
  watch: {
    dictCode (val) {
      this.initOptions()
    },
    value (val) {
      if (val) {
        this.valueStr = String(val)
      } else {
        this.valueStr = ''
      }
    }
  },
  data () {
    return {
      options: [],
      valueStr: ''
    }
  },
  methods: {
    selectChange (val) {
      // 告诉父节点v-model绑定的值变化了，父组件更新value值，再次传递新值给该组件，该组件value更新
      this.$emit('change', String(val))
    },
    initOptions () {
      initDictStore().then(() => {
        let temp = dictItemOptionStore[this.dictCode]
        if (temp) {
          if (this.excludes) {
            temp = temp.filter(x => this.excludes.indexOf(x.key) === -1)
          }
          this.options = temp
        }
      })
    }
  },
  model: {
    prop: 'value',
    event: 'change'
  }
}
</script>
