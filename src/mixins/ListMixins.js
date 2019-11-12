import { deleteAction, postAction } from '@/api/manage'

export const ListMixin = {
  mounted () {
    if (this.mountedLoadPage) {
      this.loadPage()
    }
  },
  data () {
    return {
      // token header
      /* 查询条件-请不要在queryParam中声明非字符串值的属性 */
      queryParam: {},
      /* table选中keys */
      selectedRowKeys: [],
      /* table选中records */
      selectionRows: [],
      /* 查询折叠 */
      toggleSearchStatus: false,
      dataSource: [],
      pagination: {
        total: 0,
        current: 1,
        pageSize: 10
      },
      tableLoading: false,
      mountedLoadPage: true
    }
  },
  methods: {
    handleSearch () {
      this.pagination.current = 1
      this.loadPage()
    },
    loadPage () {
      const params = Object.assign({
        page: this.pagination.current,
        size: this.pagination.pageSize
      })
      this.tableLoading = true
      this.loadData(params).then(res => {
        this.tableLoading = false
        if (res.success) {
          this.dataSource = res.data.list
          this.pagination.total = res.data.page.total
        } else {
          this.$message.warning(res.message)
        }
      })
    },
    loadData (params) {
      const temp = Object.assign({}, params, this.queryParam)
      this.wrapListQueryParams(temp)
      return postAction(this.url.list, temp)
    },
    wrapListQueryParams (params) {},
    onSelectChange (selectedRowKeys, selectionRows) {
      this.selectedRowKeys = selectedRowKeys
      this.selectionRows = selectionRows
    },
    onClearSelected () {
      this.selectedRowKeys = []
      this.selectionRows = []
    },
    handleReset () {
      this.pagination.current = 1
      this.queryParam = {}
      this.loadPage()
    },
    batchDel: function () {
      if (!this.url.deleteBatch) {
        this.$message.error('请设置url.deleteBatch属性!')
        return
      }
      if (this.selectedRowKeys.length <= 0) {
        this.$message.warning('请选择一条记录！')
      } else {
        var ids = ''
        for (var a = 0; a < this.selectedRowKeys.length; a++) {
          ids += this.selectedRowKeys[a] + ','
        }
        var that = this
        this.$confirm({
          title: '确认删除',
          content: '是否删除选中数据?',
          onOk: function () {
            deleteAction(that.url.deleteBatch, { ids: ids }).then(res => {
              if (res.success) {
                that.$message.success(res.message)
                that.loadPage()
                that.onClearSelected()
              } else {
                that.$message.warning(res.message)
              }
            })
          }
        })
      }
    },
    handleDelete: function (id) {
      if (!this.url.delete) {
        this.$message.error('请设置url.delete属性!')
        return
      }
      var that = this
      this.tableLoading = true
      deleteAction(that.url.delete, { id: id }).then(res => {
        this.tableLoading = false
        if (res.success) {
          that.$message.success(res.message)
          that.loadPage()
        } else {
          that.$message.warning(res.message)
        }
      }).catch(e => {
        console.log(e)
        that.$message.warning('系统异常')
        this.tableLoading = false
      })
    },
    handleEdit: function (record) {
      this.beforeHandleEdit(record)
      this.$refs.modalForm.edit(record)
      this.$refs.modalForm.title = '编辑'
      this.$refs.modalForm.disableSubmit = false
    },
    beforeHandleEdit (record) {},
    handleAdd: function () {
      this.$refs.modalForm.add()
      this.$refs.modalForm.title = '新增'
      this.$refs.modalForm.disableSubmit = false
    },
    handleToggleSearch () {
      this.toggleSearchStatus = !this.toggleSearchStatus
    },
    modalFormOk () {
      // 新增/修改 成功时，重载列表
      this.loadPage()
    },
    handleDetail: function (record) {
      this.beforeHandleDetail(record)
      this.$refs.modalForm.edit(record)
      this.$refs.modalForm.title = '详情'
      this.$refs.modalForm.disableSubmit = true
    },
    beforeHandleDetail (record) {},
    onTableChange (pagination, filters, sorter) {
      this.pagination = pagination
      this.loadPage()
    }
  }
}
