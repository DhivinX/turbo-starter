<template>
  <q-input
    :name="props.name"
    v-model="value"
    :error-message="!!fieldError ? fieldError : props.errorMessage"
    :error="!!fieldError || props.error"
    hide-bottom-space
  >
    <template v-slot:prepend v-if="$slots.prepend">
      <slot name="prepend"></slot>
    </template>
    <template v-slot:append v-if="$slots.append">
      <slot name="append"></slot>
    </template>
  </q-input>
</template>

<script setup lang="ts">
import { useField } from 'vee-validate';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

interface Props {
  name: string;
  errorMessage?: string;
  error?: boolean;
  untranslatable?: boolean;
}

const props = defineProps<Props>();

const { errorMessage, value } = useField<string>(props.name);

const fieldError = computed<string | undefined>(() => {
  const error: any = errorMessage.value;
  if (error && !props.untranslatable) {
    try {
      const json = JSON.parse(error);
      return t(`validation_${json.code}`, json.params);
    } catch (e) {
      return t(`validation_${error}`);
    }
  }

  return error;
});
</script>
