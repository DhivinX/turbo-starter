<template>
  <AppPage :loading="usersAction.counter === 0">
    <template v-slot:header>
      <AppPageHeader :title="$t('routes_users')" icon="mdi-account-supervisor" />
    </template>

    <AppCard>
      <template #titleBar>
        <div class="row q-gutter-y-md full-width">
          <div class="col-6 self-center">
            <q-input
              outlined
              rounded
              dense
              debounce="500"
              v-model="filter"
              :placeholder="$t('search')"
            >
              <template v-slot:prepend>
                <q-icon name="mdi-magnify" />
              </template>
            </q-input>
          </div>
          <div class="col-6 text-right self-center">
            <q-btn
              icon="mdi-plus"
              :label="$t('add')"
              :disable="usersAction.isLoading"
              color="primary"
              rounded
              @click="userCreateDialog"
            />
          </div>
        </div>
      </template>

      <q-card-section>
        <q-table
          class="no-shadow"
          row-key="id"
          :rows="usersAction.state.elements"
          :columns="columns"
          :loading="!usersAction.isReady"
          @request="(props) => usersAction.execute(500, props.pagination)"
          :filter="filter"
          color="primary"
          v-model:pagination="pagination"
          :rows-per-page-options="[5, 10, 20, 50]"
        >
          <template v-slot:body-cell-avatar="props">
            <q-td>
              <q-avatar size="40px">
                <q-img :src="props.value" :alt="`${props.row.firstName} ${props.row.lastName}`" />
              </q-avatar>
            </q-td>
          </template>

          <template v-slot:body-cell-edit="props">
            <q-td class="text-right">
              <q-btn
                v-if="props.value !== accountStore.state.id"
                size="10px"
                round
                color="secondary"
                icon="mdi-cog"
                :to="{ name: 'user', params: { id: props.value } }"
              />
            </q-td>
          </template>
        </q-table>
      </q-card-section>
    </AppCard>
  </AppPage>
</template>

<script setup lang="ts">
import { api, usePromiseState, ResponseError } from '@/common';
import { PaginationResponse, UserProfileResponse } from 'shared';
import { QTableColumn, QTableProps, useQuasar } from 'quasar';
import UserCreateDialog from '@/app/components/dialogs/UserCreateDialog.vue';
import { useI18n } from 'vue-i18n';
import { useAccountStore } from '@/stores/account';

const accountStore = useAccountStore();
const $q = useQuasar();
const { t } = useI18n();

const pagination = ref<QTableProps['pagination']>({
  page: 1,
  rowsPerPage: 10,
  rowsNumber: 0,
  sortBy: 'role',
  descending: false,
});

const filter = ref('');

const columns: QTableColumn<UserProfileResponse>[] = [
  {
    name: 'avatar',
    label: null,
    field: 'avatar',
    align: 'center',
  },
  {
    name: 'name',
    label: t('users_list_first_and_last_name'),
    field: (row) => `${row.firstName} ${row.lastName}`,
    align: 'left',
    sortable: true,
  },
  {
    name: 'email',
    label: t('users_list_email'),
    field: 'email',
    align: 'left',
  },
  {
    name: 'role',
    label: t('users_list_role'),
    field: (row) => t(`roles_${row.role}`),
    align: 'left',
    sortable: true,
  },
  {
    name: 'createdAt',
    label: t('users_list_created_at'),
    field: (row) =>
      new Date(row.createdAt).toLocaleDateString([], {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      }),
    align: 'left',
    sortable: true,
  },
  {
    name: 'edit',
    label: t('edit'),
    field: 'id',
    align: 'right',
  },
];

const usersAction = usePromiseState<PaginationResponse<UserProfileResponse>, ResponseError>(
  async (paginationPayload: QTableProps['pagination']) => {
    const { page, rowsPerPage, sortBy, descending } = paginationPayload;

    const res = await api.users.getMany({
      page: page,
      take: rowsPerPage,
      sortBy: sortBy,
      descending: descending,
      filter: filter.value,
    });

    pagination.value.page = page;
    pagination.value.rowsPerPage = rowsPerPage;
    pagination.value.rowsNumber = res.data.total;
    pagination.value.sortBy = sortBy;
    pagination.value.descending = descending;

    return res.data;
  },
);

usersAction.execute(500, pagination.value);

function userCreateDialog(): void {
  $q.dialog({
    component: UserCreateDialog,
  }).onOk(() => {
    usersAction.execute(500, pagination.value);
  });
}
</script>
