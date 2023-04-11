<template>
  <q-dialog persistent maximized>
    <q-card class="bg-white">
      <q-bar>
        <q-space />
        <q-btn dense flat icon="close" v-close-popup>
          <q-tooltip class="bg-white text-primary">Close</q-tooltip>
        </q-btn>
      </q-bar>
      <q-table
        :title="$t('Attendance')"
        :loading="table.isLoading"
        :rows="table.rows"
        :columns="table.columns"
        row-key="id"
        :visible-columns="['present', 'full_name']"
        hide-pagination
      >
        <!-- PRESENT CHECKBOX -->
        <template v-slot:body-cell-present="props">
          <q-td :props="props" class="q-pa-none" style="width: 10px">
            <q-checkbox
              v-model="props.row.present"
              checked-icon="task_alt"
              :color="props.row.present ? 'green' : 'red'"
              unchecked-icon="highlight_off"
            />
          </q-td>
        </template>
      </q-table>
      <q-card-setion>
        <q-space />
        <q-btn label="Save" color="positive" v-close-popup />
      </q-card-setion>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { useEventStore } from 'src/stores/event-store';
import {
  Event_extended,
  UserOnEventStatus,
  User_extended,
} from 'src/types/dbTypes';
import { onBeforeUnmount, reactive, ref } from 'vue';
import useNotify from 'src/composables/useNotify';

const props = defineProps<{
  event: Event_extended;
}>();

const eventStore = useEventStore();
const notify = useNotify();

onBeforeUnmount(async () => {
  // save present status
  const notif = notify.wait('Saving attendance...');
  await eventStore.sendAttendance(props.event.id);
  notify.resolve_wait(notif);
});

const table = reactive({
  columns: [
    // array of Objects
    // column Object definition
    {
      name: 'present',
      label: 'present',
      field: 'present',
      align: 'left',
    },
    // unique id
    // identifies column
    {
      name: 'id',
      field: 'userId',
    },
    {
      name: 'full_name',
      label: 'Name',
      field: 'user',
      align: 'left',
      sortOrder: 'ad', // or 'da'
      format: (val: User_extended) => val.full_name,
    },
  ],
  rows: ref(
    props.event.players.filter((p) => p.status === UserOnEventStatus.going)
  ),
  isLoading: false,
  searchCol: '',
  searchfilter: '',
});
</script>

<style scoped></style>
