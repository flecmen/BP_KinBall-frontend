<template>
  <div v-if="displayedPosts !== undefined">
    <div v-if="displayedPosts.length > 0">
      <q-infinite-scroll
        @load="postStore.loadPosts"
        :offset="250"
        :disable="postStore.areWeOnFeedBedrock"
      >
        <PostComponent
          v-for="post in displayedPosts"
          v-bind:key="post.id"
          :post="post"
          class="post-component"
        />
        <template v-slot:loading>
          <div class="row justify-center q-my-md">
            <q-spinner-dots color="primary" size="40px" />
          </div>
        </template>
      </q-infinite-scroll>
      <!-- We are on bedrock message -->
      <q-card v-if="postStore.areWeOnFeedBedrock" class="q-mt-md" flat>
        <q-card-section>
          <div class="text-h5 text-center">
            No more posts to display. Try changing the filters.
          </div>
        </q-card-section>
      </q-card>
    </div>
    <!-- No posts to show message -->
    <div v-else>
      <q-card class="q-mt-md" flat>
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

const postStore = usePostStore();

onMounted(async () => {
  postStore.initFeedFilter();
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

if (displayedPosts.value.length > 0 && postStore.areWeOnFeedBedrock) {
  postStore.loadPosts();
}
</script>
