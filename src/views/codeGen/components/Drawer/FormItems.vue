<template>
  <div>
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="24">
          <a-col
            :xl="8"
            :lg="8"
            :md="8"
            :sm="12"
            :xs="24"
            v-for="(element,index) in localForm"
            :key="index">
            <a-form-item :label="element.title" >
              <a-textarea v-if="element.componentTpye == 'textarea'" :autosize="{ minRows: 2, maxRows: 4 }" placeholder="回车换行" />
              <a-input v-if="element.componentTpye == 'input'" />
              <a-select v-if="element.componentTpye == 'select'" style="width:150px">
                <a-select-option v-for="(ss,index) in element.componentSetting" :key="index">{{ ss }}</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
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
  props: ['formItems' ],
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
  }
}
</script>

<style lang="less" scoped>

</style>
