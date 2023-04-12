<template>
  <q-card>
    <q-card-section class="">
      <userProfilePicture :image="user.profile_picture" />
      <h2>{{ user.full_name }}</h2>
      <RoleChip :user="user" />
      <q-badge
        v-for="group in user.groups"
        v-bind:key="group.id"
        :color="group.color ?? 'primary'"
        text-color="white"
        >{{ group.name }}</q-badge
      >
    </q-card-section>
    <q-card-setion v-if="userInitialized">
      <RewardsOnProfile
        :xp="user.reward_system.xp"
        :maxXp="100"
        :level="user.reward_system.level"
        :awards="[]"
      />
    </q-card-setion>

    <q-card-section>
      <div class="user-profile-body"></div>
    </q-card-section>
  </q-card>
  <h5>User posts:</h5>
  <div class="row justify-evenly">
    <PostsFeed :posts="displayedPosts" class="col-10" />
  </div>
</template>

<script setup lang="ts">
import userProfilePicture from 'src/components/images/userProfilePicture.vue';
import { onMounted, ref, computed } from 'vue';
import { useRoute } from 'vue-router';
import { useUserStore } from 'src/stores/user-store';
import { usePostStore } from 'src/stores/post-store';
import { Post_extended, User_extended } from 'src/types/dbTypes';
import RoleChip from 'src/components/RoleChip.vue';
import PostsFeed from 'src/components/feed/PostsFeed.vue';
import RewardsOnProfile from 'src/components/rewards/RewardsOnProfile.vue';
import InstaIcon from 'src/components/icons/soc_media/instaIcon.vue';
import FbIcon from 'src/components/icons/soc_media/FbIcon.vue';

const route = useRoute();
const userStore = useUserStore();
const postStore = usePostStore();

const user = ref({} as User_extended);
let userId = ref<number>();
const userInitialized = ref(false);

onMounted(async () => {
  userId.value = parseInt(route.params.userId as string);
  user.value = await userStore.getUser(userId.value);
  userInitialized.value = true;
});

const displayedPosts = computed(() => {
  return postStore.posts_sorted?.filter((post: Post_extended) => {
    // Filter by author (user)
    if (userId.value) {
      if (post.author.id === userId.value) return true;
    }
  });
});
</script>

<style scoped></style>
