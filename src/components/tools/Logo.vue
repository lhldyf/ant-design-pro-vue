<template>
  <div class="logo">
    <router-link :to="{ path: '/' }">
      <div class="logo-bg"></div>
      <!-- <img src="~@/assets/logo-long.png" class="logo" alt="logo" /> -->
      <!-- <LogoSvg alt="logo" /> -->
      <!-- <h1 v-if="showTitle">{{ title }}</h1> -->
    </router-link>
  </div>
</template>

<script>
// import LogoSvg from '@/assets/logo.svg?inline'

export default {
  name: 'Logo'
  // components: {
  //   LogoSvg
  // },
  // props: {
  //   title: {
  //     type: String,
  //     default: 'Ant Design Pro',
  //     required: false
  //   },
  //   showTitle: {
  //     type: Boolean,
  //     default: true,
  //     required: false
  //   }
  // }
}
</script>

<style lang="less" scoped>
.sider .logo .logo-bg {
  height: 64px;
}
</style>