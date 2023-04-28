<template>
  <q-card>
    <q-scroll-area style="height: 500px">
      <CommentComponent
        v-for="comment in props.post.comments"
        :key="comment.id"
        class="q-ml-lg q-mr-lg q-mt-sm q-mb-sm"
        :comment="comment"
      />
    </q-scroll-area>
  </q-card>
</template>

<script setup lang="ts">
import { Post_extended } from 'src/types/dbTypes';
import CommentComponent from './CommentComponent.vue';

const props = defineProps<{
  post: Post_extended;
}>();
</script>

<style scoped></style>
