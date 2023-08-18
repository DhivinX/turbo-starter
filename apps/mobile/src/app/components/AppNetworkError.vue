<template>
  <q-banner
    dense
    inline-actions
    class="text-white bg-deep-orange-6 text-center"
    v-if="appStore.state.networkError"
  >
    <q-spinner-radio color="white" size="24px" class="q-mr-sm" />
    {{ $t('app_connection_lost') }}
  </q-banner>
</template>

<script setup lang="ts">
import { useAppStore } from '@/stores/app';
const appStore = useAppStore();
</script>
