<template>
  <div v-if="props.posts !== undefined">
    <div v-if="props.posts.length > 0">
      <q-infinite-scroll
        @load="postStore.loadPosts"
        :offset="500"
        :disable="postStore.areWeOnFeedBedrock"
      >
        <PostComponent
          v-for="post in props.posts"
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
import { onMounted } from 'vue';
import { usePostStore } from 'src/stores/post-store';
import { Post_extended } from 'src/types/dbTypes';

const props = defineProps<{
  posts: Post_extended[];
}>();

const postStore = usePostStore();

onMounted(async () => {
  postStore.initFeedFilter();
});
</script>
