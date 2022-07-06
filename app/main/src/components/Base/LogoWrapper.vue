<script lang="ts" setup>
defineOptions({
  name: 'LogoWrapper'
})

interface LogoProp {
  slogan?: string
}

withDefaults(defineProps<LogoProp>(), {
  slogan: ''
})
</script>

<template>
  <div class="logo-wrapper">
    <div class="logo"></div>
    <div class="slogan">{{ slogan }}</div>
  </div>
</template>

<style lang="scss" scoped>
.logo-wrapper {
  display: flex;
  padding: 10px;
  .logo {
    background-image: url(@/assets/logo.png);
    background-repeat: no-repeat;
    background-size: 100%;
    width: 100px;
    height: 100px;
  }
  .slogan {
    flex: 1;
  }
}
</style>
