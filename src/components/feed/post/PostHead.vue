<template>
  <q-item class="justify-end q-gutter-sm" dense>
    <q-icon
      name="edit"
      size="xs"
      color="primary"
      class="click-cursor"
      @click="emit('edit-post', post.id)"
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
  <q-item>
    <q-item-section avatar>
      <user-avatar
        :image="props.post.author.profile_picture"
        :isMobile="props.isMobile"
      />
    </q-item-section>
    <q-item-section>
      <UserName :user="props.post.author" />
      <div class="text-caption">
        <RoleChip :user="props.post.author" />
        {{ dateFormat(props.post.time_of_creation) }}
      </div>
    </q-item-section>
    <q-item-section side>
      <q-badge
        v-for="group in props.post.groups"
        v-bind:key="group.id"
        :color="group.color ?? 'primary'"
        text-color="white"
        >{{ group.name }}</q-badge
      >
    </q-item-section>
  </q-item>
  <q-item>
    <div class="text-h5 q-ml-none">{{ props.post.heading }}</div>
  </q-item>
</template>

<script setup lang="ts">
import dateFormat from 'src/helpers/dateFormat';
import { defineProps } from 'vue';
import { Post_extended } from 'src/types/dbTypes';
import userAvatar from 'src/components/userAvatar.vue';
import RoleChip from 'src/components/RoleChip.vue';
import UserName from './components/UserName.vue';
import { usePostStore } from 'src/stores/post-store';

export interface Props {
  post: Post_extended;
  isMobile: boolean;
}
const props = defineProps<Props>();

const emit = defineEmits<{
  (event: 'edit-post', postIt: Post_extended['id']): void;
}>();

const postStore = usePostStore();
</script>

<style scoped>
.click-cursor {
  cursor: pointer;
}
</style>
