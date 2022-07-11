<script lang="ts" setup>
import { componentList } from '../utils'

const emit = defineEmits(['click'])

const handleClick = (item: any) => {
  emit('click', item)
}
</script>

<template>
  <ul class="left-ul">
    <li
      v-for="(item, index) in componentList"
      :key="index"
      class="item"
      @click="handleClick(item)"
    >
      {{ item.__name }}
    </li>
  </ul>
</template>

<style scoped>
.item {
  cursor: pointer;
}
</style>
