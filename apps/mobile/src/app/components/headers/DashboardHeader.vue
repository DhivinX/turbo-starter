<template>
  <div class="full-width bg-white border-bottom-accent">
    <div class="container">
      <h5 class="q-my-none q-mt-sm text-weight-bold">
        {{ $t('dashboard_welcome', { name: accountStore.state.firstName }) }}
      </h5>
      <p class="q-mb-sm">{{ accountStore.state.email }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAccountStore } from '@/stores/account';
const accountStore = useAccountStore();
</script>
