import { createWebHistory, createRouter, RouteRecordRaw } from 'vue-router'

import { componentList } from './utils'

function createRoutes(components: any[]) {
  return components.map(c => {
    const pathName = `/${c.__name}`
    const route: RouteRecordRaw = {
      path: pathName,
      component: c
    }

    return route
  })
}

const routes = createRoutes(componentList)
console.log(routes)

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
