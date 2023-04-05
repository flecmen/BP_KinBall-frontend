<template>
  <q-drawer side="right" bordered :width="200" :breakpoint="500">
    <q-scroll-area class="fit">
      <q-infinite-scroll
        class="q-pa-sm q-gutter-sm"
        @load="eventStore.loadEvents"
        :disable="eventStore.areWeOnEventBedrock"
      >
        <EventComponent
          v-for="event in eventStore.chronologicEvents"
          :key="event.id"
          :event="event"
        />
      </q-infinite-scroll>
    </q-scroll-area>
  </q-drawer>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useEventStore } from 'src/stores/event-store';
import EventComponent from './EventComponent.vue';

const eventStore = useEventStore();

onMounted(() => {
  //eventStore.getEvents();
});
</script>

<style scoped></style>
