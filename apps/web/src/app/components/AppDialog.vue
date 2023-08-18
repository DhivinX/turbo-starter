<template>
  <q-dialog ref="dialogRef" @hide="onDialogHide" :maximized="maximized">
    <q-card class="q-dialog-plugin q-dialog-max-width" :style="{ 'max-width': `${props.width}px` }">
      <component
        :is="props.isForm ? Form : 'fragment'"
        @submit="$emit('submit', slotBind)"
        :validation-schema="props.validationSchema"
        :initial-values="props.initialValues"
        ref="form"
      >
        <div class="title-bar">
          <slot v-bind="slotBind" name="titleBar"></slot>

          <div v-if="!!$slots.titleBarLeft">
            <slot v-bind="slotBind" name="titleBarLeft"></slot>
          </div>

          <q-space v-if="!!$slots.titleBarLeft" />

          <q-icon v-if="props.icon" :name="props.icon" class="q-mr-sm" size="sm" />
          <h5 v-if="props.title">{{ props.title }}</h5>

          <q-space v-if="!!$slots.titleBarRight" />
          <slot v-bind="slotBind" v-if="!!$slots.titleBarRight" name="titleBarRight"></slot>
        </div>

        <q-card-section
          class="row justify-center align-center items-center"
          style="height: 100%; min-height: 200px"
          v-if="props.loading"
        >
          <q-spinner color="primary" size="50px" />
        </q-card-section>

        <div
          :style="{ 'max-height': !props.maximized ? 'calc(90vh - 180px)' : '100vh' }"
          class="scroll"
          v-else
        >
          <slot v-bind="slotBind"></slot>
        </div>

        <q-card-actions v-if="!!$slots.actions">
          <slot v-bind="slotBind" name="actions"></slot>
        </q-card-actions>
      </component>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { Form } from 'vee-validate';
import { useDialogPluginComponent } from 'quasar';

defineEmits([...useDialogPluginComponent.emits, 'submit']);
const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } = useDialogPluginComponent();
const form = ref();

interface Props {
  title?: string;
  icon?: string;
  loading?: boolean;
  width?: number;
  maximized?: boolean;
  isForm?: boolean;
  validationSchema?: any;
  initialValues?: any;
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
