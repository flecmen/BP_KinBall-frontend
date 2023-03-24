<template>
  <q-layout view="lHh Lpr lFf">
    <NavBar
      @toggle-left-drawer="toggleLeftDrawer()"
      @openCreatePostDialog="openPostDialog()"
    />
    <LeftDrawer v-model="leftDrawerOpen" />
    <NewPostModal v-model="createPostDialogOpen" />
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

const leftDrawerOpen = ref(false);
const createPostDialogOpen = ref(false);

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}

function openPostDialog() {
  createPostDialogOpen.value = !createPostDialogOpen.value;
}
</script>
