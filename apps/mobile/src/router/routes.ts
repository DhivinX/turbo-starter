import { RouteRecordRaw } from 'vue-router';
import { AuthMeta } from './middlewares';

import DefaultLayout from '@/app/layouts/default.vue';
import AppLayout from '@/app/layouts/app.vue';
import LoginPage from '@/app/pages/login.vue';

export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: DefaultLayout,
    children: [
      {
        path: '/',
        name: 'login',
        component: LoginPage,
        meta: {
          auth: AuthMeta.None,
        },
      },
    ],
  },
  {
    path: '/app',
    component: AppLayout,
    children: [
      {
        path: '/dashboard',
        name: 'dashboard',
        component: () => import('@/app/pages/dashboard.vue'),
        meta: {
          auth: AuthMeta.Required,
        },
      },
      {
        path: '/settings',
        name: 'settings',
        component: () => import('@/app/pages/settings.vue'),
        meta: {
          auth: AuthMeta.Required,
        },
      },
    ],
  },
];
