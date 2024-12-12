import type { RouteRecordRaw } from 'vue-router'

export const SALES_PERSON_ROUTES: RouteRecordRaw[] = [
  {
    path: 'vendedores',
    name: 'salesperson.list',
    meta: { titleKey: 'salesperson.title' },
    component: () => import('../views/SalespersonListView.vue')
  },
  {
    path: 'vendedores/codigo/:code',
    name: 'salesperson.detail',
    props: true,
    meta: { titleKey: 'Vendedor {code}' },
    component: () => import('../views/SalespersonView.vue')
  }
]
