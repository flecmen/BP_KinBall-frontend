<template>
  <q-form>
    <GroupsSelector
      :groups="postStore.newPost.groups"
      @GroupsUpdate="updateGroups"
    />
    <q-input v-model="postStore.newPost.heading" label="Heading" />
    <q-input v-model="postStore.newPost.text" label="Text" type="textarea" />
  </q-form>
</template>

<script setup lang="ts">
import { usePostStore } from 'src/stores/post-store';
import { useUserStore } from 'src/stores/user-store';
import { onMounted, ref } from 'vue';
import GroupsSelector from './GroupsSelector.vue';
import { Group } from 'src/types/dbTypes';

const postStore = usePostStore();
const userStore = useUserStore();

function updateGroups(groups: Group[]) {
  postStore.newPost.groups = groups;
}
</script>

<style scoped></style>
