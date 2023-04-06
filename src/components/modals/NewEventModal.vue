<template>
  <q-dialog ref="dialog">
    <EventForm :eventId="props.eventId" @close="dialog.close()" />
  </q-dialog>
</template>

<script setup lang="ts">
import EventForm from '../forms/EventForm.vue';
import { ref } from 'vue';
const props = defineProps<{
  eventId: number;
}>();

const dialog = ref();
</script>

<style scoped></style>
