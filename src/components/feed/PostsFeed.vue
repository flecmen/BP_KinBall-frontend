<template>
  <div>
    <FeedFilter v-if="props.feedFilter" />
    <div v-if="props.posts !== undefined">
      <q-infinite-scroll
        ref="infiniteScroll"
        @load="fetchPosts"
        :disable="postStore.areWeOnFeedBedrock"
        class="q-pa-none"
      >
        <PostComponent
          v-for="post in displayedFilteredPosts"
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
  </div>
</template>

<script setup lang="ts">
import PostComponent from './post/PostComponent.vue';
import { onMounted, computed, ref, watch, reactive } from 'vue';
import { usePostStore } from 'src/stores/post-store';
import { Post_extended } from 'src/types/dbTypes';
import FeedFilter from './FeedFilter.vue';

const props = defineProps<{
  posts: Post_extended[];
  feedFilter: boolean;
}>();

const postStore = usePostStore();

onMounted(async () => {
  postStore.initFeedFilter();
});

const isVisible = reactive({
  feedFilter: props.feedFilter,
});

const displayedFilteredPosts = computed(() => {
  return props.posts?.filter((post) => {
    // Filter by Type
    if (postStore.postTypeFilter[post.type] === true) {
      // Filter by Group
      for (const group of post.groups) {
        if (
          postStore.groupsFilter.find((o) => o.group.id === group.id)
            ?.visible === true
        ) {
          return true;
        }
      }
    }
  });
});

const infiniteScroll = ref();
// Pokud kvůli filtrům zmizí všechny posty, infinite scroll se netriggerne
// Tak tu sledujeme počet zobrazených postů a pokud je 0, tak triggerujeme ručně
watch(
  () => displayedFilteredPosts.value.length,
  (newLength) => {
    if (newLength === 0 && !postStore.areWeOnFeedBedrock) {
      infiniteScroll.value.trigger();
    }
  }
);

async function fetchPosts(index: number, done: () => void) {
  await postStore.loadPosts();
  done();
}
</script>
