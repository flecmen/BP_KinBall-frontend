<template>
  <q-btn
    id="Event_add_to_calendar"
    clickable
    color="grey-5"
    text-color="grey"
    icon="event"
    :label="$t('btn.add.to.calendar')"
    @click="openGoogle()"
    flat
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
