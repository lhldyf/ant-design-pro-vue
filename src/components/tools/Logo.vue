<template>
  <div class="logo">
    <router-link :to="{ path: '/' }">
      <div class="logo-bg" v-bind:class="{'logo-bg-collapsed': collapsed}"></div>
      <!-- <img src="~@/assets/logo-long.png" class="logo" alt="logo" /> -->
      <!-- <LogoSvg alt="logo" /> -->
      <!-- <h1 v-if="showTitle">{{ title }}</h1> -->
    </router-link>
  </div>
</template>

<script>
// import LogoSvg from '@/assets/logo.svg?inline'

export default {
  name: 'Logo',
  // components: {
  //   LogoSvg
  // },
  props: {
    title: {
      type: String,
      default: 'Ant Design Pro',
      required: false
    },
    showTitle: {
      type: Boolean,
      default: true,
      required: false
    },
    collapsed: {
      type: Boolean,
      default: false,
      required: false
    }
  }
}
</script>

<style lang="less" scoped>
.logo .logo-bg {
  // background: url(~@/assets/logo-long.png) left center no-repeat;
  // width: 160px;
  height: 64px;
}
.logo .logo-bg.logo-bg-collapsed {
  background: url(~@/assets/logo.png) left center no-repeat;
  width: 64px;
}
</style>