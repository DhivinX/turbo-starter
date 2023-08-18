<template>
  <q-drawer show-if-above side="left" class="app-drawer">
    <q-scroll-area class="fit">
      <div class="logo-area">{{ $t('app_name') }}</div>

      <div class="account-area">
        <div class="text-center">
          <q-avatar size="90px">
            <img :src="accountStore.state.avatar" :alt="accountStore.state.fullname" />
          </q-avatar>

          <div class="fullname">{{ accountStore.state.fullname }}</div>
          <div class="email">{{ accountStore.state.email }}</div>
        </div>
      </div>

      <q-list padding>
        <div class="menu-title">
          <div class="title">{{ $t('menu_main_title') }}</div>
          <div class="caption">{{ $t('menu_main_caption') }}</div>
        </div>

        <q-item
          v-if="userHasPermission('dashboard')"
          :active="route.name === 'dashboard'"
          clickable
          @click="router.push({ name: 'dashboard' })"
        >
          <q-item-section avatar>
            <q-icon name="mdi-view-dashboard-outline" />
          </q-item-section>

          <q-item-section>{{ routeTitle('dashboard') }}</q-item-section>
        </q-item>

        <q-item
          v-if="userHasPermission('users')"
          :active="route.name === 'users'"
          clickable
          @click="router.push({ name: 'users' })"
        >
          <q-item-section avatar>
            <q-icon name="mdi-account-supervisor" />
          </q-item-section>

          <q-item-section>{{ routeTitle('users') }}</q-item-section>
        </q-item>
      </q-list>

      <q-list padding>
        <div class="menu-title">
          <div class="title">{{ $t('menu_account_title') }}</div>
          <div class="caption">{{ $t('menu_account_caption') }}</div>
        </div>

        <q-item
          v-if="userHasPermission('settings')"
          :active="route.name === 'settings'"
          clickable
          @click="router.push({ name: 'settings' })"
        >
          <q-item-section avatar>
            <q-icon name="mdi-cog" />
          </q-item-section>

          <q-item-section>{{ routeTitle('settings') }}</q-item-section>
        </q-item>

        <q-item clickable @click="logoutAction.logout()">
          <q-item-section avatar>
            <q-icon name="mdi-logout-variant" />
          </q-item-section>

          <q-item-section>{{ routeTitle('logout') }}</q-item-section>
        </q-item>
      </q-list>
    </q-scroll-area>
  </q-drawer>
</template>

<style scoped lang="scss">
.logo-area {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 72px;
  font-size: 20px;
  font-weight: 500;
  background-color: #0d121d;
}

.account-area {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 250px;

  .fullname {
    margin-top: 15px;
    font-weight: 500;
  }

  .email {
    font-weight: 300;
    font-size: 12px;
    color: #83a3ab;
  }
}

.scroll-area {
  height: 100%;
}

.q-item {
  margin: 0px 15px 5px 15px;
  border-radius: 10px;
  color: #9dbabf;

  &.q-router-link--active {
    color: #ffffff;
    background-color: #1a253c;
  }

  &:hover {
    color: #b9b7dc;
    background-color: #070d1d;
  }
}

.menu-title {
  margin: 0px 30px 10px 30px;

  .title {
    color: #728cf8;
    font-weight: 600;
    text-transform: uppercase;
    font-size: 14px;
  }

  .caption {
    font-size: 13px;
    font-weight: 300;
    color: #6f7586;
  }
}
</style>

<script setup lang="ts">
import { useAccountStore } from '@/stores/account';
import { useLogoutAction } from '@/common/hooks';
import { useI18n } from 'vue-i18n';

const accountStore = useAccountStore();
const logoutAction = useLogoutAction();
const router = useRouter();
const route = useRoute();
const { t } = useI18n();

function routeTitle(name: string): string {
  return t(`routes_${name}`);
}

function userHasPermission(routeName: string): boolean {
  const route = router.getRoutes().find((r) => r.name === routeName);
  if (route && route.meta.roles) return route.meta.roles.includes(accountStore.state.role);
  return true;
}
</script>
