import type { RouteRecordRaw } from 'vue-router'

export const VOUCHER_ROUTES: RouteRecordRaw[] = [
  {
    path: 'vales/vencidos',
    name: 'voucher.list',
    meta: { titleKey: 'voucher.title' },
    component: () => import('../views/VoucherListView.vue')
  },
  {
    path: 'vales/vencidos/:number',
    name: 'voucher.detail',
    meta: { titleKey: 'Vale #{number}' },
    props: true,
    component: () => import('../views/VoucherView.vue')
  }
]
