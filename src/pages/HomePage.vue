<template>
  <q-page class="row justify-evenly">
    <q-page-sticky
      position="left"
      :offset="[18, 0]"
      v-if="breakpoints.isMoreThan($q, breakpoints.breakPoints.lg.lower)"
    >
      <FeedFilter class="q-ma-none" />
    </q-page-sticky>

    <PostsFeed
      class="col-sm-12 col-md-8 col-lg-6"
      :posts="postStore.posts_sorted"
      :feedFilter="breakpoints.isLessThan($q, breakpoints.breakPoints.lg.lower)"
    />
  </q-page>
</template>

<script setup lang="ts">
import PostsFeed from 'src/components/feed/PostsFeed.vue';
import FeedFilter from 'src/components/feed/FeedFilter.vue';
import { usePostStore } from 'src/stores/post-store';
import breakpoints from 'src/helpers/breakpoints';

const postStore = usePostStore();
</script>

<style></style>
