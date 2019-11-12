<template>
  <div>
    <!-- {{columns}}-----{{datas}} -->
    <table id="draggleTable">
      <thead>
        <!-- <draggable v-model="columns" tag="tr" @change="handleChange"> -->
        <th v-for="column in columns" :key="column.key" scope="col">
          {{ column.columnComment }}
        </th>
        <!-- </draggable> -->
      </thead>
      <tbody>
        <tr v-for="(data,dindex) in datas" :key="dindex">
          <td v-for="(column,cindex) in columns" :key="cindex">{{ data[column.dataIndex] }}</td>
        </tr>
      </tbody>
    </table>

  </div>
</template>

<script>
// import draggable from 'vuedraggable'
export default {
  // components: {
  //   draggable
  // },
  data () {
    return {
      columns: []
    }
  },
  props: ['columnsDTO', 'datas'],
  mounted () {
    // 因为需要拖拉拽，所以要将传输过来的columnsDTO存成自己的对象
    this.columns = this.columnsDTO
    console.log('draggle-table:', this.columns)
    this.$emit('tableDesignResult', this.columns)
    this.$store.commit('tableQueryColumns', this.columns)
  },
  created () {},
  computed: {

  },
  methods: {
    handleChange () {
      console.log('draggle-table:', this.columns)
      this.$emit('tableDesignResult', this.columns)
      this.$store.commit('tableQueryColumns', this.columns)
    }
  }
}
</script>

<style scoped>
#draggleTable {
    width: 100%;
    border-collapse: collapse;
    margin: 5px 5px;
    padding: 10px;
}

#draggleTable td,
#draggleTable th {
    text-align: center;
    font-size: 1em;
    border: 1px solid #484b41;
    padding: 3px 7px 2px 7px;
}

#draggleTable th {
    font-size: 1.1em;
    text-align: center;
    padding-top: 5px;
    padding-bottom: 4px;
    background-color: rgb(205, 225, 241);
    color: black;
    cursor: move;

}
</style>
