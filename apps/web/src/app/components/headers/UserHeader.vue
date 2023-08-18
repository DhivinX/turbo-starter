<template>
  <div class="full-width bg-white border-bottom-accent">
    <div class="container">
      <div class="flex items-center q-my-sm">
        <q-avatar size="72px">
          <q-img :src="props.avatar" :alt="props.title" />
        </q-avatar>
        <h5 class="q-my-none q-ml-lg text-weight-bold">
          {{ props.title }}
        </h5>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  title: string;
  avatar: string;
}

const props = defineProps<Props>();
</script>
