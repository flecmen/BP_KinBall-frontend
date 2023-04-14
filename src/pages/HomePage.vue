<template>
  <q-page class="row justify-evenly">
    <q-page-sticky position="left" :offset="[18, 0]" class="lg">
      <FeedFilter class="q-ma-none" />
    </q-page-sticky>

    <PostsFeed
      :posts="postStore.posts_sorted"
      :feedFilter="breakpoints.isLessThanLg($q)"
      class="col-6"
      @edit-post="editPost"
    />
  </q-page>
</template>

<script setup lang="ts">
import PostsFeed from 'src/components/feed/PostsFeed.vue';
import FeedFilter from 'src/components/feed/FeedFilter.vue';
import { usePostStore } from 'src/stores/post-store';
import breakpoints from 'src/helpers/breakpoints';

const emit = defineEmits<{
  (event: 'edit-post', postIt: number): void;
}>();

const postStore = usePostStore();

function editPost(postId: number) {
  emit('edit-post', postId);
}
</script>

<style></style>
