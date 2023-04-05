<template>
  <q-drawer side="right" bordered :width="200" :breakpoint="500">
    <q-scroll-area class="fit" visible>
      <q-infinite-scroll
        class="q-pa-sm q-gutter-sm"
        @load="fetchEvents"
        :disable="eventStore.areWeOnEventsFeedBedrock"
      >
        <EventComponent
          v-for="event in eventStore.chronologicEvents"
          :key="event.id"
          :event="event"
        />
      </q-infinite-scroll>
      <div v-if="eventStore.areWeOnEventsFeedBedrock">
        <div class="text-h6">No more events to see</div>
      </div>
    </q-scroll-area>
  </q-drawer>
</template>

<script setup lang="ts">
import { useEventStore } from 'src/stores/event-store';
import EventComponent from './EventComponent.vue';

const eventStore = useEventStore();

const limit = 10;

async function fetchEvents(index: number, done: () => void) {
  await eventStore.loadEvents(index, limit);
  done();
}
</script>

<style scoped></style>
