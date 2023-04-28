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
          v-for="button in navButtons"
          :key="button.title"
          :label="button.title"
          :icon="button.icon"
          flat
          dense
          @click="button.handler"
        />
      </div>
      <q-toolbar-title> </q-toolbar-title>
      <UserLevelIndicator />
      <div>
        <LanguageButton />
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
import { useUserStore } from 'src/stores/user-store';
import { useEventStore } from 'src/stores/event-store';
import { useRouter } from 'vue-router';
import breakpoints from 'src/helpers/breakpoints';
import { buttons, NavigationButton } from 'src/data/navigationButtons';
import UserLevelIndicator from './UserLevelIndicator.vue';
import { computed } from 'vue';

const userStore = useUserStore();
const eventStore = useEventStore();
const router = useRouter();

function logout() {
  userStore.logout();
  router.push({ name: 'login' });
}

const navButtons = computed(() => {
  return buttons.filter((button: NavigationButton) =>
    button.roles.includes(userStore.user.role)
  );
});

const emit = defineEmits<{
  (event: 'toggleLeftDrawer'): void;
  (event: 'installApp'): void;
}>();
</script>
