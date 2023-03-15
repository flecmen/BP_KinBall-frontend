<template>
  <q-item>
    {{ props.post.text }}
  </q-item>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
import { Post_extended } from 'src/types/dbTypes';

export interface Props {
  post: Post_extended;
  isMobile: boolean;
}
const props = defineProps<Props>();
</script>

<style scoped></style>
