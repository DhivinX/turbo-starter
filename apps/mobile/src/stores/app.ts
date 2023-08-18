import { reactive } from 'vue';
import { useTitle } from '@vueuse/core';
import { defineStore } from 'pinia';
import { watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute } from 'vue-router';

interface State {
  networkError: boolean;
  isRouteLoading: boolean;
  routeTitle: string;
}

export const useAppStore = defineStore('app', () => {
  const route = useRoute();
  const { t } = useI18n();
  const title = useTitle();

  const state: State = reactive({
    networkError: false,
    isRouteLoading: false,
    routeTitle: t(`app_name`),
  });

  watch(
    () => route.name,
    () => {
      title.value = t(`routes_${route.name.toString()}`) + ' - ' + t(`app_name`);
      state.routeTitle = t(`routes_${route.name.toString()}`);
    }
  );

  return { state };
});
