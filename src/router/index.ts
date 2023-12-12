import { setupLayouts } from 'virtual:generated-layouts'
import { createRouter, createWebHistory } from 'vue-router'
import routes from '~pages'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    ...setupLayouts(routes),
  ],
})

router.beforeEach((to, from, next) => {
  const loggedIn = localStorage.getItem('loggedIn')

  // Check if 'loggedIn' is '0' and the current route is not '/login'
  if (loggedIn === '0' && to.path !== '/login')
    next('/login')

  else
    next()
})

// Docs: https://router.vuejs.org/guide/advanced/navigation-guards.html#global-before-guards

export default router
