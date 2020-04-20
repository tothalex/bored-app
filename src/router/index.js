import Vue from 'vue'
import VueRouter from 'vue-router'

import ActivitiesPage from '../pages/activities.page.vue'
import MyListPage from '../pages/my.list.page.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/activities',
    name: 'Activities',
    component: ActivitiesPage,
  },
  {
    path: '/mylist',
    name: 'MyList',
    component: MyListPage,
  },
  {
    path: '*',
    redirect: { name: 'Activities' },
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

export default router
