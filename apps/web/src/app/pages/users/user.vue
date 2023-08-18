<template>
  <AppPage :loading="userAction.isLoading">
    <template v-slot:header>
      <UserHeader :title="userFullName" :avatar="userAction.state.avatar" />
    </template>

    <div class="row q-col-gutter-lg">
      <div class="col-12">
        <AppCard
          :title="$t('users_title')"
          @submit="saveAction.execute(500)"
          :validation-schema="toTypedSchema(userUpdateSchema)"
          :initial-values="form"
          is-form
        >
          <template #default>
            <q-card-section class="row q-col-gutter-md">
              <VInput
                class="col-12 col-lg-6"
                name="email"
                :modelValue="userAction.state.email"
                :label="$t('users_email')"
                outlined
                readonly
              >
                <template v-slot:prepend>
                  <q-icon name="mdi-at" />
                </template>
              </VInput>

              <q-select
                class="col-12 col-sm-6 col-lg-3"
                name="role"
                v-model="form.role"
                :disable="saveAction.isLoading"
                :label="$t('users_form_role')"
                :options="rolesSelectionTable"
                outlined
                emit-value
                map-options
              >
                <template v-slot:prepend>
                  <q-icon name="mdi-shield-star" />
                </template>
              </q-select>

              <q-select
                class="col-12 col-sm-6 col-lg-3"
                name="isActive"
                v-model="form.isActive"
                :disable="saveAction.isLoading"
                :label="$t('users_form_isActive')"
                :options="booleanSelectionTable"
                outlined
                emit-value
                map-options
              >
                <template v-slot:prepend>
                  <q-icon v-if="form.isActive" name="mdi-check" />
                  <q-icon v-else name="mdi-cancel" />
                </template>
              </q-select>

              <VInput
                class="col-12 col-md-6"
                name="firstName"
                v-model="form.firstName"
                :disable="saveAction.isLoading"
                :label="$t('users_form_first_name')"
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
                :label="$t('users_form_last_name')"
                outlined
              >
                <template v-slot:prepend>
                  <q-icon name="mdi-account" />
                </template>
              </VInput>

              <VInput
                class="col-12 col-md-6"
                name="position"
                v-model="form.position"
                :disable="saveAction.isLoading"
                :label="$t('users_form_position')"
                outlined
              >
                <template v-slot:prepend>
                  <q-icon name="mdi-school" />
                </template>
              </VInput>

              <VInput
                class="col-12 col-md-6"
                name="password"
                :type="isPasswordVisible ? 'text' : 'password'"
                v-model="form.password"
                :disable="saveAction.isLoading"
                :label="$t('users_form_password')"
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
            </q-card-section>

            <q-card-section class="text-center text-negative" v-if="saveError">
              {{ saveError }}
            </q-card-section>
          </template>

          <template #actions>
            <q-space />

            <q-btn
              icon="mdi-check"
              :label="$t('save')"
              type="submit"
              :loading="saveAction.isLoading"
              :disable="saveAction.isLoading"
              color="primary"
              rounded
            />
          </template>
        </AppCard>
      </div>
    </div>
  </AppPage>
</template>

<script setup lang="ts">
import { api, usePromiseState, ResponseError } from '@/common';
import { Role, UserProfileResponse, UserUpdateDto, userUpdateSchema } from 'shared';
import { useI18n } from 'vue-i18n';
import { useQuasar } from 'quasar';
import { toTypedSchema } from '@vee-validate/zod';

const $q = useQuasar();
const { t } = useI18n();
const route = useRoute();

const isPasswordVisible = ref(false);

const rolesSelectionTable = Object.values(Role).map((role) => ({
  label: t(`roles_${role}`),
  value: role,
}));
const booleanSelectionTable = [
  { label: t('no'), value: false },
  { label: t('yes'), value: true },
];

const form = reactive<UserUpdateDto>({
  firstName: '',
  lastName: '',
  position: '',
  password: '',
  role: Role.User,
  isActive: true,
});

function loadForm(data: UserProfileResponse) {
  form.firstName = data.firstName;
  form.lastName = data.lastName;
  form.position = data.position;
  form.password = '';
  form.role = data.role;
  form.isActive = data.isActive;
}

const userAction = usePromiseState<UserProfileResponse, ResponseError>(async () => {
  const { data } = await api.users.getOne(route.params.id as string);
  loadForm(data);
  return data;
});

userAction.execute(500);

const saveAction = usePromiseState<void, ResponseError>(async () => {
  const { data } = await api.users.updateOne(userAction.state.id, form);
  loadForm(data);

  $q.notify({
    icon: 'mdi-check',
    color: 'positive',
    message: t('saved_successfully'),
    timeout: 1000,
  });
});

const saveError = computed<string>(() => {
  if (saveAction.error) return t('users_form_errors_default');

  return undefined;
});

const userFullName = computed(() => {
  return `${userAction.state.firstName} ${userAction.state.lastName}`;
});

watch(form, () => {
  saveAction.error = undefined;
});
</script>
