<template>
  <q-layout view="lHh Lpr lFf">
    <NavBar @toggle-left-drawer="toggleLeftDrawer()" />
    <LeftDrawer v-model="leftDrawerOpen" />

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import NavBar from 'src/components/navBar/NavBar.vue';
import LeftDrawer from 'src/components/LeftDrawer.vue';

const leftDrawerOpen = ref(false);
console.log(leftDrawerOpen.value);

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}
</script>
