<template>
  <div>
    <q-card>
      <q-card-section>
        <div class="text-h6">Feed filter</div>
      </q-card-section>
      <q-card-section>
        <q-toggle
          v-for="filter in Object.keys(postStore.postTypeFilter)"
          v-bind:key="filter"
          :label="$t('post.type.' + filter)"
          v-model="postStore.postTypeFilter[filter]"
        />
      </q-card-section>
      <q-card-section>
        <q-chip
          v-for="group in postStore.groupsFilter"
          v-bind:key="group.group.id"
          :color="group.visible ? group.group.color || 'primary' : 'success'"
          text-color="white"
          clickable
          :selected="group.visible"
          @click="group.visible = !group.visible"
        >
          {{ group.group.name }}
        </q-chip>
      </q-card-section>
    </q-card>
  </div>
</template>

<script setup lang="ts">
import { Post_extended } from 'src/types/dbTypes';
import { usePostStore } from 'src/stores/post-store';
import { useUserStore } from 'src/stores/user-store';

const postStore = usePostStore();
const userStore = useUserStore();
</script>

<style scoped></style>
