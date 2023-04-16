<template>
  <q-layout view="lHh Lpr lFf">
    <NavBar @toggle-left-drawer="toggleLeftDrawer()" />
    <LeftDrawer v-model="leftDrawerOpen" />
    <PostModal
      v-if="isPostDialogVisible"
      v-model="isPostDialogVisible"
      :postId_to_edit="postId_to_edit"
    />
    <NewEventModal
      v-if="isEventDialogVisible"
      :eventId="eventId_to_edit"
      v-model="isEventDialogVisible"
    />

    <q-page-container>
      <router-view
        @edit-post="openPostDialog"
        @showEventModal="openEventDialog"
      />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import NavBar from 'src/components/navBar/NavBar.vue';
import LeftDrawer from 'src/components/navBar/LeftDrawer.vue';
import PostModal from 'src/components/modals/PostModal.vue';
import NewEventModal from 'src/components/modals/NewEventModal.vue';

const leftDrawerOpen = ref(false);
const isPostDialogVisible = ref(false);
const isEventDialogVisible = ref(false);

let postId_to_edit = ref(-1);
let eventId_to_edit = ref(-1);

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}

function openPostDialog(postId?: number) {
  if (postId) postId_to_edit.value = postId;
  else postId_to_edit.value = -1;
  isPostDialogVisible.value = !isPostDialogVisible.value;
}

function openEventDialog(eventId?: number) {
  if (eventId) eventId_to_edit.value = eventId;
  else eventId_to_edit.value = -1;
  isEventDialogVisible.value = !isEventDialogVisible.value;
}
</script>
