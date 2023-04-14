<template>
  <q-card>
    <div
      class="justify-center"
      v-for="comment in post.comments"
      :key="comment.id"
    >
      <CommentComponent
        class="q-ml-lg q-mr-lg q-mt-sm q-mb-sm"
        :comment="comment"
        :isMobile="isMobile"
      />
    </div>
  </q-card>
</template>

<script setup lang="ts">
import dateFormat from 'src/helpers/dateFormat';
import { defineProps } from 'vue';
import { Post_extended } from 'src/types/dbTypes';
import CommentComponent from './CommentComponent.vue';

export interface Props {
  post: Post_extended;
  isMobile: boolean;
}
const props = defineProps<Props>();
</script>

<style scoped></style>
