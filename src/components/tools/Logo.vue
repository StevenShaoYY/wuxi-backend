<template>
  <div class="logo">
    <router-link :to="{name:'dashboard'}">
      <!-- <LogoSvg alt="logo" /> -->
      <img src="../../assets/icon.jpg" alt="">
      <h1 class="title-main" v-if="showTitle">{{ title }}</h1>
    </router-link>
  </div>
</template>

<script>
import LogoSvg from '@/assets/logo.svg?inline'

export default {
  name: 'Logo',
  components: {
    LogoSvg
  },
  props: {
    title: {
      type: String,
      default: '无锡市道路交通协会管理系统',
      required: false
    },
    showTitle: {
      type: Boolean,
      default: true,
      required: false
    }
  }
}
</script>
<style lang="less" scoped>
.title-main {
  font-size: 13.5px !important;
}
</style>
