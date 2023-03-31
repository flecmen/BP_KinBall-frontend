<template>
  <q-layout view="lHh Lpr lFf">
    <NavBar
      @toggle-left-drawer="toggleLeftDrawer()"
      @openCreatePostDialog="openPostDialog()"
      @openCreateEventDialog="openEventDialog()"
    />
    <LeftDrawer v-model="leftDrawerOpen" />
    <NewPostModal v-model="isNewPostDialogVisible" />
    <NewEventModal v-model="isNewEventDialogVisible" />

    <EventListDrawer v-model="rightDrawerOpen" />

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import NavBar from 'src/components/navBar/NavBar.vue';
import LeftDrawer from 'src/components/LeftDrawer.vue';
import NewPostModal from 'src/components/modals/NewPostModal.vue';
import NewEventModal from 'src/components/modals/NewEventModal.vue';
import EventListDrawer from 'src/components/feed/eventList/eventListDrawer.vue';

const leftDrawerOpen = ref(false);
const isNewPostDialogVisible = ref(false);
const isNewEventDialogVisible = ref(false);

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}

function openPostDialog() {
  isNewPostDialogVisible.value = !isNewPostDialogVisible.value;
}

function openEventDialog() {
  isNewEventDialogVisible.value = !isNewEventDialogVisible.value;
}

const rightDrawerOpen = ref(true);
</script>
