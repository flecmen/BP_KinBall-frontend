<template>
  <q-chip
    id="Event_add_to_calendar"
    clickable
    color="primary"
    text-color="white"
    icon="event"
    :label="$t('Add.to.calendar')"
    @click="openGoogle()"
  />
</template>

<script setup lang="ts">
import { Event_extended } from 'src/types/dbTypes';
import openGoogleCalendar from 'src/helpers/googleCalendar';

const props = defineProps<{
  event: Event_extended;
}>();

function openGoogle() {
  openGoogleCalendar(props.event, window);
}
</script>

<style scoped></style>
