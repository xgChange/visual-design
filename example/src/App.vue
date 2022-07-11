<script lang="ts" setup>
import { useRouter } from 'vue-router'
import CList from './components/CList.vue'

const router = useRouter()

const ListClick = (item: any) => {
  router.push({ path: `/${item.__name}` })
}
</script>

<template>
  <div class="app-container">
    <CList class="left-list" @click="ListClick" />
    <div class="right-components">
      <RouterView />
    </div>
  </div>
</template>

<style scoped>
.app-container {
  display: flex;
  height: 100vh;
}
.left-list {
  width: 300px;
  border-right: 1px solid #ccc;
}

.right-components {
  flex: 1;
  padding: 16px;
}
</style>

<style>
body,
html {
  margin: 0;
  padding: 0;
}
</style>
