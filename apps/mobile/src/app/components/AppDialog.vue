<template>
  <q-dialog ref="dialogRef" @hide="onDialogHide">
    <q-card class="q-dialog-plugin q-dialog-max-width">
      <div class="flex items-center bg-secondary text-white q-pa-sm">
        <q-icon v-if="props.icon" :name="props.icon" class="q-mr-sm" size="lg" />
        <h6 class="q-ml-sm q-my-none">{{ props.title }}</h6>
      </div>
      <q-card-section
        class="row justify-center align-center items-center"
        style="padding-top: 30px"
        v-if="props.loading"
      >
        <q-spinner color="primary" size="50px" />
      </q-card-section>
      <slot v-else v-bind="slotBind"></slot>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { useDialogPluginComponent } from 'quasar';

defineEmits([...useDialogPluginComponent.emits]);
const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } = useDialogPluginComponent();

interface Props {
  title?: string;
  icon?: string;
  loading?: boolean;
}

interface SlotBind {
  ok: (payload?: any) => void;
  cancel: () => void;
  hide: () => void;
}

const slotBind: SlotBind = {
  ok: onDialogOK,
  cancel: onDialogCancel,
  hide: onDialogHide,
};

const props = defineProps<Props>();
</script>
