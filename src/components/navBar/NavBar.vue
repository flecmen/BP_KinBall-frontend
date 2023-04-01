<template>
  <q-header elevated>
    <q-toolbar>
      <q-btn
        flat
        dense
        round
        icon="menu"
        aria-label="Menu"
        @click="emit('toggleLeftDrawer')"
      />
      <q-item clickable :to="{ name: 'home' }">
        <q-avatar style="width: fit-content" square>
          <img src="src/assets/kin-ball_institut_logo2-300x112.png" />
        </q-avatar>
      </q-item>
      <q-btn label="Write a post" flat dense @click="openCreatePostDialog()" />
      <q-btn
        label="Create an event"
        flat
        dense
        @click="openCreateEventDialog()"
      />
      <q-btn label="Admin" flat dense @click="router.push({ name: 'admin' })" />

      <q-toolbar-title> </q-toolbar-title>

      <div>
        <LanguageButton />
        <NotificationButton />
        <AccountCirleButton @logout="logout()" />
      </div>
    </q-toolbar>
  </q-header>
</template>

<script setup lang="ts">
import AccountCirleButton from 'src/components/navBar/buttons/AccoutCircleButton.vue';
import LanguageButton from './buttons/LanguageButton.vue';
import NotificationButton from './buttons/NotificationButton.vue';
import { useUserStore } from 'src/stores/user-store';
import { usePostStore } from 'src/stores/post-store';
import { useRouter } from 'vue-router';

const userStore = useUserStore();
const postStore = usePostStore();
const router = useRouter();

function logout() {
  userStore.logout();
  router.push({ name: 'login' });
}

const emit = defineEmits<{
  (event: 'toggleLeftDrawer'): void;
  (event: 'openCreatePostDialog'): void;
  (event: 'openCreateEventDialog'): void;
}>();

function openCreatePostDialog() {
  postStore.initNewPost();
  emit('openCreatePostDialog');
}

function openCreateEventDialog() {
  emit('openCreateEventDialog');
}
</script>
