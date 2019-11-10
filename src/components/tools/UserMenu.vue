<template>
  <div class="user-wrapper" style="display: flex;">
    <span style="margin-right: 20px;">{{ timeNow }}</span>
    <div class="content-box">
      <!-- <a href="https://pro.loacg.com/docs/getting-started" target="_blank">
        <span class="action">
          <a-icon type="question-circle-o"></a-icon>
        </span>
      </a>
      <notice-icon class="action"/> -->
      <a-dropdown>
        <span class="action ant-dropdown-link user-dropdown-menu">
          <!-- <a-avatar class="avatar" size="small" :src="avatar"/> -->
          <span>{{ nickname }}</span>
        </span>
        <a-menu slot="overlay" class="user-dropdown-menu-wrapper">
          <!--   <a-menu-item key="0">
            <router-link :to="{ name: 'center' }">
              <a-icon type="user"/>
              <span>个人中心</span>
            </router-link>
          </a-menu-item>
          <a-menu-item key="1">
            <router-link :to="{ name: 'settings' }">
              <a-icon type="setting"/>
              <span>账户设置</span>
            </router-link>
          </a-menu-item>
          <a-menu-item key="2" disabled>
            <a-icon type="setting"/>
            <span>测试</span>
          </a-menu-item>
          <a-menu-divider/> -->
          <a-menu-item key="2">
            <a href="javascript:;" @click="$refs.modifyPwd.show()">
              <a-icon type="lock" />
              <span>修改密码</span>
            </a>
          </a-menu-item>
          <a-menu-item key="3">
            <a href="javascript:;" @click="handleLogout">
              <a-icon type="logout" />
              <span>退出登录</span>
            </a>
          </a-menu-item>
        </a-menu>
      </a-dropdown>
      <lang-select v-if="i18nSwitch" />
    </div>
    <modify-password ref="modifyPwd"></modify-password>
  </div>
</template>

<script>
import NoticeIcon from '@/components/NoticeIcon'
import ModifyPassword from './modals/ModifyPassword'
import { mapActions, mapGetters } from 'vuex'
import LangSelect from '@/components/tools/LangSelect'
import moment from 'moment'

export default {
  name: 'UserMenu',
  components: {
    LangSelect, NoticeIcon, ModifyPassword
  },
  computed: {
    ...mapGetters(['nickname', 'avatar', 'i18nSwitch'])
  },
  data () {
    return {
      timeNow: ''
    }
  },
  mounted () {
    setInterval(() => {
      this.timeNow = moment().format('YYYY-MM-DD HH:mm:ss')
    }, 1000)
  },
  methods: {
    ...mapActions(['Logout']),
    handleLogout () {
      this.$confirm({
        title: '提示',
        content: '真的要注销登录吗 ?',
        onOk: () => {
          return this.Logout({})
            .then(() => {
              setTimeout(() => {
                window.location.reload()
              }, 16)
            })
            .catch(err => {
              this.$message.error({
                title: '错误',
                description: err.message
              })
            })
        },
        onCancel () {}
      })
    }
  }
}
</script>
