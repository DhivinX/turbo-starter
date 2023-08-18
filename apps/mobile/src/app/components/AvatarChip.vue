<template>
  <div v-if="!props.reverse" class="text-left flex items-center">
    <q-avatar size="32px" class="q-mr-sm">
      <q-img :src="props.avatar" :alt="`${props.title}`" />
    </q-avatar>
    <div>
      <div class="name">
        {{ props.title }}
      </div>
      <div class="time">
        {{ props.subtitle }}
      </div>
    </div>
  </div>
  <div v-else class="text-right flex items-center">
    <div>
      <div class="name">
        {{ props.title }}
      </div>
      <div class="time">
        {{ props.subtitle }}
      </div>
    </div>
    <q-avatar size="32px" class="q-ml-sm">
      <q-img :src="props.avatar" :alt="`${props.title}`" />
    </q-avatar>
  </div>
</template>

<style scoped lang="scss">
.name {
  line-height: 14px;
}
.time {
  line-height: 14px;
  font-weight: 300;
  font-size: 12px;
  color: #616161;
}
</style>

<script setup lang="ts">
interface Props {
  title: string;
  subtitle: string;
  avatar: string;
  reverse?: boolean;
}

const props = defineProps<Props>();
</script>
