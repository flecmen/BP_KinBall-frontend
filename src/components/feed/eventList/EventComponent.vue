<template>
  <q-card>
    <q-card-section>
      <div>{{ $t('event.type.' + props.event.type) }}</div>
      <div class="text-subtitle2">
        {{
          new Date(props.event.time).toLocaleDateString([], {
            day: '2-digit',
            month: '2-digit',
          })
        }}
        {{ $t('dayofweek.' + dateTimeFormat.dayOfWeek(props.event.time)) }}
        {{ new Date(props.event.time).toTimeString().slice(0, 5) }}
      </div>
      {{ props.event.address_short }}
    </q-card-section>
    <q-card-section>
      <q-chip
        clickable
        :color="
          selectedOption === $t('event.reaction.going')
            ? 'positive'
            : selectedOption === $t('event.reaction.not_going')
            ? 'negative'
            : selectedOption === $t('event.reaction.dont_know')
            ? 'orange'
            : 'primary'
        "
        text-color="white"
        icon="expand_more"
      >
        {{ selectedOption }}
        <q-menu auto-close>
          <q-list>
            <q-item
              v-for="option in options"
              :key="option.value"
              clickable
              emit-label
              map-options
              :option-label="$t('event.reaction.' + option.label)"
              dense
              @click="react(option.value)"
            >
              <q-item-section>{{ option.label }}</q-item-section>
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
import { UserOnEventStatus } from 'src/types/dbTypes';
import dateTimeFormat from 'src/helpers/dateTimeFormat';
import { i18n } from 'src/utils/i18n';

const props = defineProps<{
  event: Event_extended;
}>();

const userStore = useUserStore();
const eventStore = useEventStore();

const selectedOption = computed(() => {
  return props.event.players.find((p) => p.userId === userStore.user.id)?.status
    ? i18n.t(
        'event.reaction.' +
          props.event.players.find((p) => p.userId === userStore.user.id)
            ?.status
      )
    : i18n.t('btn.choose.option');
});
const options = Object.entries(UserOnEventStatus)
  .map(([key, value]) => ({
    label: i18n.t('event.reaction.' + value),
    value: key,
  }))
  // nezobrazovat možnost "náhradník"
  .filter(
    (option) =>
      option.label !== i18n.t('event.reaction.' + UserOnEventStatus.substitute)
  );

async function react(option: string) {
  await eventStore.reactOnEvent(props.event.id, option);
}
</script>

<style scoped></style>
