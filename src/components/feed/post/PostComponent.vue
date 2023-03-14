<template>
  <q-card class="post">
    <q-card-section class="post-header">
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
          <div class="post-info q-ml-sm">
            {{ dateFormat(props.post.time_of_creation) }}
          </div>
        </q-item-section>
        <q-item-section side>
          <q-badge
            v-for="group in props.post.groups"
            v-bind:key="group.id"
            :color="group.color ?? 'gray'"
            text-color="white"
            >{{ group.name }}</q-badge
          >
        </q-item-section>
      </q-item>
    </q-card-section>
    <q-separator />
    <q-card-section class="post-content">
      {{ props.post.text }}
    </q-card-section>
    <q-separator />
    <q-card-section class="flex justify-between">
      <q-btn flat icon="favorite" label="Like" />
      <q-btn flat icon="comment" label="Comment" />
      <q-toggle flat label="Follow" />
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
import { defineProps, computed } from 'vue';
import { useQuasar } from 'quasar';
import { Post_extended } from 'src/types/dbTypes';
import dateFormat from 'src/helpers/dateFormat';

export interface Props {
  post: Post_extended;
}
const props = defineProps<Props>();

const $q = useQuasar();
const isMobile = computed(() => $q.screen.xs || $q.screen.sm);
</script>

<style scoped>
.post {
  margin: 10px;
}

.post-name {
  font-weight: bold;
}

.post-content {
  margin-top: 10px;
}
</style>
