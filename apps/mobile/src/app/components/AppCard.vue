<template>
  <q-card>
    <q-card-section v-if="props.loading" class="flex flex-center">
      <q-spinner color="primary" size="50px" class="q-my-xl" />
    </q-card-section>

    <slot v-else></slot>
  </q-card>
</template>

<script setup lang="ts">
interface Props {
  loading?: boolean;
}

const props = defineProps<Props>();
</script>
