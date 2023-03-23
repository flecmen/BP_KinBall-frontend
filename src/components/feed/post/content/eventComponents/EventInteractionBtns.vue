<template>
  <div class="text-h6" @mouseover="showGoing" @mouseleave="hideGoing">
    Přihlášeno:
    {{
      eventStore
        .getEvent(props.eventId)
        ?.players.filter((ue) => ue.status === UserOnEventStatus.going).length
    }}/{{ eventStore.getEvent(props.eventId)?.people_limit }}

    <UserPopupList
      :isMobile="true"
      :players="eventStore.getEvent(props.eventId)?.players"
      :visible="areGoingVisible"
      @mouseover="showGoing"
      @mouseleave="hideGoing"
    />
  </div>

  <div class="row justify-evenly q-mt-md">
    <q-btn label="Going" @click="going()" color="green-5"> </q-btn>
    <q-btn label="Don't know" @click="going()" color="orange"></q-btn>
    <q-btn label="Not going" @click="going()" color="red"></q-btn>
  </div>
</template>

<script setup lang="ts">
import { Event_extended, UserOnEventStatus } from 'src/types/dbTypes';
import { useEventStore } from 'src/stores/event-store';
import { ref } from 'vue';
import UserPopupList from 'src/components/lists/UserPopupList.vue';

export interface Props {
  eventId: Event_extended['id'];
  isMobile: boolean;
}
const props = defineProps<Props>();

const eventStore = useEventStore();

const areGoingVisible = ref(false);

function showGoing() {
  areGoingVisible.value = true;
}

function hideGoing() {
  areGoingVisible.value = false;
}

function going() {
  console.log('ahoj');
  return;
}
</script>

<style scoped></style>
