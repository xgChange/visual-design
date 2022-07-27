<script lang="ts" setup>
import { ArrowForward48Regular } from '@vicons/fluent'

export type PositionType = 'relative' | 'static' | 'absolute' | 'fixed'

interface GuideDragProp {
  position?: PositionType
  iconSize?: number
}

withDefaults(defineProps<GuideDragProp>(), {
  position: 'relative',
  iconSize: 40
})
</script>

<template>
  <div class="guide-drag_box">
    <div class="guide-drag_tip">将组件拖拽到这里哦</div>
    <NIcon :size="iconSize" class="guide-icon">
      <ArrowForward48Regular class="guide_arrow" />
    </NIcon>
  </div>
</template>

<style lang="scss" scoped>
.guide-drag_box {
  display: flex;
  flex-direction: column;
  position: v-bind(position);
  .guide-drag_tip {
    color: #333;
    max-width: 80px;
  }

  .guide-icon {
    .guide_arrow {
      transform: rotateX(180deg) rotateZ(48deg);
    }
  }
}
</style>
