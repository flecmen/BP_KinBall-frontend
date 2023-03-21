<template>
  <div class="text-h6" @mouseover="showGoing">
    Přihlášeno:
    {{
      eventStore
        .getEvent(props.eventId)
        ?.players.filter((ue) => ue.status === UserOnEventStatus.going).length
    }}/{{ eventStore.getEvent(props.eventId)?.people_limit }}
  </div>
  <div class="q-pa-none q-ma-none" style="max-width: 350px">
    <q-list bordered>
      <q-item
        v-for="userEvent in eventStore.getEvent(props.eventId)?.players"
        v-bind:key="userEvent.userId"
        dense
        v-ripple
      >
        <q-item-section avatar>
          <q-icon color="primary" name="bluetooth" />
        </q-item-section>

        <q-item-section>{{ userEvent.user.full_name }}</q-item-section>
      </q-item>
    </q-list>
  </div>
  <div class="row justify-evenly">
    <q-btn label="I'm coming" @click="going()" color="green-5"></q-btn>
    <q-btn label="I don't know" @click="going()" color="orange"></q-btn>
    <q-btn label="I'm not coming" @click="going()" color="red"></q-btn>
  </div>
</template>

<script setup lang="ts">
import { Event_extended, UserOnEventStatus } from 'src/types/dbTypes';
import { useEventStore } from 'src/stores/event-store';
import { ref } from 'vue';

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

function going() {
  console.log('ahoj');
  return;
}
</script>

<style scoped></style>
