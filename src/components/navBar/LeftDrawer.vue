<template>
  <q-drawer bordered :width="200" :breakpoint="1">
    <q-list>
      <q-item-label header> Menu </q-item-label>
      <EssentialLink
        v-for="button in navButtons"
        :key="button.title"
        :label="$t(button.title)"
        v-bind="button"
        :handler="button.handler"
      />
    </q-list>
  </q-drawer>
</template>

<script setup lang="ts">
import EssentialLink from 'src/components/navBar/buttons/leftDrawerButton.vue';
import { buttons, NavigationButton } from 'src/data/navigationButtons';
import { computed } from 'vue';
import { useUserStore } from 'src/stores/user-store';

const userStore = useUserStore();

const navButtons = computed(() => {
  return buttons.filter((button: NavigationButton) =>
    button.roles.includes(userStore.user.role)
  );
});
</script>

<style scoped></style>
