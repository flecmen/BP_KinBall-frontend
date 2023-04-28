<template>
  <q-layout view="lHh Lpr lFf" style="background-color: #f0f2f5">
    <NavBar @toggle-left-drawer="toggleLeftDrawer()" @installApp="installApp" />
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

    <router-view
      class="view right-sidebar"
      name="RightSidebar"
      v-model="isRightDrawerVisible"
    ></router-view>

    <q-page-container class="bg-gray">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { computed, ref, onMounted } from 'vue';
import NavBar from 'src/components/navBar/NavBar.vue';
import LeftDrawer from 'src/components/navBar/LeftDrawer.vue';
import PostModal from 'src/components/modals/PostModal.vue';
import NewEventModal from 'src/components/modals/NewEventModal.vue';
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

// PWA stuff
const deferredPrompt = ref<Event>();

onMounted(async () => {
  window.addEventListener('beforeinstallprompt', (e) => {
    console.log(e);
    e.preventDefault();

    deferredPrompt.value = e;
  });
});

// const pwaIsInstalled = computed(() => {
//   if (window.matchMedia('(display-mode: standalone)').matches) {
//     console.log('this is standalone');
//     return true;
//   }
//   console.log('this is not standalone');
//   return false;
// });

const installApp = async () => {
  if (deferredPrompt.value) {
    deferredPrompt.value.prompt();
    const { outcome } = await deferredPrompt.value.userChoice;
    if (outcome === 'accepted') {
      console.log('User accepted the A2HS prompt');
    } else {
      console.log('User dismissed the A2HS prompt');
    }
  }
};
</script>
