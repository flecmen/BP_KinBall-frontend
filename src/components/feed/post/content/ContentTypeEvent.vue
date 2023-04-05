<template>
  <q-card flat v-if="event">
    <q-card-section class="row justify-between">
      <div class="col-6">
        <div class="text-h6">Čas: {{ dateFormat(event?.time) }}</div>
        <div class="text-h6">
          <q-icon name="location_on" color="red" />{{ event?.address_short }}
        </div>
        <div class="text-h6">
          {{ event?.organiser.full_name }}
        </div>
      </div>

      <EventPrice :price="event?.price" />
    </q-card-section>

    <q-separator />

    <q-card-section align="left">
      <EventInteractionBtns
        :eventId="props.eventId"
        :isMobile="props.isMobile"
      />
    </q-card-section>
  </q-card>
  <q-card flat v-else>
    <q-card-section>
      <div class="text-h6">Loading...</div>
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { Event_extended } from 'src/types/dbTypes';
import { useEventStore } from 'src/stores/event-store';
import dateFormat from 'src/helpers/dateFormat';
import EventPrice from './eventComponents/EventPrice.vue';
import EventInteractionBtns from './eventComponents/EventInteractionBtns.vue';

export interface Props {
  eventId: Event_extended['id'];
  isMobile: boolean;
}
const props = defineProps<Props>();

// const emit = defineEmits<{
//   (event: 'edit-post', postIt: Post_extended['id']): void;
// }>();

const eventStore = useEventStore();

const event = computed(() => {
  return eventStore.getEvent(props.eventId);
});
</script>

<style scoped></style>
