<template>
  <div>
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="24">
          <!-- <draggable :list="localForm" :disabled="false" @change="handleChange"> -->
          <a-col
            :xl="8"
            :lg="8"
            :md="8"
            :sm="12"
            :xs="24"
            class="list-group-item"
            v-for="(element,index) in localForm"
            :key="index">
            <a-form-item :label="element.title">
              <a-textarea v-if="element.componentTpye === 'textarea'" style="width:150px" :autosize="{ minRows: 2, maxRows: 4 }" placeholder="回车换行" />
              <a-input style="width:150px" v-if="element.componentTpye === 'input'" />
              <a-select v-if="element.componentTpye === 'select'" style="width:150px">
                <a-select-option v-for="(ss,index) in element.componentSetting" :key="index">{{ ss }}</a-select-option>
              </a-select>
              <a-icon type="edit" style="color:green;font-size:8;margin-left:10px" />
              <a-icon type="minus-circle" style="color:red;font-size:8;margin-left:10px;cursor:Pointer" @click="() => localForm.splice(index,1)" />
            </a-form-item>
          </a-col>
          <!-- </draggable> -->
        </a-row>
      </a-form>
    </div>
  </div>
</template>

<script>
// import draggable from 'vuedraggable'

export default {
  // components: {
  //   draggable
  // },
  props: [ 'formItems' ],
  data () {
    return {
      localForm: []
    }
  },
  watch: {

  },
  computed: {},
  methods: {
    handleChange () {
      this.$emit('formDesignResult', this.localForm)
    }
  },
  created () {},
  mounted () {
    this.localForm = this.formItems
    this.$emit('formDesignResult', this.localForm)
  }
}
</script>

<style lang="less" scoped>
.list-group-item {
    background-color: #fff;
    border: 1px solid rgba(0, 0, 0, .125);
    padding: 0.5rem;
    cursor: move;
    text-align: center;

}
</style>
