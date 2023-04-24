<template>
  <q-card-section class="flex justify-between q-pb-none">
    <LikeButton
      :isBeingLiked="isBeingLiked"
      :likesCount="props.post.likes.length"
      :color="post.likes.some((u) => u.id === userStore.user.id) ? 'red' : ''"
      :showLikes="false"
      @like="likePost"
    />

    <q-btn flat icon="comment" @click="emit('showComments')">
      <q-tooltip>{{ $t('show.comments') }}</q-tooltip>
    </q-btn>
    <q-toggle v-model="isFollowing" flat label="Follow" />
  </q-card-section>
  <q-card-section class="row justify-between">
    <div class="">{{ props.post.likes.length }} {{ $t('likes') }}</div>
    <div class="">{{ props.post.comments.length }} {{ $t('comments') }}</div>
  </q-card-section>
</template>

<script setup lang="ts">
import { defineProps, ref } from 'vue';
import { Post_extended } from 'src/types/dbTypes';
import { usePostStore } from 'src/stores/post-store';
import { useUserStore } from 'src/stores/user-store';
import LikeButton from 'src/components/buttons/LikeButton.vue';

export interface Props {
  post: Post_extended;
  isMobile: boolean;
}
const props = defineProps<Props>();
const emit = defineEmits<{
  (event: 'showComments'): void;
}>();

const postStore = usePostStore();
const userStore = useUserStore();

const isBeingLiked = ref<boolean>(false);

//TODO: implement follow
const isFollowing = ref<boolean>(false);

async function likePost() {
  isBeingLiked.value = true;
  await postStore.likePost(props.post.id);
  isBeingLiked.value = false;
}
</script>

<style scoped></style>
