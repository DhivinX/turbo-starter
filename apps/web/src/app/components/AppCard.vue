<template>
  <q-card :style="{ 'max-width': `${props.width}px` }">
    <component
      :is="props.isForm ? Form : 'fragment'"
      @submit="$emit('submit')"
      :validation-schema="props.validationSchema"
      :initial-values="props.initialValues"
      ref="form"
    >
      <div class="title-bar">
        <slot name="titleBar"></slot>

        <div v-if="!!$slots.titleBarLeft">
          <slot name="titleBarLeft"></slot>
        </div>

        <q-space v-if="!!$slots.titleBarLeft" />

        <q-icon v-if="props.icon" :name="props.icon" class="q-mr-sm" size="sm" />
        <h5 v-if="props.title">{{ props.title }}</h5>

        <q-space v-if="!!$slots.titleBarRight" />
        <slot v-if="!!$slots.titleBarRight" name="titleBarRight"></slot>
      </div>

      <q-card-section
        class="row justify-center align-center items-center"
        style="height: 100%; min-height: 200px; flex-grow: 1"
        v-if="props.loading"
      >
        <q-spinner color="primary" size="50px" />
      </q-card-section>

      <div style="flex-grow: 1"><slot v-if="!props.loading"></slot></div>

      <q-card-actions v-if="!!$slots.actions && !props.loading">
        <slot name="actions"></slot>
      </q-card-actions>
    </component>
  </q-card>
</template>

<script setup lang="ts">
import { Form } from 'vee-validate';

interface Props {
  title?: string;
  icon?: string;
  loading?: boolean;
  width?: number;
  validationSchema?: any;
  initialValues?: any;
  isForm?: boolean;
}

const props = defineProps<Props>();
const form = ref();
</script>
