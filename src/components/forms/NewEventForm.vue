<template>
  <q-form>
    <q-select
      v-model="eventStore.newEvent.event.type"
      label="Type"
      :options="eventTypeOptions"
      filled
      emit-value
      map-options
      options-dense
      :rules="[formRules.required]"
    >
    </q-select>
    <q-input
      label="Price"
      suffix=",-Kč"
      v-model="eventStore.newEvent.event.price"
      type="number"
    />
    <div class="row q-gutter-md">
      <q-input
        label="Max people"
        v-model="eventStore.newEvent.event.people_limit"
        type="number"
      />
      <q-input
        label="Max substitutes"
        v-model="eventStore.newEvent.event.substitues_limit"
        type="number"
      />
    </div>

    <q-input
      label="Address"
      v-model="eventStore.newEvent.event.address"
      :rules="[formRules.required]"
    >
      <template v-slot:append>
        <q-btn flat icon="place"> <q-tooltip> Find on maps </q-tooltip> </q-btn>
      </template>
    </q-input>

    <q-input
      label="Address alias"
      v-model="eventStore.newEvent.event.address_short"
    />
    <q-input v-model="eventStore.newEvent.event.time" readonly>
      <template v-slot:prepend>
        <q-icon name="event" class="cursor-pointer">
          <q-popup-proxy cover transition-show="scale" transition-hide="scale">
            <q-date
              v-model="eventStore.newEvent.event.time"
              mask="DD.MM.YYYY HH:mm"
              no-unset
            >
              <div class="row items-center justify-end">
                <q-btn v-close-popup label="Close" color="primary" flat />
              </div>
            </q-date>
          </q-popup-proxy>
          <q-tooltip> Set a date </q-tooltip>
        </q-icon>
      </template>

      <template v-slot:append>
        <q-icon name="access_time" class="cursor-pointer">
          <q-popup-proxy cover transition-show="scale" transition-hide="scale">
            <q-time
              v-model="eventStore.newEvent.event.time"
              mask="DD.MM.YYYY HH:mm"
              format24h
            >
              <div class="row items-center justify-end">
                <q-btn v-close-popup label="Close" color="primary" flat />
              </div>
            </q-time>
          </q-popup-proxy>
          <q-tooltip> Set a time </q-tooltip>
        </q-icon>
      </template>
    </q-input>
    <div class="row justify-between">
      <q-toggle
        v-model="eventStore.newEvent.isPeriodic"
        label="is periodic"
      ></q-toggle>

      <q-input
        v-if="eventStore.newEvent.isPeriodic"
        v-model="eventStore.newEvent.period"
        label="weeks"
        type="number"
        class="col-4"
      ></q-input>
    </div>

    <q-input
      v-model="eventStore.newEvent.event.description"
      label="Description"
      type="textarea"
    />
  </q-form>
</template>

<script setup lang="ts">
import { useEventStore } from 'src/stores/event-store';
import { eventType } from 'src/types/dbTypes';
import formRules from 'src/helpers/formRules';

const eventStore = useEventStore();

const eventTypeOptions = Object.entries(eventType).map(([key, value]) => ({
  label: value,
  value: key,
}));
</script>

<style scoped></style>
