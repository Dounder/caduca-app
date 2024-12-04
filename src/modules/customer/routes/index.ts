import type { RouteRecordRaw } from 'vue-router'

export const CUSTOMER_ROUTES: RouteRecordRaw[] = [
  {
    path: 'clientes',
    name: 'customer.list',
    meta: { titleKey: 'customer.title' },
    component: () => import('../views/CustomerListView.vue')
  },
  {
    path: 'clientes/codigo/:code',
    name: 'customer.detail',
    meta: { titleKey: 'Cliente {code}' },
    component: () => import('../views/CustomerView.vue')
  }
]
