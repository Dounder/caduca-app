import type { RouteRecordRaw } from 'vue-router'

export const VOUCHER_ROUTES: RouteRecordRaw[] = [
  {
    path: 'vales/vencidos',
    name: 'expired_voucher.list',
    component: () => import('../views/ExpiredVoucherListView.vue')
  },
  {
    path: 'vales/vencidos/:id',
    name: 'expired_voucher.detail',
    component: () => import('../views/ExpiredVoucherView.vue')
  }
]
