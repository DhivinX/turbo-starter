<template>
  <div class="full-width bg-white border-bottom-accent">
    <div class="container">
      <div class="row items-center q-my-sm">
        <q-icon :name="props.icon" class="q-mr-md" size="lg" />
        <h5 class="q-my-none text-weight-bold">
          {{ props.title }}
        </h5>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  title: string;
  icon: string;
}

const props = defineProps<Props>();
</script>
