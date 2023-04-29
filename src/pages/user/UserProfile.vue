<template>
  <div class="justify-center">
    <div class="row justify-center">
      <UserProfileInfo
        class="col-md-8 col-sm-12"
        v-if="userInitialized"
        :user="user"
      />
    </div>
    <div class="row justify-center">
      <PostsFeed
        :posts="filteredByAuthor"
        :feed-filter="true"
        class="col-md-8"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, computed } from 'vue';
import { useRoute } from 'vue-router';
import { useUserStore } from 'src/stores/user-store';
import { usePostStore } from 'src/stores/post-store';
import { Post_extended, User_extended } from 'src/types/dbTypes';
import UserProfileInfo from 'src/components/user/UserProfileInfo.vue';
import PostsFeed from 'src/components/feed/PostsFeed.vue';

const route = useRoute();
const userStore = useUserStore();
const postStore = usePostStore();

const user = ref({} as User_extended);
const userId = ref<number>();
const userInitialized = ref(false);

onMounted(async () => {
  userId.value = parseInt(route.params.userId as string);
  user.value = await userStore.getUser(userId.value);
  userInitialized.value = true;
});

const filteredByAuthor = computed(() => {
  return postStore.posts_sorted?.filter((post: Post_extended) => {
    // Filter by author (user)
    if (userId.value) {
      if (post.author.id === userId.value) return true;
    }
  });
});
</script>

<style scoped></style>
