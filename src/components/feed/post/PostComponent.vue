<template>
  <q-card class="post q-ma-sm">
    <q-card-section>
      <PostHead :post="props.post" :isMobile="isMobile" />
      <PostContent :post="props.post" :isMobile="isMobile" />
    </q-card-section>
    <q-separator />
    <PostInteractionBtns
      :post="props.post"
      :isMobile="isMobile"
      @showComments="revertCommentSectionVisibility()"
    />
    <WriteComment :post="props.post" :isMobile="isMobile" />
    <PostCommentSection
      v-if="isCommentSectionVisible && props.post.comments.length > 0"
      :post="props.post"
      :isMobile="isMobile"
    />
  </q-card>
</template>

<script setup lang="ts">
import { defineProps, computed, ref } from 'vue';
import { useQuasar } from 'quasar';
import { Post_extended } from 'src/types/dbTypes';
import PostHead from './PostHead.vue';
import PostContent from './PostContent.vue';
import PostInteractionBtns from './PostInteractionBtns.vue';
import PostCommentSection from './comments/PostCommentSection.vue';
import WriteComment from './comments/WriteComment.vue';

export interface Props {
  post: Post_extended;
}
const props = defineProps<Props>();

const isCommentSectionVisible = ref(false);

function revertCommentSectionVisibility() {
  isCommentSectionVisible.value = !isCommentSectionVisible.value;
}

const $q = useQuasar();
const isMobile = computed(() => $q.screen.xs || $q.screen.sm);
</script>

<style scoped></style>
