<template>
  <q-card>
    <q-card-section>
      <div class="text-h6">{{ $t('heading.createOrUpdate.event') }}</div>
    </q-card-section>
    <q-card-section class="q-pt-none">
      <GroupsSelector
        :groups="event.event.groups"
        @GroupsUpdate="
          (groups) => {
            eventStore.newEvent.event.groups = groups;
            error.groups.show = false;
          }
        "
        :error="error.groups.show"
        :errorMessage="error.groups.text"
      />
    </q-card-section>
    <q-card-section>
      <q-form ref="form">
        <q-select
          v-model="event.event.type"
          :label="$t('form.input.type')"
          :options="eventTypeOptions"
          filled
          emit-value
          map-options
          options-dense
          :rules="[formRules.required]"
        >
        </q-select>
        <q-input
          :label="$t('form.input.price')"
          suffix=",-Kč"
          v-model="event.event.price"
          type="number"
        />
        <div class="row q-gutter-md">
          <q-input
            :label="$t('form.input.max.people')"
            v-model="event.event.people_limit"
            type="number"
          />
          <q-input
            :label="$t('form.input.max.substitutes')"
            v-model="event.event.substitues_limit"
            type="number"
          />
        </div>

        <q-input
          :label="$t('form.input.address.long')"
          v-model="event.event.address"
          :rules="[formRules.required]"
        >
          <template v-slot:append>
            <q-btn flat icon="place">
              <q-tooltip> {{ $t('find.on.maps') }} </q-tooltip>
            </q-btn>
          </template>
        </q-input>

        <q-input
          :label="$t('form.input.address.short')"
          v-model="event.event.address_short"
        />

        <q-input
          v-model="event.event.time"
          readonly
          :error="error.time.show"
          :error-message="error.time.text"
        >
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
              <q-tooltip> {{ $t('tooltip.set.date') }} </q-tooltip>
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
                  @update:model-value="() => (error.time.show = false)"
                >
                  <div class="row items-center justify-end">
                    <q-btn v-close-popup label="Close" color="primary" flat />
                  </div>
                </q-time>
              </q-popup-proxy>
              <q-tooltip> {{ $t('tooltip.set.time') }} </q-tooltip>
            </q-icon>
          </template>
        </q-input>

        <div v-if="isThisNewEvent" class="row justify-between">
          <q-toggle
            v-model="event.isPeriodic"
            :label="$t('is.periodic')"
          ></q-toggle>

          <q-input
            v-if="event.isPeriodic"
            v-model="event.period"
            :label="$t('weeks')"
            type="number"
            class="col-4"
          ></q-input>
        </div>

        <q-input
          v-model="event.event.description"
          :label="$t('event.description')"
          type="textarea"
        />
      </q-form>
    </q-card-section>

    <q-card-actions align="right">
      <q-btn label="Submit" color="primary" @click="createOrUpdateEvent()" />
    </q-card-actions>
  </q-card>
</template>

<script setup lang="ts">
import { computed, ref, reactive } from 'vue';
import GroupsSelector from '../forms/GroupsSelector.vue';
import { useEventStore } from 'src/stores/event-store';
import useNotify from 'src/composables/useNotify';
import { eventType } from 'src/types/dbTypes';
import formRules from 'src/helpers/formRules';
import { i18n } from 'src/utils/i18n';

const props = defineProps<{
  eventId: number;
}>();

const emit = defineEmits<{
  (event: 'close'): void;
  (event: 'shake'): void;
}>();

const eventStore = useEventStore();
const notify = useNotify();

const isThisNewEvent = computed(() => {
  return props.eventId === -1;
});

const event = ref(
  isThisNewEvent.value
    ? eventStore.newEvent
    : { event: JSON.parse(JSON.stringify(eventStore.getEvent(props.eventId))) } // kvůli stavbě eventStore.newEvent, kde je i perioda, která při editu není potřeba
);

const isLoading = ref(false);
const form = ref();
const error = reactive({
  time: {
    text: '',
    show: false,
  },
  groups: {
    text: '',
    show: false,
  },
});

async function createOrUpdateEvent() {
  //validate form
  if (!(await form.value.validate())) {
    notify.fail('form.not.valid');
    emit('shake');
    return;
  }
  if (!event.value.event.groups || event.value.event.groups.length === 0) {
    error.groups.show = true;
    error.groups.text = i18n.t('form.rules.groups');
    notify.fail(i18n.t('notify.missing.groups'));
    emit('shake');
    return;
  }
  isLoading.value = true;
  if (isThisNewEvent.value) {
    await eventStore.createEvent();
  } else {
    await eventStore.updateEvent(props.eventId, event.value.event);
  }
  isLoading.value = false;
  emit('close');
}

const eventTypeOptions = Object.entries(eventType).map(([key, value]) => ({
  label: value,
  value: key,
}));
</script>

<style scoped></style>
