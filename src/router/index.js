import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/layout'

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/part'
    },
    {
      path: '/part',
      redirect: '/part/dashboard',
      component: Layout,
      children: [
        {
          path: 'dashboard',
          component: () => import('@/components/pages/dashboard'),
          name: 'Dashboard',
          meta: {title: '首页', noCache: true}
        },
        {
          path: 'details',
          component: () => import('@/components/pages/details'),
          name: 'Details',
          meta: {title: '详情', noCache: true}
        },
        {
          path: 'currentprogress',
          component: () => import('@/components/pages/currentprogress'),
          name: 'CurrentProgress',
          meta: {title: '当前进度', noCache: true}
        }
      ]
    }
  ]
})
