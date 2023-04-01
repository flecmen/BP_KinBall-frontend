<template>
  <q-drawer side="right" bordered :width="200" :breakpoint="500">
    <q-scroll-area class="fit">
      <div class="q-pa-sm q-gutter-sm">
        <EventComponent
          v-for="event in eventStore.chronologicEvents"
          :key="event.id"
          :event="event"
        />
      </div>
    </q-scroll-area>
  </q-drawer>
</template>

<script setup lang="ts">
import { useEventStore } from 'src/stores/event-store';
import EventComponent from './EventComponent.vue';

const eventStore = useEventStore();
</script>

<style scoped></style>
