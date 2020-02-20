<template>
  <a-layout :class="['layout', device]">
    <!-- SideMenu -->
<!--    <a-drawer-->
<!--      v-if="isMobile()"-->
<!--      placement="left"-->
<!--      :wrapClassName="`drawer-sider ${navTheme}`"-->
<!--      :closable="false"-->
<!--      :visible="collapsed"-->
<!--      @close="drawerClose"-->
<!--    >-->
<!--      <side-menu-->
<!--        mode="inline"-->
<!--        :menus="mainMenu"-->
<!--        :theme="navTheme"-->
<!--        :collapsed="false"-->
<!--        :collapsible="true"-->
<!--        @menuSelect="menuSelect"-->
<!--      ></side-menu>-->
<!--    </a-drawer>-->

<!--    <side-menu-->
<!--      v-else-if="isSideMenu()"-->
<!--      mode="inline"-->
<!--      :menus="mainMenu"-->
<!--      :theme="navTheme"-->
<!--      :collapsed="collapsed"-->
<!--      :collapsible="true"-->
<!--    ></side-menu>-->

      <!-- layout header -->
<!--      <global-workspace-->
<!--        :mode="layoutMode"-->
<!--        :menus="mainMenu"-->
<!--        :theme="navTheme"-->
<!--        :collapsed="collapsed"-->
<!--        :device="device"-->
<!--        @toggle="toggle"-->
<!--      />-->

      <a-layout-header>
        <a-menu
          theme="dark"
          mode="horizontal"
          :defaultSelectedKeys="['2']"
          :style="{ lineHeight: '64px'}"
        >
          <a-menu-item key="1">工作区</a-menu-item>
          <a-sub-menu key="2">
            <span slot="title"><span>系统管理</span></span>
            <a-menu-item key="3"><router-link :to="{ name: 'EventList' }">机构管理</router-link></a-menu-item>
            <a-menu-item key="4"><router-link :to="{ name: 'UserList' }">用户管理</router-link></a-menu-item>
            <a-menu-item key="5"><router-link :to="{ name: 'RoleList' }">角色管理</router-link></a-menu-item>
            <a-menu-item key="6"><router-link :to="{ name: 'UserList' }">系统运行参数</router-link></a-menu-item>
          </a-sub-menu>
          <!--        <a-menu-item key="3">公共配置维护</a-menu-item>-->
          <a-sub-menu key="3">
            <span slot="title"><span>公共配置维护</span></span>
            <a-menu-item key="7"><router-link :to="{ name: 'DictList' }">公共数据字典</router-link></a-menu-item>
            <a-menu-item key="8"><router-link :to="{ name: 'FunctionList' }">公共函数库</router-link></a-menu-item>
          </a-sub-menu>
          <a-icon style="right: 40px; position:absolute" type="search"></a-icon>
          <a-icon style="right:50px; position:absolute" type="bell"></a-icon>
          <user-menu></user-menu>
        </a-menu>
      </a-layout-header>
      <!-- layout content -->
      <a-layout-content style="padding: 0 50px">

        <route-view></route-view>

      </a-layout-content>

      <!-- layout footer -->
      <a-layout-footer>
        <global-footer />
      </a-layout-footer>

      <!-- Setting Drawer (show in development mode) -->
      <setting-drawer></setting-drawer>
  </a-layout>

</template>

<script>
import { triggerWindowResizeEvent } from '@/utils/util'
import { mapState, mapActions } from 'vuex'
import { mixin, mixinDevice } from '@/utils/mixin'
import config from '@/config/defaultSettings'

import RouteView from './RouteView'
import SideMenu from '@/components/Menu/SideMenu'
import GlobalHeader from '@/components/GlobalHeader'
import GlobalWorkspace from '@/components/GlobalWorkspace'
import GlobalFooter from '@/components/GlobalFooter'
import SettingDrawer from '@/components/SettingDrawer'

export default {
  name: 'WorkspaceLayout',
  mixins: [mixin, mixinDevice],
  components: {
    RouteView,
    SideMenu,
    GlobalHeader,
    GlobalFooter,
    SettingDrawer,
    GlobalWorkspace
  },
  data () {
    return {
      production: config.production,
      collapsed: false,
      menus: []
    }
  },
  computed: {
    ...mapState({
      // 动态主路由
      // mainMenu: state => state.permission.routers
      mainMenu (state) {
        return state.permission.addRouters.find(item => item.path === '/').children
      }

    }),
    contentPaddingLeft () {
      if (!this.fixSidebar || this.isMobile()) {
        return '0'
      }
      if (this.sidebarOpened) {
        return '200px'
      }
      return '80px'
    }
  },
  watch: {
    sidebarOpened (val) {
      this.collapsed = !val
    }
  },
  created () {
    // this.menus = this.mainMenu.find(item => item.path === '/').children
    this.collapsed = !this.sidebarOpened
  },
  mounted () {
    const userAgent = navigator.userAgent
    if (userAgent.indexOf('Edge') > -1) {
      this.$nextTick(() => {
        this.collapsed = !this.collapsed
        setTimeout(() => {
          this.collapsed = !this.collapsed
        }, 16)
      })
    }
  },
  methods: {
    ...mapActions(['setSidebar']),
    toggle () {
      this.collapsed = !this.collapsed
      this.setSidebar(!this.collapsed)
      triggerWindowResizeEvent()
    },
    paddingCalc () {
      let left = ''
      if (this.sidebarOpened) {
        left = this.isDesktop() ? '200px' : '80px'
      } else {
        left = (this.isMobile() && '0') || ((this.fixSidebar && '80px') || '0')
      }
      return left
    },
    menuSelect () {
    },
    drawerClose () {
      this.collapsed = false
    }
  }
}
</script>

<style lang="less">
@import url('../components/global.less');

/*
 * The following styles are auto-applied to elements with
 * transition="page-transition" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the page transition by editing
 * these styles.
 */

.page-transition-enter {
  opacity: 0;
}

.page-transition-leave-active {
  opacity: 0;
}

.page-transition-enter .page-transition-container,
.page-transition-leave-active .page-transition-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>
