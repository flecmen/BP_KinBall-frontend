<template>
  <q-drawer
    side="right"
    :width="200"
    :breakpoint="1"
    style="background-color: #f0f2f5"
  >
    <q-scroll-area class="fit" visible>
      <q-infinite-scroll
        class="q-pa-sm q-gutter-sm q-mr-md"
        @load="fetchEvents"
        :disable="eventStore.areWeOnEventsFeedBedrock"
      >
        <div class="row text-center">
          <q-chip
            square
            class="text-h6 bold col-12"
            color="primary"
            text-color="white"
            :label="$t('EventListDrawer.events')"
          ></q-chip>
        </div>
        <EventComponent
          v-for="event in eventStore.chronologicEvents"
          :key="event.id"
          :event="event"
        />
        <div v-if="eventStore.areWeOnEventsFeedBedrock">
          <div class="text-h6">{{ $t('EventListDrawer.noMoreEvents') }}</div>
        </div>
      </q-infinite-scroll>
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
