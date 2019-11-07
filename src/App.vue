<template>
  <a-locale-provider :locale="locale">
    <div id="app">
      <router-view />
    </div>
  </a-locale-provider>
</template>

<script>
import zhCN from 'ant-design-vue/lib/locale-provider/zh_CN'
import moment from 'moment'
import 'moment/locale/zh-cn'
import { AppDeviceEnquire } from '@/utils/mixin'
import { mapState } from 'vuex'

export default {
  mixins: [AppDeviceEnquire],
  data() {
    return {}
  },
  mounted() {},
  computed: {
    ...mapState({
      locale(state) {
        if (state.i18n.lang === 'zh-CN') {
          moment.locale('zh-cn')
          return zhCN
        } else {
          moment.locale('en')
          return null
        }
      }
    })
  }
}
</script>
<style>
#app {
  height: 100%;
}
</style>
