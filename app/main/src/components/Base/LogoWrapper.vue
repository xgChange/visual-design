<script lang="ts" setup>
defineOptions({
  name: 'LogoWrapper'
})

interface LogoProp {
  slogan?: string
}

const props = withDefaults(defineProps<LogoProp>(), {
  slogan: ''
})

const logoWrapperClass = ['logo-wrapper', { 'no-slogan': !props.slogan }]
</script>

<template>
  <div :class="logoWrapperClass">
    <div class="logo"></div>
    <div v-show="slogan" class="slogan">{{ slogan }}</div>
  </div>
</template>

<style lang="scss" scoped>
.logo-wrapper {
  display: flex;
  padding: 10px 10px 0 10px;

  &.no-slogan {
    justify-content: center;
  }
  .logo {
    background-image: url(@/assets/visual-logo.jpg);
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
