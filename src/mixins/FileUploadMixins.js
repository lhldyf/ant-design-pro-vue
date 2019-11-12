export const FileUploadMixin = {
  data () {
    return {
      fileList: []
    }
  },
  methods: {
    removeFile (file) {
      const index = this.fileList.indexOf(file)
      const newFileList = this.fileList.slice()
      newFileList.splice(index, 1)
      this.fileList = newFileList
      console.log('remove', this.fileList)
    },
    beforeUpload (file) {
      this.fileList = [...this.fileList, file]
      return false
    },
    wrapFileUploadParams (params) {
      const formData = new FormData()
      let tempFileObj = []
      if (this.fileList) {
        this.fileList.forEach(file => {
          if (file.size) {
            formData.append('fileList', file)
          } else {
            tempFileObj = [...tempFileObj, file]
          }
        })
      }
      formData.append('fileObjs', JSON.stringify(tempFileObj))
      for (const key in params) {
        const currentData = params[key]
        if (key !== 'fileList' && currentData) {
          formData.append(key, currentData)
        }
      }
      return formData
    }
  }
}
