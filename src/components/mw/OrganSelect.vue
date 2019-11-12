<template>
  <div class="components-input-demo-presuffix">
    <!---->
    <a-input @click="openModal" placeholder="请点击选择单位" v-model="organNames" readOnly :disabled="disabled">
      <a-icon slot="prefix" type="cluster" title="单位选择控件" />
      <a-icon v-if="organIds" slot="suffix" type="close-circle" @click="handleEmpty" title="清空" />
    </a-input>

    <organ-select-modal
      ref="innerOrganSelectModal"
      :modal-width="modalWidth"
      :multi="multi"
      :rootOpened="rootOpened"
      :organ-id="value"
      @ok="handleOK"
      @initComp="initComp"
    />
  </div>
</template>

<script>
import OrganSelectModal from './modals/OrganSelectModal'
export default {
  name: 'OrganSelect',
  components: {
    OrganSelectModal
  },
  props: {
    modalWidth: {
      type: Number,
      default: 500,
      required: false
    },
    multi: {
      type: Boolean,
      default: false,
      required: false
    },
    rootOpened: {
      type: Boolean,
      default: true,
      required: false
    },
    value: {
      type: String,
      required: false
    },
    disabled: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  data () {
    return {
      visible: false,
      confirmLoading: false,
      organNames: '',
      organIds: ''
    }
  },
  mounted () {
    this.organIds = this.value
  },
  watch: {
    value (val) {
      this.organIds = val
    }
  },
  methods: {
    initComp (organNames) {
      this.organNames = organNames
    },
    openModal () {
      this.$refs.innerOrganSelectModal.show()
    },
    handleOK (rows, idstr) {
      console.log('当前选中单位', rows)
      console.log('当前选中单位ID', idstr)
      if (!rows) {
        this.organNames = ''
        this.organIds = ''
      } else {
        let temp = ''
        for (const item of rows) {
          temp += ',' + item.organName
        }
        this.organNames = temp.substring(1)
        this.organIds = idstr
      }
      this.$emit('change', this.organIds)
    },
    getOrganNames () {
      return this.organNames
    },
    handleEmpty () {
      this.handleOK('')
    }
  },
  model: {
    prop: 'value',
    event: 'change'
  }
}
</script>

<style scoped>
.components-input-demo-presuffix .anticon-close-circle {
  cursor: pointer;
  color: #ccc;
  transition: color 0.3s;
  font-size: 12px;
}
.components-input-demo-presuffix .anticon-close-circle:hover {
  color: #f5222d;
}
.components-input-demo-presuffix .anticon-close-circle:active {
  color: #666;
}
</style>
