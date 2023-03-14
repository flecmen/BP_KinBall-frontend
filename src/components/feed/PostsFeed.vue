<template>
  <div class="col-6">
    <PostComponent
      v-for="post in postStore.posts"
      v-bind:key="post.id"
      :post="post"
    />
  </div>
</template>

<script setup lang="ts">
import PostComponent from './post/PostComponent.vue';
import { onMounted } from 'vue';
import { usePostStore } from 'src/stores/post-store';
import { useUserStore } from 'src/stores/user-store';
import useNotify from 'src/composables/useNotify';

const postStore = usePostStore();
const userStore = useUserStore();
const notify = useNotify();

onMounted(async () => {
  await postStore.loadPosts();
});
</script>

<style scoped></style>
