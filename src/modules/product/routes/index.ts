import type { RouteRecordRaw } from 'vue-router'

export const PRODUCT_ROUTES: RouteRecordRaw[] = [
  {
    path: 'productos',
    name: 'product.list',
    meta: { titleKey: 'product.title' },
    component: () => import(/* webpackChunkName: "product_list" */ '../views/ProductListView.vue')
  },
  {
    path: 'productos/n/:slug',
    name: 'product.detail',
    props: true,
    meta: { titleKey: 'product.title' },
    component: () => import(/* webpackChunkName: "product_detail" */ '../views/ProductView.vue')
  }
]
