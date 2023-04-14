<template>
  <div class="q-pa-md">
    <q-table
      :title="$t('My Events')"
      rows-per-page-label="15"
      :loading="table.isLoading"
      :rows="table.rows"
      :columns="table.columns"
      v-model:pagination="pagination"
      row-key="id"
      :visible-columns="[
        'edit',
        'time',
        'signed_up',
        'type',
        'address',
        'people_limit',
        'substitues_limit',
        'groups',
      ]"
    >
      <!-- SEARCH BAR -->
      <template v-slot:top-right>
        <div class="q-gutter-md row items-start">
          <q-input
            borderless
            dense
            dev
            debounce="300"
            v-model="table.searchfilter"
            placeholder="Search"
          >
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>
        </div>
      </template>

      <!-- EDIT AND DELETE -->
      <template v-slot:body-cell-edit="props">
        <q-td :props="props" class="justify-center">
          <q-btn dense flat round color="red-5" icon="delete">
            <q-menu auto-close>
              <q-card class="my-card">
                <q-card-section class="bg-primary text-white">
                  <div class="text">
                    {{ $t('Are you sure to permanently delete this event?') }}
                  </div>
                </q-card-section>
                <q-card-actions align="right">
                  <q-btn
                    flat
                    color="white"
                    class="bg-red"
                    :label="$t('delete')"
                    :loading="isLoading.deleteBtn"
                    @click="eventStore.deleteEvent(props.row.id)"
                  ></q-btn>
                </q-card-actions>
              </q-card>
            </q-menu>
          </q-btn>
          <q-btn
            dense
            flat
            round
            color="grey"
            icon="edit"
            @click="emit('showEventModal', props.row.id)"
          ></q-btn>
        </q-td>
      </template>

      <!-- GROUPS -->
      <template v-slot:body-cell-groups="props">
        <q-td :props="props">
          <GroupChip
            v-for="group in props.row.groups"
            v-bind:key="group.id"
            :group="group"
          />
        </q-td>
      </template>
    </q-table>
  </div>
</template>

<script setup lang="ts">
import { reactive, onMounted, computed, ref } from 'vue';
import { useEventStore } from 'src/stores/event-store';
import GroupChip from 'src/components/GroupChip.vue';
import dateTimeFormat from 'src/helpers/dateTimeFormat';
import { UserOnEvent_extended } from 'src/types/dbTypes';

const emit = defineEmits<{
  (event: 'showEventModal', id?: number): void;
}>();

const eventStore = useEventStore();

onMounted(async () => {
  table.isLoading = true;
  await eventStore.loadMyEvents('future');
  table.isLoading = false;
});

const isLoading = reactive({
  deleteBtn: false,
  editBtn: false,
});

const pagination = ref({
  rowsPerPage: 15,
  page: 1,
  sortBy: 'name',
  descending: true,
});

const table = reactive({
  columns: [
    {
      name: 'edit',
      label: '',
      field: '',
      align: 'left',
    },
    {
      name: 'id',
      field: 'id',
    },
    {
      name: 'time',
      label: 'Date',
      field: 'time',
      align: 'left',
      format: (val: Date) => dateTimeFormat.dateTime(val),
    },
    {
      name: 'signed_up',
      label: 'Signed up',
      field: 'players',
      align: 'left',
      format: (UoE: UserOnEvent_extended[]) =>
        UoE.filter((u) => u.status === 'going').length,
    },
    {
      name: 'type',
      label: 'Type',
      field: 'type',
      align: 'left',
    },
    {
      name: 'address',
      label: 'Address',
      field: 'address',
      align: 'left',
    },
    {
      name: 'people_limit',
      label: 'People limit',
      field: 'people_limit',
      align: 'left',
    },
    {
      name: 'substitues_limit',
      label: 'Substitutes limit',
      field: 'substitues_limit',
      align: 'left',
    },
    {
      name: 'groups',
      label: 'Groups',
      field: 'groups',
      align: 'left',
    },
  ],
  rows: computed(() => {
    return eventStore.myEvents.filter((event) => {
      if (!table.searchfilter || table.searchfilter === '')
        return eventStore.events;
      return (
        event.time
          .toString()
          .toLowerCase()
          .includes(table.searchfilter.toLowerCase()) ||
        event.type.toLowerCase().includes(table.searchfilter.toLowerCase()) ||
        event.address
          .toLowerCase()
          .includes(table.searchfilter.toLowerCase()) ||
        event.groups
          .toString()
          .toLowerCase()
          .includes(table.searchfilter.toLowerCase()) ||
        event.address.toLowerCase().includes(table.searchfilter.toLowerCase())
      );
    });
  }),
  isLoading: true,
  searchCol: '',
  searchfilter: '',
});
</script>

<style scoped></style>
