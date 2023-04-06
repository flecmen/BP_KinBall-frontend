<template>
  <q-dialog ref="dialog">
    <q-card>
      <q-card-section>
        <div class="text-h6">Create or update event</div>
      </q-card-section>
      <q-card-section class="q-pt-none">
        <GroupsSelector
          :groups="event.event.groups"
          @GroupsUpdate="updateGroups"
        />
      </q-card-section>
      <q-card-section>
        <q-form>
          <q-select
            v-model="event.event.type"
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
            v-model="event.event.price"
            type="number"
          />
          <div class="row q-gutter-md">
            <q-input
              label="Max people"
              v-model="event.event.people_limit"
              type="number"
            />
            <q-input
              label="Max substitutes"
              v-model="event.event.substitues_limit"
              type="number"
            />
          </div>

          <q-input
            label="Address"
            v-model="event.event.address"
            :rules="[formRules.required]"
          >
            <template v-slot:append>
              <q-btn flat icon="place">
                <q-tooltip> Find on maps </q-tooltip>
              </q-btn>
            </template>
          </q-input>

          <q-input label="Address alias" v-model="event.event.address_short" />
          <q-input v-model="event.event.time" readonly>
            <template v-slot:prepend>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy
                  cover
                  transition-show="scale"
                  transition-hide="scale"
                >
                  <q-date
                    v-model="event.event.time"
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
                <q-popup-proxy
                  cover
                  transition-show="scale"
                  transition-hide="scale"
                >
                  <q-time
                    v-model="event.event.time"
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
          <div v-if="isThisNewEvent" class="row justify-between">
            <q-toggle v-model="event.isPeriodic" label="is periodic"></q-toggle>

            <q-input
              v-if="event.isPeriodic"
              v-model="event.period"
              label="weeks"
              type="number"
              class="col-4"
            ></q-input>
          </div>

          <q-input
            v-model="event.event.description"
            label="Description"
            type="textarea"
          />
        </q-form>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn
          label="Submit"
          color="primary"
          @click="createOrUpdateEvent()"
          v-close-popup
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import GroupsSelector from '../forms/GroupsSelector.vue';
import { useEventStore } from 'src/stores/event-store';
import { eventType } from 'src/types/dbTypes';
import formRules from 'src/helpers/formRules';
import { Event_extended } from 'src/types/dbTypes';
const props = defineProps<{
  eventId: number;
}>();

const eventStore = useEventStore();

const isThisNewEvent = computed(() => {
  return props.eventId === -1;
});

const event = ref(
  isThisNewEvent.value
    ? eventStore.newEvent
    : { event: JSON.parse(JSON.stringify(eventStore.getEvent(props.eventId))) } // kvůli stavbě eventStore.newEvent, kde je i perioda, která při editu není potřeba
);

const isLoading = ref(false);
const dialog = ref();

function updateGroups(groups: Event_extended['groups']) {
  eventStore.newEvent.event.groups = groups;
}

async function createOrUpdateEvent() {
  isLoading.value = true;
  if (isThisNewEvent.value) {
    await eventStore.createEvent();
  } else {
    await eventStore.updateEvent(event.value);
  }
}

const eventTypeOptions = Object.entries(eventType).map(([key, value]) => ({
  label: value,
  value: key,
}));
</script>

<style scoped></style>
