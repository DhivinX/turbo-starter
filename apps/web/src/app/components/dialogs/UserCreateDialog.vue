<template>
  <AppDialog
    icon="mdi-plus"
    :title="$t('users_create_title')"
    @submit="({ ok }) => saveAction.execute(500, ok)"
    :validation-schema="toTypedSchema(userCreateSchema)"
    :initial-values="form"
    :width="600"
    is-form
  >
    <template #default>
      <q-card-section>
        <div class="row q-col-gutter-md">
          <q-select
            class="col-12"
            name="role"
            v-model="form.role"
            :disable="saveAction.isLoading"
            :label="$t('users_create_role')"
            :options="rolesSelectionTable"
            outlined
            emit-value
            map-options
          >
            <template v-slot:prepend>
              <q-icon name="mdi-shield-star" />
            </template>
          </q-select>

          <VInput
            class="col-12 col-md-6"
            name="firstName"
            v-model="form.firstName"
            :disable="saveAction.isLoading"
            :label="$t('users_create_first_name')"
            outlined
          >
            <template v-slot:prepend>
              <q-icon name="mdi-account" />
            </template>
          </VInput>

          <VInput
            class="col-12 col-md-6"
            name="lastName"
            v-model="form.lastName"
            :disable="saveAction.isLoading"
            :label="$t('users_create_last_name')"
            outlined
          >
            <template v-slot:prepend>
              <q-icon name="mdi-account" />
            </template>
          </VInput>

          <VInput
            class="col-12"
            name="email"
            v-model="form.email"
            :disable="saveAction.isLoading"
            :label="$t('users_create_email')"
            :error="isUserExistsError"
            outlined
          >
            <template v-slot:prepend>
              <q-icon name="mdi-at" />
            </template>
          </VInput>

          <VInput
            class="col-12"
            name="password"
            :type="isPasswordVisible ? 'text' : 'password'"
            v-model="form.password"
            :disable="saveAction.isLoading"
            :label="$t('users_create_password')"
            outlined
          >
            <template v-slot:prepend>
              <q-icon name="mdi-lock" />
            </template>
            <template v-slot:append>
              <q-icon
                :name="isPasswordVisible ? 'mdi-eye' : 'mdi-eye-off'"
                @click="isPasswordVisible = !isPasswordVisible"
              />
            </template>
          </VInput>
        </div>
      </q-card-section>

      <q-card-section class="text-center text-negative" v-if="saveError">
        {{ saveError }}
      </q-card-section>
    </template>

    <template #actions="{ cancel }">
      <q-space />
      <q-btn
        color="secondary"
        icon="mdi-close"
        :label="$t('close')"
        :disable="saveAction.isLoading"
        @click="cancel"
        rounded
        outline
      />

      <q-btn
        color="primary"
        icon="mdi-plus"
        :label="$t('add')"
        :loading="saveAction.isLoading"
        :disable="saveAction.isLoading"
        type="submit"
        rounded
      />
    </template>
  </AppDialog>
</template>

<script setup lang="ts">
import { Role, UserCreateDto, userCreateSchema } from 'shared';
import { useI18n } from 'vue-i18n';
import { api, usePromiseState, ResponseError } from '@/common';
import { useQuasar } from 'quasar';
import { toTypedSchema } from '@vee-validate/zod';

const $q = useQuasar();
const { t } = useI18n();

const isPasswordVisible = ref(false);

const rolesSelectionTable = Object.values(Role).map((role) => ({
  label: t(`roles_${role}`),
  value: role,
}));

const form = reactive<UserCreateDto>({
  email: '',
  firstName: '',
  lastName: '',
  password: '',
  role: Role.User,
});

const saveAction = usePromiseState<void, ResponseError>(async (ok: () => void) => {
  await api.users.createOne(form);

  $q.notify({
    icon: 'mdi-check',
    color: 'positive',
    message: t('saved_successfully'),
    timeout: 1000,
  });

  ok();
});

const saveError = computed<string>(() => {
  if (saveAction.error && saveAction.error.response.status === 409)
    return t('users_create_errors_user_exists');

  if (saveAction.error) return t('users_create_errors_default');

  return undefined;
});

const isUserExistsError = computed<boolean>(() => {
  return saveAction.error && saveAction.error.response.status === 409;
});

watch(form, () => {
  saveAction.error = undefined;
});
</script>
