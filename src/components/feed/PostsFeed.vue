<template>
  <div v-if="displayedPosts !== undefined">
    <div v-if="displayedPosts.length > 0">
      <PostComponent
        v-for="post in displayedPosts"
        v-bind:key="post.id"
        :post="post"
      />
    </div>
    <div v-else>
      <q-card class="q-mt-md">
        <q-card-section>
          <div class="text-h5 text-center">
            No posts to display. Try changing the filters.
          </div>
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import PostComponent from './post/PostComponent.vue';
import { onMounted, computed } from 'vue';
import { usePostStore } from 'src/stores/post-store';
import { useUserStore } from 'src/stores/user-store';
import useNotify from 'src/composables/useNotify';

const postStore = usePostStore();
const userStore = useUserStore();
const notify = useNotify();

onMounted(async () => {
  await postStore.loadPosts();
});

const displayedPosts = computed(() => {
  return postStore.posts?.filter((post) => {
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
</script>

<style scoped></style>
