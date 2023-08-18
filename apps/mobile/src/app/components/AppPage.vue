<template>
  <q-page :class="{ 'row justify-center items-center': props.loading }">
    <div v-if="props.loading">
      <q-spinner color="primary" size="50px" />
    </div>

    <template v-else>
      <slot name="header"></slot>
      <div :class="{ container: !props.full }">
        <slot></slot>
      </div>
    </template>
  </q-page>
</template>

<script setup lang="ts">
const props = defineProps({
  loading: {
    type: Boolean,
    default: false,
  },

  full: {
    type: Boolean,
    default: false,
  },
});
</script>
