<template>
  <AppPage>
    <template v-slot:header>
      <AppPageHeader :title="$t('routes_settings')" icon="mdi-cog" />
    </template>

    <div class="row q-col-gutter-lg">
      <div class="col-12 col-lg-6">
        <AppCard class="full-height">
          <Form
            @submit="saveGeneralAction.execute(500)"
            :validation-schema="toTypedSchema(userUpdateSelfSchema)"
            :initial-values="generalForm"
          >
            <q-card-section class="card-title">
              {{ $t('settings_general_title') }}
            </q-card-section>

            <q-card-section>
              <div class="row q-col-gutter-md">
                <VInput
                  class="col-12"
                  name="email"
                  :modelValue="accountStore.state.email"
                  :label="$t('settings_general_email')"
                  outlined
                  readonly
                >
                  <template v-slot:prepend>
                    <q-icon name="mdi-at" />
                  </template>
                </VInput>

                <VInput
                  class="col-12"
                  name="firstName"
                  v-model="generalForm.firstName"
                  :disable="saveGeneralAction.isLoading"
                  :label="$t('settings_general_form_first_name')"
                  outlined
                >
                  <template v-slot:prepend>
                    <q-icon name="mdi-account" />
                  </template>
                </VInput>

                <VInput
                  class="col-12"
                  name="lastName"
                  v-model="generalForm.lastName"
                  :disable="saveGeneralAction.isLoading"
                  :label="$t('settings_general_form_last_name')"
                  outlined
                >
                  <template v-slot:prepend>
                    <q-icon name="mdi-account" />
                  </template>
                </VInput>

                <VInput
                  class="col-12 col-md-6"
                  name="role"
                  :modelValue="$t(`roles_${accountStore.state.role}`)"
                  :label="$t('settings_general_role')"
                  outlined
                  readonly
                >
                  <template v-slot:prepend>
                    <q-icon name="mdi-shield-star" />
                  </template>
                </VInput>

                <VInput
                  class="col-12 col-md-6"
                  name="position"
                  v-model="generalForm.position"
                  :disable="saveGeneralAction.isLoading"
                  :label="$t('settings_general_form_position')"
                  outlined
                >
                  <template v-slot:prepend>
                    <q-icon name="mdi-school" />
                  </template>
                </VInput>
              </div>
            </q-card-section>

            <q-card-section class="text-center text-negative" v-if="saveGeneralError">
              {{ saveGeneralError }}
            </q-card-section>

            <q-card-actions>
              <q-space />

              <q-btn
                icon="mdi-check"
                :label="$t('save')"
                type="submit"
                :loading="saveGeneralAction.isLoading"
                :disable="saveGeneralAction.isLoading"
                color="primary"
                rounded
              />
            </q-card-actions>
          </Form>
        </AppCard>
      </div>

      <div class="col-12 col-lg-6">
        <AppCard class="full-height">
          <Form
            @submit="savePasswordAction.execute(500)"
            :validation-schema="toTypedSchema(userUpdateSelfPasswordSchema)"
            :initial-values="passwordForm"
          >
            <q-card-section class="card-title">
              {{ $t('settings_password_title') }}
            </q-card-section>

            <q-card-section>
              <div class="row q-col-gutter-md">
                <VInput
                  class="col-12"
                  name="password"
                  :type="isPasswordVisible ? 'text' : 'password'"
                  v-model="passwordForm.password"
                  :disable="savePasswordAction.isLoading"
                  :error="isWrongPasswordError"
                  :label="$t('settings_password_form_password')"
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

                <VInput
                  class="col-12"
                  name="newPassword"
                  :type="isNewPasswordVisible ? 'text' : 'password'"
                  v-model="passwordForm.newPassword"
                  :disable="savePasswordAction.isLoading"
                  :label="$t('settings_password_form_new_password')"
                  outlined
                >
                  <template v-slot:prepend>
                    <q-icon name="mdi-lock-reset" />
                  </template>
                  <template v-slot:append>
                    <q-icon
                      :name="isNewPasswordVisible ? 'mdi-eye' : 'mdi-eye-off'"
                      @click="isNewPasswordVisible = !isNewPasswordVisible"
                    />
                  </template>
                </VInput>

                <VInput
                  class="col-12"
                  name="repeatPassword"
                  :type="isRepeatPasswordVisible ? 'text' : 'password'"
                  v-model="passwordForm.repeatPassword"
                  :disable="savePasswordAction.isLoading"
                  :label="$t('settings_password_form_repeat_password')"
                  outlined
                >
                  <template v-slot:prepend>
                    <q-icon name="mdi-lock-check" />
                  </template>
                  <template v-slot:append>
                    <q-icon
                      :name="isRepeatPasswordVisible ? 'mdi-eye' : 'mdi-eye-off'"
                      @click="isRepeatPasswordVisible = !isRepeatPasswordVisible"
                    />
                  </template>
                </VInput>
              </div>
            </q-card-section>

            <q-card-section class="text-center text-negative" v-if="savePasswordError">
              {{ savePasswordError }}
            </q-card-section>

            <q-card-actions>
              <q-space />

              <q-btn
                icon="mdi-check"
                :label="$t('save')"
                type="submit"
                :loading="savePasswordAction.isLoading"
                :disable="savePasswordAction.isLoading"
                color="primary"
                rounded
              />
            </q-card-actions>
          </Form>
        </AppCard>
      </div>
    </div>
  </AppPage>
</template>

<script setup lang="ts">
import { Form } from 'vee-validate';
import { usePromiseState, api, ResponseError } from '@/common';
import { useAccountStore } from '@/stores/account';
import { useI18n } from 'vue-i18n';
import { useQuasar } from 'quasar';
import {
  UserUpdateSelfDto,
  UserUpdateSelfPasswordDto,
  userUpdateSelfSchema,
  userUpdateSelfPasswordSchema,
} from 'shared';
import { toTypedSchema } from '@vee-validate/zod';

const accountStore = useAccountStore();
const $q = useQuasar();
const { t } = useI18n();

const isPasswordVisible = ref(false);
const isNewPasswordVisible = ref(false);
const isRepeatPasswordVisible = ref(false);

const generalForm = reactive<UserUpdateSelfDto>({
  firstName: accountStore.state.firstName,
  lastName: accountStore.state.lastName,
  position: accountStore.state.position,
});

const passwordForm = reactive<UserUpdateSelfPasswordDto>({
  password: '',
  newPassword: '',
  repeatPassword: '',
});

const saveGeneralAction = usePromiseState<void, ResponseError>(async () => {
  const res = await api.users.updateSelf(generalForm);
  accountStore.load(res.data);

  $q.notify({
    icon: 'mdi-check',
    color: 'positive',
    message: t('saved_successfully'),
    timeout: 1000,
  });
});

const savePasswordAction = usePromiseState<void, ResponseError>(async () => {
  const res = await api.users.updateSelfPassword(passwordForm);
  accountStore.load(res.data);
  passwordForm.password = '';
  passwordForm.newPassword = '';
  passwordForm.repeatPassword = '';

  $q.notify({
    icon: 'mdi-check',
    color: 'positive',
    message: t('saved_successfully'),
    timeout: 1000,
  });
});

const saveGeneralError = computed<string>(() => {
  if (saveGeneralAction.error) return t('settings_general_form_errors_default');

  return undefined;
});

const savePasswordError = computed<string>(() => {
  if (savePasswordAction.error && savePasswordAction.error.response.status === 403)
    return t('settings_password_form_errors_wrong_password');

  if (savePasswordAction.error) return t('settings_general_form_errors_default');

  return undefined;
});

const isWrongPasswordError = computed<boolean>(() => {
  return savePasswordAction.error && savePasswordAction.error.response.status === 403;
});

watch(generalForm, () => {
  saveGeneralAction.error = undefined;
});

watch(passwordForm, () => {
  savePasswordAction.error = undefined;
});
</script>
