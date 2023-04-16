<template>
  <q-item class="justify-end q-gutter-sm" dense>
    <q-icon
      name="edit"
      size="xs"
      color="primary"
      class="click-cursor"
      @click="postStore.openPostDialog(props.post.id)"
    >
      <q-tooltip>edit post</q-tooltip>
    </q-icon>
    <q-icon name="delete" size="xs" color="red" class="click-cursor">
      <q-tooltip>delete post</q-tooltip>
      <q-menu auto-close>
        <q-card class="my-card">
          <q-card-section class="bg-primary text-white">
            <div class="text">Are you sure to remove post permanently?</div>
          </q-card-section>

          <q-card-actions align="right">
            <q-btn
              flat
              color="white"
              class="bg-red"
              @click="postStore.deletePost(props.post.id)"
              >Delete</q-btn
            >
          </q-card-actions>
        </q-card>
      </q-menu>
    </q-icon>
  </q-item>
</template>

<script setup lang="ts">
import { usePostStore } from 'src/stores/post-store';
import { Post_extended } from 'src/types/dbTypes';

export interface Props {
  post: Post_extended;
  isMobile: boolean;
}
const props = defineProps<Props>();

const postStore = usePostStore();
</script>

<style scoped>
.click-cursor {
  cursor: pointer;
}
</style>
