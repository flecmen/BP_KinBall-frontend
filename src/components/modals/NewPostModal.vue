<template>
  <q-dialog>
    <q-card>
      <q-card-section>
        <div class="text-h6">Create a new post</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-radio
          v-model="postStore.newPost.type"
          :val="postType.text"
          :label="postType.text"
        />
        <q-radio
          v-model="postStore.newPost.type"
          :val="postType.survey"
          :label="postType.survey"
        />
      </q-card-section>
      <q-card-section class="q-pt-none">
        <GroupsSelector
          :groups="postStore.newPost.groups"
          @GroupsUpdate="updateGroups"
        />
      </q-card-section>

      <q-card-section class="q-pt-none">
        <newPostForm :type="postStore.newPost.type" />
      </q-card-section>

      <q-card-actions align="right">
        <q-btn
          label="Submit"
          color="primary"
          v-close-popup
          @click="postStore.postNewPost()"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { usePostStore } from 'src/stores/post-store';
import { postType, Group } from 'src/types/dbTypes';
import newPostForm from '../forms/newPostForm.vue';
import GroupsSelector from '../forms/GroupsSelector.vue';

const postStore = usePostStore();

function updateGroups(groups: Group[]) {
  postStore.newPost.groups = groups;
}
</script>

<style scoped></style>
