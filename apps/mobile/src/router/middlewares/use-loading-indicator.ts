import { Router } from 'vue-router';
import { useAppStore } from '@/stores/app';

export function useLoadingIndicator(router: Router) {
  router.beforeEach(() => {
    const appStore = useAppStore();
    appStore.state.isRouteLoading = true;
  });

  router.afterEach(() => {
    const appStore = useAppStore();
    appStore.state.isRouteLoading = false;
  });
}
