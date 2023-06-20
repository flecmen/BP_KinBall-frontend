<template>
  <div class="row justify-evenly">
    <!-- attend button -->
    <EventInteractionButton
      :reactionType="'going'"
      :players="
        event?.players.filter((p) => p.status === 'going').map((p) => p.user)
      "
      :label="$t('event.reaction.attend')"
      :icon="'mood'"
      :isLoading="isLoading.going"
      :disable="blocked"
      :color="
        userPickedReaction === ''
          ? 'green-5'
          : userPickedReaction === UserOnEventStatus.going
          ? 'green-5'
          : 'grey'
      "
      @react="react"
    />
    <!-- dont know button -->
    <EventInteractionButton
      :reactionType="'dont_know'"
      :players="
        event?.players
          .filter((p) => p.status === 'dont_know')
          .map((p) => p.user)
      "
      :label="$t('event.reaction.dont_know')"
      :icon="'sentiment_neutral'"
      :isLoading="isLoading.dont_know"
      :disable="blocked"
      :color="
        userPickedReaction === ''
          ? 'orange'
          : userPickedReaction === UserOnEventStatus.dont_know
          ? 'orange'
          : 'grey'
      "
      @react="react"
    />
    <!-- not going button -->
    <EventInteractionButton
      :reactionType="'not_going'"
      :players="
        event?.players
          .filter((p) => p.status === 'not_going')
          .map((p) => p.user)
      "
      :label="$t('event.reaction.not_going')"
      :icon="'mood_bad'"
      :isLoading="isLoading.not_going"
      :disable="blocked"
      :color="
        userPickedReaction === ''
          ? 'red'
          : userPickedReaction === UserOnEventStatus.not_going
          ? 'red'
          : 'grey'
      "
      @react="react"
    />
  </div>
</template>

<script setup lang="ts">
import { Event_extended, UserOnEventStatus } from 'src/types/dbTypes';
import { useEventStore } from 'src/stores/event-store';
import { ref, reactive, computed } from 'vue';
import { useUserStore } from 'src/stores/user-store';
import EventInteractionButton from './EventInteractionButton.vue';

export interface Props {
  eventId: Event_extended['id'];
  isMobile: boolean;
}
const props = defineProps<Props>();

const eventStore = useEventStore();
const userStore = useUserStore();

const blocked = ref(false);
const event = computed(() => {
  return eventStore.getEvent(props.eventId);
});

const percentage = computed(() => {
  if (!event.value?.players.filter((p) => p.status === 'going')) return 0;
  if (!event.value?.people_limit) return 0;
  return (
    event.value?.players.filter((p) => p.status === 'going').length /
    event.value?.people_limit
  );
});

const userPickedReaction = computed(() => {
  if (!event.value) return '';
  const player = event.value.players.find(
    (p) => p.user.id === userStore.user?.id
  );
  if (!player) return '';
  return player.status;
});

const isLoading = reactive({
  going: false,
  dont_know: false,
  not_going: false,
});

async function react(reaction: string) {
  if (!(reaction in isLoading)) {
    console.error(`Invalid reaction: ${reaction}`);
    return;
  }
  isLoading[reaction] = true;
  blocked.value = true;
  await eventStore.reactOnEvent(props.eventId, reaction);
  isLoading[reaction] = false;
  blocked.value = false;
}
</script>

<style scoped></style>
