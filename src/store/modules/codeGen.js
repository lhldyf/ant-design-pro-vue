const codeGen = {
  state: {
    currentTable: '',
    tableComment: '',
    columns: [],
    columnsInForm: [],
    columnsInQuery: [],
    columnsInTable: [],
    columnsInUpdate: []
  },
  mutations: {
    changeTable (state, { tableName, tableComment }) {
      console.log('currentTable', tableName, tableComment)
      state.currentTable = tableName
      state.tableComment = tableComment
    },
    setColumns (state, columns) {
      console.log('set columns', columns)
      state.columns = columns
      state.columnsInUpdate = columns.filter(x => x.inUpdate)
      state.columnsInTable = columns.filter(x => x.inTable)
      state.columnsInQuery = columns.filter(x => x.inQuery && x.columnName !== ('id' || 'ID'))
      state.columnsInForm = columns.filter(x => x.inForm && x.columnName !== ('id' || 'ID'))
      console.log('finish set columns')
    },
    setColumnsInUpdate (state, columns) {
      state.columnsInUpdate = columns
    },
    setColumnsInTable (state, columns) {
      state.columnsInTable = columns
    },
    setColumnsInQuery (state, columns) {
      state.columnsInQuery = columns
    },
    setColumnsInForm (state, columns) {
      state.columnsInForm = columns
    }
  },
  actions: {}
}

export default codeGen
