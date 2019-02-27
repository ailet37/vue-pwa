import Vue from 'vue'
import Router from 'vue-router'

// Page content
import PusheenHome from '@/components/PusheenHome'

// Fallback page
import PageNotFound from '@/components/PageNotFound'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'PusheenHome',
      component: PusheenHome
    },
    {
      path: '*',
      name: 'PageNotFound',
      component: PageNotFound
    }
  ]
})