<template>
  <div class="q-pa-md">
    <q-table
      :title="$t('My Events')"
      rows-per-page-label="15"
      :loading="table.isLoading"
      :rows="table.rows"
      :columns="table.columns"
      row-key="id"
      :visible-columns="[
        'edit',
        'time',
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
            @click="showEventModal(props.row.id)"
          ></q-btn>
        </q-td>
      </template>
    </q-table>
  </div>
</template>

<script setup lang="ts">
import { reactive, onMounted, computed } from 'vue';
import { useEventStore } from 'src/stores/event-store';
import dateTimeFormat from 'src/helpers/dateTimeFormat';

const eventStore = useEventStore();

onMounted(async () => {
  table.isLoading = true;
  table.isLoading = false;
});

const isLoading = reactive({
  deleteBtn: false,
  editBtn: false,
});

function showEventModal(id: number) {
  //eventStore.showEventModal(id);
}

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
    return eventStore.events.filter((event) => {
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
