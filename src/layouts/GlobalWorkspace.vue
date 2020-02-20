<template>
    <div id="globalWorkspace">
      <div class="container">
        <a-layout
          :class="[layoutMode, `content-width-${contentWidth}`]"
          :style="{ paddingLeft: contentPaddingLeft, minHeight: '100vh' }">

          <a-layout-header class="header">
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
          </a-layout-header>

          <a-layout-content :style="{ height: '100%', margin: '20px 20px 0', paddingTop: fixedHeader ? '64px' : '0' }">

<!--            <div class="card">-->
<!--              <home-card></home-card>-->
<!--              <home-card></home-card>-->
<!--            </div>-->

            <route-view></route-view>
            <add-card style="padding-left: 20px;"></add-card>

          </a-layout-content>

          <div class="footer">
            <div style="text-align: center;left:40%; position:fixed;bottom:0;" class="copyright">
              Copyright &copy; 2013-2019 Transwarp, All Right Reserved
            </div>
          </div>

        </a-layout>

      </div>
    </div>
</template>

<script>
import UserMenu from '@/components/tools/UserMenu'
import SMenu from '@/components/Menu/'
import Logo from '@/components/tools/Logo'
import { mixin } from '@/utils/mixin'
import AddCard from './AddCard'

export default {
  name: 'globalWorkspace',
  components: { AddCard },
  data () {
    return {}
  },
  mounted () {
    document.body.classList.add('globalWorkspace')
  },
  beforeDestroy () {
    document.body.classList.remove('globalWorkspace')
  }
}
</script>

<style lang="less" scoped>
  .header {
    display: flex;
    width: 100%;
    height: 0px;
    background: #001529;
  }

  .ant-layout-header {
    background-color: #001529;
  }

  .card {
    margin-top: 40px;
    display: flex;
    justify-content: flex-start;
  }

  #userLayout.user-layout-wrapper {
    height: 100%;

    &.mobile {
      .container {
        .main {
          max-width: 368px;
          width: 98%;
        }
      }
    }

    .container {
      width: 100%;
      min-height: 100%;
      background: #f0f2f5 url(~@/assets/login-bg.png) no-repeat 50%;
      background-size: 100%;
      padding: 110px 0 144px;
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;

      a {
        text-decoration: none;
      }

      .top {
        text-align: center;

        .header {
          height: 44px;
          line-height: 44px;

          .badge {
            position: absolute;
            display: inline-block;
            line-height: 1;
            vertical-align: middle;
            margin-left: -12px;
            margin-top: -10px;
            opacity: 0.8;
          }

          .logo {
            height: 60px;
            width: 200px;
            margin-left: 20px;
            background: url(~@/assets/logo-long.png) left center no-repeat;
          }

          .ant-menu-item {
            background-color: #001529;
          }

          .header {
            display: flex;
          }

          .layout.ant-layout .header {
            background-color: #001529;
          }

          .title {
            font-size: 38px;
            color: #1E77B4;;
            font-family: PingFangSC-Medium;
            font-weight: 500;
            position: relative;
            top: 2px;
          }
        }

        .desc {
          font-size: 14px;
          color: rgba(0, 0, 0, 0.45);
          margin-top: 12px;
          margin-bottom: 40px;
        }
      }

      .main {
        min-width: 260px;
        width: 368px;
        margin: 40px auto;
      }

      .footer {
        // position: absolute;
        width: 100%;
        bottom: 0;
        padding: 0 16px;
        margin: 0 0 24px;
        text-align: center;

        .links {
          margin-bottom: 8px;
          font-size: 14px;

          a {
            color: rgba(0, 0, 0, 0.45);
            transition: all 0.3s;

            &:not(:last-child) {
              margin-right: 40px;
            }
          }
        }

        .copyright {
          margin: 0 auto;
          text-align: center;
          color: rgba(0, 0, 0, 0.45);
          font-size: 14px;
          margin-bottom: 10px;
        }
      }
    }
  }
</style>
