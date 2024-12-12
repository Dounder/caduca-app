import type { RouteRecordRaw } from 'vue-router'

import isAuthenticatedGuard from '@/modules/auth/guards/is-authenticated.guard'
import { CUSTOMER_ROUTES } from '@/modules/customer/routes'
import { SALES_PERSON_ROUTES } from '@/modules/salesperson/routes'
import { USER_ROUTES } from '@/modules/user/routes'
import { PRODUCT_ROUTES } from '@/modules/product'

export const HOME_ROUTES: RouteRecordRaw = {
  path: '/',
  name: 'home',
  alias: '/home',
  redirect: { name: 'home.view' },
  beforeEnter: [isAuthenticatedGuard],
  component: () => import('@/modules/home/layout/HomeLayout.vue'),
  children: [
    {
      path: '',
      name: 'home.view',
      component: () => import('@/modules/home/views/HomeView.vue'),
      meta: { titleKey: 'home.title' }
    },
    {
      path: 'preferencias',
      name: 'home.preferences',
      component: () => import('@/modules/home/views/HomePreferencesView.vue'),
      meta: { titleKey: 'navbar.preferences' }
    },
    ...USER_ROUTES,
    ...CUSTOMER_ROUTES,
    ...SALES_PERSON_ROUTES,
    ...PRODUCT_ROUTES
  ]
}
