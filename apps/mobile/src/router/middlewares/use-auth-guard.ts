import { Router } from 'vue-router';
import { useAccountStore } from '@/stores/account';

export enum AuthMeta {
  None,
  Required,
  Optional,
}

export function useAuthGuard(router: Router) {
  router.beforeEach(async (to) => {
    const accountStore = useAccountStore();
    accountStore.refreshAuthState();

    if (!accountStore.state.loaded && accountStore.state.authenticated)
      await accountStore.fetch(500);

    if (to.meta.auth === AuthMeta.Required && !accountStore.state.authenticated) {
      return { name: 'login' };
    }

    if (to.meta.auth === AuthMeta.None && accountStore.state.authenticated) {
      return { name: 'dashboard' };
    }

    if (to.meta.roles && !to.meta.roles.includes(accountStore.state.role)) {
      return { name: 'dashboard' };
    }

    if (to.name === 'user' && to.params.id === accountStore.state.id) {
      return { name: 'dashboard' };
    }

    return true;
  });
}
