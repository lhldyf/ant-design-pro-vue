<template>
  <transition name="showHeader">
    <div v-if="visible" class="header-animat">
      <a-layout-header
        v-if="visible"
        :class="[fixedHeader && 'ant-header-fixedHeader', sidebarOpened ? 'ant-header-side-opened' : 'ant-header-side-closed', ]"
        :style="{ padding: '0' }">
        <div v-if="mode === 'sidemenu'" class="header">
          <template v-if="multiTab && multiTabInHeader">
            <div class="logo" />
            <a-menu
              theme="dark"
              mode="horizontal"
              :defaultSelectedKeys="['5']"
              :style="{ lineHeight: '60px' }"
            >
              <a-menu-item key="1"><router-link :to="{ name: 'StartNodeList' }">工作区</router-link></a-menu-item>
              <!--        <a-menu-item key="2">系统管理</a-menu-item>-->
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
              <a-icon style="right: 40px;" type="search"></a-icon>
              <a-icon type="bell"></a-icon>
              <!--        <user-menu/>-->
            </a-menu>
            <user-menu></user-menu>
<!--            <a-icon v-if="device==='mobile'" class="trigger" :type="collapsed ? 'menu-fold' : 'menu-unfold'" @click="toggle"/>-->
<!--            <a-icon v-else class="trigger" :type="collapsed ? 'menu-unfold' : 'menu-fold'" @click="toggle"/>-->
<!--            <div style="display: flex; justify-content: space-between;width: 100%">-->
<!--              <div class="multiTabInHeader"><multi-tab v-if="multiTab"></multi-tab></div>-->
<!--              <div>123456</div>-->
<!--              <user-menu></user-menu>-->
<!--            </div>-->
          </template>
        </div>
      </a-layout-header>
    </div>
  </transition>
</template>

<script>
import UserMenu from '../tools/UserMenu'
import SMenu from '../Menu/'
import Logo from '../tools/Logo'
import { mixin } from '@/utils/mixin'

export default {
  name: 'GlobalWorkspace',
  components: {
    UserMenu,
    SMenu,
    Logo
  },
  mixins: [mixin],
  props: {
    mode: {
      type: String,
      // sidemenu, topmenu
      default: 'sidemenu'
    },
    menus: {
      type: Array,
      required: true
    },
    theme: {
      type: String,
      required: false,
      default: 'dark'
    },
    collapsed: {
      type: Boolean,
      required: false,
      default: false
    },
    device: {
      type: String,
      required: false,
      default: 'desktop'
    }
  },
  data () {
    return {
      visible: true,
      oldScrollTop: 0
    }
  },
  mounted () {
    document.addEventListener('scroll', this.handleScroll, { passive: true })
  },
  methods: {
    handleScroll () {
      if (!this.autoHideHeader) {
        return
      }

      const scrollTop = document.body.scrollTop + document.documentElement.scrollTop
      if (!this.ticking) {
        this.ticking = true
        requestAnimationFrame(() => {
          if (this.oldScrollTop > scrollTop) {
            this.visible = true
          } else if (scrollTop > 300 && this.visible) {
            this.visible = false
          } else if (scrollTop < 300 && !this.visible) {
            this.visible = true
          }
          this.oldScrollTop = scrollTop
          this.ticking = false
        })
      }
    },
    toggle () {
      this.$emit('toggle')
    }
  },
  beforeDestroy () {
    document.body.removeEventListener('scroll', this.handleScroll, true)
  }
}
</script>

<style lang="less">
@import '../index.less';

.header-animat{
  position: relative;
  z-index: @ant-global-header-zindex;
}
.showHeader-enter-active {
  transition: all 0.25s ease;
}
.showHeader-leave-active {
  transition: all 0.5s ease;
}
.showHeader-enter, .showHeader-leave-to {
  opacity: 0;
}
.multiTabInHeader .ant-pro-multi-tab {
  margin: 11px 0px 0px -20px;
}

.user-wrapper {
  min-width: 80px;
}
</style>
