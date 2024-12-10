import type { RouteRecordRaw } from 'vue-router'

export const USER_ROUTES: RouteRecordRaw[] = [
  {
    path: 'usuarios',
    name: 'user.list',
    meta: { titleKey: 'user.title' },
    component: () => import('../views/UserListView.vue')
  },
  {
    path: 'usuarios/u/:username',
    name: 'user.detail',
    props: true,
    meta: { titleKey: '{username}' },
    component: () => import('../views/UserView.vue')
  }
]
