<template>
  <q-card flat v-if="event">
    <q-card-section class="row justify-between">
      <div class="col-10">
        <!-- Date -->
        <div class="row items-center">
          <div id="Event_date" class="text-h6">
            {{ $t('event.date') }}: {{ dateTimeFormat.date(event.time) }}
          </div>
        </div>
        <!-- Time -->
        <div class="text-h6">
          {{ $t('event.time') }}: {{ dateTimeFormat.time(event.time) }}
        </div>
        <!-- Location -->
        <div class="text-h6">
          <div>{{ $t('event.address') }}: {{ event?.address }}</div>
          <div v-if="event?.address_short">
            {{ $t('event.location') }}: {{ event?.address_short }}
          </div>
        </div>
      </div>

      <EventPrice :price="event?.price" />
    </q-card-section>

    <q-card-section v-if="event?.description">
      <p>{{ event?.description }}</p>
    </q-card-section>

    <q-card-section>
      <!-- add to calendar -->
      <AddToCalendarButton
        v-if="event !== undefined"
        :event="event"
        class="row"
      />
      <!-- show on map -->
      <ShowOnMapButton
        :address="event.address"
        :lat="event.address_lat"
        :lng="event.address_lng"
      />
    </q-card-section>

    <q-separator />

    <q-card-section q-pa-none>
      <EventInteractionBtns
        :eventId="props.eventId"
        :isMobile="props.isMobile"
      />
    </q-card-section>
  </q-card>
  <q-card flat v-else>
    <q-card-section>
      <div class="text-h6">{{ $t('loading') }}...</div>
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { Event_extended } from 'src/types/dbTypes';
import { useEventStore } from 'src/stores/event-store';
import dateTimeFormat from 'src/helpers/dateTimeFormat';
import EventPrice from './eventComponents/EventPrice.vue';
import EventInteractionBtns from './eventComponents/EventInteractionBtns.vue';
import ShowOnMapButton from 'src/components/buttons/ShowOnMapButton.vue';
import AddToCalendarButton from 'src/components/buttons/AddToCalendarButton.vue';

export interface Props {
  eventId: Event_extended['id'];
  isMobile: boolean;
}
const props = defineProps<Props>();

const eventStore = useEventStore();

const event = computed(() => {
  return eventStore.getEvent(props.eventId);
});
</script>

<style scoped></style>
