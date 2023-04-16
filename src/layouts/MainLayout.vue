<template>
  <q-layout view="lHh Lpr lFf">
    <NavBar @toggle-left-drawer="toggleLeftDrawer()" />
    <LeftDrawer v-model="leftDrawerOpen" />

    <PostModal
      v-if="postStore.isPostDialogVisible"
      v-model="postStore.isPostDialogVisible"
      :postId_to_edit="postStore.postId_to_edit"
    />
    <NewEventModal
      v-if="eventStore.isEventDialogVisible"
      :eventId="eventStore.eventId_to_edit"
      v-model="eventStore.isEventDialogVisible"
    />
    <router-view name="rightDrawer" />
    <EventListDrawer v-model="isRightDrawerVisible" />

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import NavBar from 'src/components/navBar/NavBar.vue';
import LeftDrawer from 'src/components/navBar/LeftDrawer.vue';
import PostModal from 'src/components/modals/PostModal.vue';
import NewEventModal from 'src/components/modals/NewEventModal.vue';
import EventListDrawer from 'src/components/feed/eventList/eventListDrawer.vue';
import { usePostStore } from 'src/stores/post-store';
import { useEventStore } from 'src/stores/event-store';
import breakpoints from 'src/helpers/breakpoints';
import { useQuasar } from 'quasar';

const postStore = usePostStore();
const eventStore = useEventStore();

const leftDrawerOpen = ref(false);

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}

const isRightDrawerVisible = computed(() => {
  return (
    eventStore.isRightDrawerVisible ||
    breakpoints.isMoreThan(useQuasar(), breakpoints.breakPoints.xs.upper)
  );
});
</script>
