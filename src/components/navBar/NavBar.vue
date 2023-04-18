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
        class="xs"
      />
      <q-item clickable :to="{ name: 'home' }">
        <q-avatar style="width: fit-content" square>
          <img src="src/assets/kin-ball_institut_logo2-300x112.png" />
        </q-avatar>
      </q-item>
      <div v-if="breakpoints.isMoreThan($q, breakpoints.breakPoints.xs.upper)">
        <q-btn
          v-for="button in navigationButtons"
          :key="button.title"
          :label="button.title"
          :icon="button.icon"
          flat
          dense
          @click="button.handler"
        />
      </div>
      <q-toolbar-title> </q-toolbar-title>

      <div>
        <LanguageButton />
        <NotificationButton />
        <AccountCirleButton
          @logout="logout()"
          @settings="router.push({ name: 'user-settings' })"
          @installApp="emit('installApp')"
        />
      </div>
      <q-btn
        flat
        dense
        round
        icon="date_range"
        aria-label="Menu"
        @click="eventStore.toggleRightDrawer()"
        class="xs"
      />
    </q-toolbar>
  </q-header>
</template>

<script setup lang="ts">
import AccountCirleButton from 'src/components/navBar/buttons/AccoutCircleButton.vue';
import LanguageButton from './buttons/LanguageButton.vue';
import NotificationButton from './buttons/NotificationButton.vue';
import { useUserStore } from 'src/stores/user-store';
import { usePostStore } from 'src/stores/post-store';
import { useEventStore } from 'src/stores/event-store';
import { useRouter } from 'vue-router';
import breakpoints from 'src/helpers/breakpoints';
import navigationButtons from 'src/data/navigationButtons';

const userStore = useUserStore();
const postStore = usePostStore();
const eventStore = useEventStore();
const router = useRouter();

function logout() {
  userStore.logout();
  router.push({ name: 'login' });
}

const emit = defineEmits<{
  (event: 'toggleLeftDrawer'): void;
  (event: 'installApp'): void;
}>();
</script>
