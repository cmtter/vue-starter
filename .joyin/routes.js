/**
 * 路由配置临时文件
 */
// import aaa from '@/views/a.vue'
// import bbb from '@/views/b.vue' path: '*'
export default [
  {
    path: '/main',
    component: () => import(/* webpackChunkName: "router-a" */'@/layout/UseLayout.vue'),
    children: [
      { path: 'a', component: () => import(/* webpackChunkName: "router-a" */'@/views/a.vue') },
      { path: 'b', component: () => import(/* webpackChunkName: "router-b" */'@/views/b.vue') },
    ]
  },
  { path: '/login', component: () => import(/* webpackChunkName: "router-login" */'@/views/login.vue') },
  { path: '/500/:code', component: () => import(/* webpackChunkName: "router-500" */'@/views/500.vue') },
  { path: '*', component: () => import(/* webpackChunkName: "router-404" */'@/views/404.vue') }

]

// export default [
//   { path: '/a', component: aaa },
//   { path: '/b', component: bbb }
// ]
