<template>
  <EditPost
    v-if="userStore.isAuthorizedToEdit(post.authorId)"
    :post="post"
    :isMobile="isMobile"
  />

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
        {{ dateFormat(props.post.time_of_creation) }}
      </div>
    </q-item-section>
    <q-item-section class="q-gutter-xs" side>
      <GroupChip
        v-for="group in props.post.groups"
        v-bind:key="group.id"
        :group="group"
      />
    </q-item-section>
  </q-item>
  <q-item>
    <div class="text-h5 q-ml-none">{{ props.post.heading }}</div>
  </q-item>
</template>

<script setup lang="ts">
import dateFormat from 'src/helpers/dateFormat';
import { Post_extended } from 'src/types/dbTypes';
import userAvatar from 'src/components/images/userAvatar.vue';
import UserName from './components/UserName.vue';
import GroupChip from 'src/components/GroupChip.vue';
import EditPost from './components/EditPost.vue';
import { useUserStore } from 'src/stores/user-store';

export interface Props {
  post: Post_extended;
  isMobile: boolean;
}
const props = defineProps<Props>();

const userStore = useUserStore();
</script>

<style scoped></style>
