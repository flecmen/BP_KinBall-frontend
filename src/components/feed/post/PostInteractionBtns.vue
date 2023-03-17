<template>
  <q-card-section class="flex justify-between">
    <q-btn
      flat
      icon="favorite"
      label="Like"
      @click="postStore.likePost(props.post.id)"
    >
      <q-badge color="orange" floating>{{ props.post.likes.length }}</q-badge>
    </q-btn>
    <q-btn flat icon="comment" label="Comment" />
    <q-toggle v-model="isFollowing" flat label="Follow" />
  </q-card-section>
</template>

<script setup lang="ts">
import { defineProps, ref } from 'vue';
import { Post_extended } from 'src/types/dbTypes';
import { usePostStore } from 'src/stores/post-store';

export interface Props {
  post: Post_extended;
  isMobile: boolean;
}
const props = defineProps<Props>();
const postStore = usePostStore();

const isFollowing = ref<boolean>(false);
</script>

<style scoped></style>
