<template>
  <q-card flat>
    <q-card-section class="row justify-between">
      <div class="col-6">
        <div class="text-h6">
          Čas: {{ dateFormat(eventStore.getEvent(props.eventId)?.time) }}
        </div>
        <div class="text-h6">
          <q-icon name="location_on" color="red" />{{
            eventStore.getEvent(props.eventId)?.address_short
          }}
        </div>
        <div class="text-h6">
          {{ eventStore.getEvent(props.eventId)?.organiser.full_name }}
        </div>
      </div>

      <EventPrice :price="eventStore.getEvent(props.eventId)?.price" />
    </q-card-section>

    <q-separator />

    <q-card-section align="left">
      <EventInteractionBtns
        :eventId="props.eventId"
        :isMobile="props.isMobile"
      />
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
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

const eventStore = useEventStore();

onMounted(() => {
  eventStore.loadEvent(props.eventId);
  isEventLoading.value = false;
});

const isEventLoading = ref(true);

async function going() {
  return;
}
</script>

<style scoped></style>
