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
    component: () => import('../views/UserView.vue')
  },
  {
    path: 'usuarios/perfil/:username',
    name: 'user.profile',
    component: () => import('../views/UserProfileView.vue')
  }
]
