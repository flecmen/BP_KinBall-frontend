<template>
  <q-page class="row justify-evenly">
    <PostsFeed
      class="col-sm-12 col-md-8 col-lg-6"
      :posts="postStore.posts_sorted"
      :feedFilter="true"
    />
  </q-page>
</template>

<script setup lang="ts">
import PostsFeed from 'src/components/feed/PostsFeed.vue';
import { usePostStore } from 'src/stores/post-store';

const postStore = usePostStore();
</script>

<style></style>
