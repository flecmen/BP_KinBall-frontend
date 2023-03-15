<template>
  <q-card class="post q-ma-sm">
    <q-card-section class="post-header">
      <PostHead :post="props.post" :isMobile="isMobile" />
      <PostContent :post="props.post" :isMobile="isMobile" />
    </q-card-section>
    <q-separator />
    <PostInteractionBtns :post="props.post" :isMobile="isMobile" />
  </q-card>
</template>

<script setup lang="ts">
import { defineProps, computed } from 'vue';
import { useQuasar } from 'quasar';
import { Post_extended } from 'src/types/dbTypes';
import PostHead from './PostHead.vue';
import PostContent from './PostContent.vue';
import PostInteractionBtns from './PostInteractionBtns.vue';

export interface Props {
  post: Post_extended;
}
const props = defineProps<Props>();

const $q = useQuasar();
const isMobile = computed(() => $q.screen.xs || $q.screen.sm);
</script>

<style scoped></style>
