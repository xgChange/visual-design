<script lang="ts" setup>
interface LayerProps {
  cursor?: 'move' | 'pointer' | 'default'
  unlock?: boolean
}

withDefaults(defineProps<LayerProps>(), {
  cursor: 'default',
  unlock: false
})
</script>

<template>
  <div class="mask-layer" :class="{ 'mask-layer--unlock': unlock }">
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

  &--unlock {
    &::before {
      display: none;
    }
  }
}
</style>
