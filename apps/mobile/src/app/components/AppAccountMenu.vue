<template>
  <q-btn flat rounded class="q-pa-sm" :ripple="false">
    <div class="row items-center">
      <div class="text-right q-pa-sm">
        <div class="account-name">{{ accountStore.state.fullname }}</div>
        <div class="account-type">
          {{ accountStore.state.position ? `${accountStore.state.position} &bull; ` : '' }}
          {{ accountStore.state.roleName }}
        </div>
      </div>

      <q-avatar size="40px">
        <img :src="accountStore.state.avatar" :alt="accountStore.state.fullname" />
      </q-avatar>
    </div>

    <q-menu anchor="bottom middle" self="top middle">
      <q-list style="min-width: 180px">
        <q-item clickable v-close-popup @click="router.push({ name: 'settings' })">
          <q-item-section avatar>
            <q-icon color="secondary" name="mdi-cog" />
          </q-item-section>

          <q-item-section>
            {{ $t('account_menu_settings') }}
          </q-item-section>
        </q-item>
        <q-item clickable v-close-popup @click="logoutAction.logout()">
          <q-item-section avatar>
            <q-icon color="primary" name="mdi-logout-variant" />
          </q-item-section>

          <q-item-section>
            {{ $t('account_menu_logout') }}
          </q-item-section>
        </q-item>
      </q-list>
    </q-menu>
  </q-btn>
</template>

<style scope lang="scss">
.account-name {
  text-transform: none;
  color: #000;
  line-height: 10px;
  font-size: 14px;
  font-weight: 500;
}

.account-type {
  line-height: 0;
  margin-top: 10px;
  text-transform: none;
  font-size: 12px;
  font-weight: 300;
}
</style>

<script setup lang="ts">
import { useLogoutAction } from '@/common/hooks';
import { useAccountStore } from '@/stores/account';

const router = useRouter();

const accountStore = useAccountStore();
const logoutAction = useLogoutAction();
</script>
