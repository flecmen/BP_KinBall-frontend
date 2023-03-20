<template>
  <q-item>
    <q-item-section avatar>
      <q-avatar :size="isMobile ? '40px' : '50px'">
        <img src="src/assets/avatar.jpg" alt="avatar" />
      </q-avatar>
    </q-item-section>
    <q-item-section>
      <div class="post-name text-bold">
        {{ props.post.author.full_name }}
      </div>
      <div class="text-caption">
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

export interface Props {
  post: Post_extended;
  isMobile: boolean;
}
const props = defineProps<Props>();
</script>

<style scoped></style>
