<template>
  <q-btn
    flat
    icon="favorite"
    @click="emit('like')"
    :loading="isBeingLiked"
    :color="props.color"
  >
    <q-badge v-if="props.showLikes" transparent floating>{{
      props.likesCount
    }}</q-badge>
    <template v-slot:loading>
      <q-spinner-facebook />
    </template>
    <q-tooltip>{{ $t('tooltip.like') }}</q-tooltip>
  </q-btn>
</template>

<script setup lang="ts">
const props = defineProps<{
  isBeingLiked: boolean;
  color: string;
  likesCount: number;
  showLikes: boolean;
}>();

const emit = defineEmits<{
  (event: 'like'): void;
}>();
</script>

<style scoped></style>
