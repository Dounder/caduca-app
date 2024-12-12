import type { RouteRecordRaw } from 'vue-router'

export const PRODUCT_ROUTES: RouteRecordRaw[] = [
  {
    path: 'productos',
    name: 'product.list',
    meta: { titleKey: 'product.title' },
    component: () => import(/* webpackChunkName: "product" */ '../views/ProductListView.vue')
  },
  {
    path: 'producto/:id',
    name: 'product.detail',
    props: true,
    meta: { titleKey: 'product.title' },
    component: () => import(/* webpackChunkName: "product" */ '../views/ProductView.vue')
  }
]
