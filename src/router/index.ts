import { setupLayouts } from 'virtual:generated-layouts'
import { createRouter, createWebHistory } from 'vue-router'
import routes from '~pages'

const router = createRouter({
  // history: createWebHistory(import.meta.env.BASE_URL),
  history: createWebHistory('/'),
  routes: [
    ...setupLayouts(routes),
  ],
})

router.beforeEach((to, from, next) => {
  // Retrieve the 'loggedIn' value from localStorage
  const loggedIn = localStorage.getItem('loggedIn')

  // Check if 'loggedIn' does not exist or is '0', and the current route is not '/login'
  if (!loggedIn || loggedIn === '0') {
    if (to.path !== '/login')
      next('/login')

    else
      next()
  }
  else {
    next()
  }
})

// Docs: https://router.vuejs.org/guide/advanced/navigation-guards.html#global-before-guards

export default router
