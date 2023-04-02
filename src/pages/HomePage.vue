<template>
  <q-page class="row justify-evenly">
    <q-page-sticky position="left" :offset="[18, 0]">
      <FeedFilter class="q-ma-none" />
    </q-page-sticky>

    <PostsFeed :posts="displayedPosts" class="col-6" @edit-post="editPost" />
  </q-page>
</template>

<script setup lang="ts">
import PostsFeed from 'src/components/feed/PostsFeed.vue';
import FeedFilter from 'src/components/feed/post/filter/FeedFilter.vue';
import { onMounted, computed } from 'vue';
import { usePostStore } from 'src/stores/post-store';

const emit = defineEmits<{
  (event: 'edit-post', postIt: number): void;
}>();

const postStore = usePostStore();

onMounted(async () => {
  await postStore.loadPosts();
});

const displayedPosts = computed(() => {
  return postStore.posts_sorted?.filter((post) => {
    // Filter by Type
    if (postStore.postTypeFilter[post.type] === true) {
      for (const group of post.groups) {
        if (
          postStore.groupsFilter.find((o) => o.group.id === group.id)
            ?.visible === true
        ) {
          return true;
        }
      }
    }
    // Filter by Group
  });
});

function editPost(postId: number) {
  emit('edit-post', postId);
}
</script>

<style></style>
