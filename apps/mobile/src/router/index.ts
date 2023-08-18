import { Role } from 'shared';
import { createRouter, createWebHashHistory } from 'vue-router';
import { AuthMeta, useAuthGuard, useLoadingIndicator } from './middlewares';
import { routes } from './routes';

declare module 'vue-router' {
  export interface RouteMeta {
    auth: AuthMeta;
    roles?: Role[];
  }
}

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes,
});

useAuthGuard(router);
useLoadingIndicator(router);

export default router;
