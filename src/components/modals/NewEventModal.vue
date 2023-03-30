<template>
  <q-dialog>
    <q-card>
      <q-card-section>
        <div class="text-h6">Create a new event</div>
      </q-card-section>
      <q-card-section class="q-pt-none">
        <GroupsSelector
          :groups="eventStore.newEvent.event.groups"
          @GroupsUpdate="updateGroups"
        />
      </q-card-section>
      <q-card-section>
        <NewEventForm />
      </q-card-section>

      <q-card-actions align="right">
        <q-btn
          label="Submit"
          color="primary"
          @click="eventStore.createEvent()"
          v-close-popup
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import GroupsSelector from '../forms/GroupsSelector.vue';
import NewEventForm from '../forms/NewEventForm.vue';
import { useEventStore } from 'src/stores/event-store';
import { Event_extended } from 'src/types/dbTypes';

const eventStore = useEventStore();

function updateGroups(groups: Event_extended['groups']) {
  eventStore.newEvent.event.groups = groups;
}
</script>

<style scoped></style>
