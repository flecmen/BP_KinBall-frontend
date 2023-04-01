<template>
  <q-card>
    <q-card-section>
      <div>{{ props.event.type }}</div>
      <div class="text-subtitle2">
        {{
          new Date(props.event.time).toLocaleDateString([], {
            day: '2-digit',
            month: '2-digit',
          })
        }}
        {{ $t(daysOfWeek[new Date(props.event.time).getDay()]) }}
        {{ new Date(props.event.time).toTimeString().slice(0, 5) }}
      </div>
      {{ props.event.address_short }}
    </q-card-section>
    <q-card-section>
      <q-chip
        clickable
        :color="
          selectedOption === 'going'
            ? 'positive'
            : selectedOption === 'not_going'
            ? 'negative'
            : selectedOption === 'dont_know'
            ? 'orange'
            : 'primary'
        "
        text-color="white"
        icon="expand_more"
      >
        {{ selectedOption || 'Select option' }}
        <q-menu auto-close>
          <q-list>
            <q-item
              v-for="option in options"
              :key="option"
              clickable
              @click="react(option)"
            >
              <q-item-section>{{ option }}</q-item-section>
            </q-item>
          </q-list>
        </q-menu>
      </q-chip>
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
import { Event_extended } from 'src/types/dbTypes';
import { computed } from 'vue';
import { useUserStore } from 'src/stores/user-store';
import { useEventStore } from 'src/stores/event-store';

const props = defineProps<{
  event: Event_extended;
}>();

const userStore = useUserStore();
const eventStore = useEventStore();

const selectedOption = computed(() => {
  return (
    props.event.players.find((p) => p.userId === userStore.user.id)?.status ??
    'Choose option'
  );
});
const options = ['going', 'not_going', 'dont_know'];

const daysOfWeek = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

async function react(option: string) {
  await eventStore.reactOnEvent(props.event.id, option);
}
</script>

<style scoped></style>
