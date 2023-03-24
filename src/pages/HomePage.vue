<template>
  <q-page class="row items-center justify-evenly">
    <q-page-sticky position="left" :offset="[18, 0]">
      <FeedFilter class="q-ma-none" />
    </q-page-sticky>

    <PostsFeed class="col-6" />
    <NewPostModal />
  </q-page>
</template>

<script setup lang="ts">
import PostsFeed from 'src/components/feed/PostsFeed.vue';
import FeedFilter from 'src/components/feed/post/filter/FeedFilter.vue';
import NewPostModal from 'src/components/modals/NewPostModal.vue';
</script>

<style></style>
