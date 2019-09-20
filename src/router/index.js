import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: () => import ('@/components/lotterydetail/LotteryCard')     
    },
    {
      path: '/second-detail',
      component: () => import ('@/views/secondDetail/index'),
      redirect: '/second-detail/history',
      children: [
        {
          path: 'history',
          name: '开奖记录',
          meta:{ showBack: true },
          component: () => import ('@/views/secondDetail/lotteryHistory'),        
        },
        {
          path: 'trend-line',
          name: '长龙统计',
          meta:{ showBack: true },
          component: () => import ('@/views/secondDetail/trendLine')
        },
        {
          path: 'two-sided',
          name: '双面计划',
          meta:{ showBack: true },
          component: () => import ('@/views/secondDetail/twoSided')
        },
        {
          path: 'plan',
          name: '专家计划',
          meta:{ showBack: true },
          component: () => import ('@/views/secondDetail/plan')
        },
        {
          path: 'planInfo',
          name: '专家计划详情',
          meta:{ showBack: true },
          component: () => import ('@/views/secondDetail/planInfo')
        }
      ]
    },
    {
      path: '*',
      redirect: '/'
    },
    {
      path:'/page408',
      component: () => import ('@/views/page408')
    }  
  ]
})
