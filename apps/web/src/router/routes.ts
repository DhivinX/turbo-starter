import { RouteRecordRaw } from 'vue-router';
import { AuthMeta } from './middlewares';
import { Role } from 'shared';

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
        path: '/users',
        component: () => import('@/app/pages/users/index.vue'),
        children: [
          {
            path: 'list',
            name: 'users',
            component: () => import('@/app/pages/users/list.vue'),
            meta: {
              auth: AuthMeta.Required,
              roles: [Role.Admin],
            },
          },
          {
            path: ':id',
            name: 'user',
            component: () => import('@/app/pages/users/user.vue'),
            meta: {
              auth: AuthMeta.Required,
              roles: [Role.Admin],
            },
          },
        ],
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
