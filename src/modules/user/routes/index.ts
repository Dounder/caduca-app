import type { RouteRecordRaw } from 'vue-router'

export const USER_ROUTES: RouteRecordRaw[] = [
  {
    path: 'usuarios',
    name: 'user.list',
    meta: { titleKey: 'user.title' },
    component: () => import('../views/UserListView.vue')
  },
  {
    path: 'usuarios/id/:id',
    name: 'user.detail',
    props: true,
    component: () => import('../views/UserView.vue')
  }
]
