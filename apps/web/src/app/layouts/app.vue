<template>
  <q-layout view="lHh LpR lff">
    <q-header class="app-header bg-white text-grey-8 q-px-sm">
      <AppNetworkError />

      <q-toolbar class="q-pa-sm">
        <q-btn dense flat round icon="mdi-menu" @click="toggleDrawer" />

        <q-toolbar-title></q-toolbar-title>

        <AppAccountMenu />
      </q-toolbar>
    </q-header>

    <AppDrawer v-model="drawerOpen" />

    <q-page-container class="app-page-container">
      <q-linear-progress
        indeterminate
        v-if="appStore.state.isRouteLoading"
        style="position: fixed; z-index: 999"
      />
      <RouterView />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { useAppStore } from '@/stores/app';

const appStore = useAppStore();
const drawerOpen = ref<boolean>(false);

function toggleDrawer() {
  drawerOpen.value = !drawerOpen.value;
}
</script>
