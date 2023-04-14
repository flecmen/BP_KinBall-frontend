<template>
  <q-page class="row justify-evenly">
    <q-page-sticky position="left" :offset="[18, 0]">
      <FeedFilter class="q-ma-none" />
    </q-page-sticky>

    <PostsFeed
      :posts="postStore.posts_sorted"
      class="col-6"
      @edit-post="editPost"
    />
  </q-page>
</template>

<script setup lang="ts">
import PostsFeed from 'src/components/feed/PostsFeed.vue';
import FeedFilter from 'src/components/feed/post/filter/FeedFilter.vue';
import { usePostStore } from 'src/stores/post-store';

const emit = defineEmits<{
  (event: 'edit-post', postIt: number): void;
}>();

const postStore = usePostStore();

function editPost(postId: number) {
  emit('edit-post', postId);
}
</script>

<style></style>
