<template>
  <AttendenceRegisterModal
    v-if="isVisible.attendenceRegisterModal"
    v-model="isVisible.attendenceRegisterModal"
    :event="clickedEvent"
  />
  <div class="row q-pa-lg bg-blue">
    <div class="text-h3 text-white">{{ $t('admin.today') }}</div>
  </div>
  <div class="q-px-lg q-py-md">
    <q-timeline color="secondary">
      <q-timeline-entry
        v-for="event in todayEvents"
        v-bind:key="event.id"
        :title="event.address_short ? event.address_short : event.address"
        :subtitle="dateFormat(event.time)"
      >
        <div
          class="q-gutter-sm"
          style="
            display: flex;
            justify-content: space-between;
            max-width: 500px;
          "
        >
          <q-btn
            :label="$t('btn.set.attendence')"
            @click="showAttendenceModal(event.id)"
          />
          <q-btn :label="$t('btn.set.rewards')" />
          <q-btn :label="$t('btn.set.note')" />
        </div>
      </q-timeline-entry>
    </q-timeline>
  </div>
</template>

<script setup lang="ts">
import { useEventStore } from 'src/stores/event-store';
import { onMounted, reactive, ref, computed } from 'vue';
import useNotify from 'src/composables/useNotify';
import dateFormat from 'src/helpers/dateFormat';
import AttendenceRegisterModal from 'src/components/modals/AttendenceRegisterModal.vue';
import { Event_extended } from 'src/types/dbTypes';

const eventStore = useEventStore();
const notify = useNotify();

const isVisible = reactive({
  attendenceRegisterModal: false,
});
const clickedEvent = ref<Event_extended>();

function showAttendenceModal(eventId: number) {
  clickedEvent.value = eventStore.getEvent(eventId);
  isVisible.attendenceRegisterModal = true;
}

const todayEvents = computed(() => {
  return eventStore.myEvents.filter((event) => {
    return (
      new Date(event.time).getTime() > new Date().setHours(0, 0, 0, 0) &&
      new Date(event.time).getTime() < new Date().setHours(23, 59, 59, 999)
    );
  });
});

onMounted(async () => {
  // load my today's events
  const notif = notify.wait("Loading today's events...");
  await eventStore.loadMyEvents('today');
  notify.resolve_wait(notif);
});
</script>

<style scoped></style>
