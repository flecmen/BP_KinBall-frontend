<template>
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

export interface Props {
  post: Post_extended;
  isMobile: boolean;
}
const props = defineProps<Props>();
</script>

<style scoped></style>
