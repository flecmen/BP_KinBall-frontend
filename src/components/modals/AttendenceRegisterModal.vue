<template>
  <q-dialog persistent maximized>
    <q-card class="bg-white">
      <q-bar>
        <q-space />
        <q-btn dense flat icon="close" v-close-popup>
          <q-tooltip class="bg-white text-primary">{{
            $t('tooltip.close')
          }}</q-tooltip>
        </q-btn>
      </q-bar>
      <q-table
        :title="$t('admin.attendence')"
        :loading="table.isLoading"
        :rows="table.rows"
        :columns="table.columns"
        row-key="id"
        :visible-columns="['present', 'full_name']"
        hide-pagination
        :rows-per-page-options="[0]"
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
      <q-card-actions align="right">
        <q-space />
        <q-btn :label="$t('btn.save')" color="positive" v-close-popup />
      </q-card-actions>
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
import { i18n } from 'src/utils/i18n';

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
      label: i18n.t('present'),
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
      label: i18n.t('user.full_name'),
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
