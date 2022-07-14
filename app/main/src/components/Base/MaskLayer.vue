<script lang="ts" setup>
interface LayerProps {
  cursor?: 'move' | 'pointer' | 'default'
}

withDefaults(defineProps<LayerProps>(), {
  cursor: 'default'
})
</script>

<template>
  <div class="mask-layer">
    <slot />
  </div>
</template>

<style lang="scss" scoped>
.mask-layer {
  display: inline-block;
  position: relative;
  &:hover {
    cursor: v-bind(cursor);
  }
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 2;
  }
}
</style>
