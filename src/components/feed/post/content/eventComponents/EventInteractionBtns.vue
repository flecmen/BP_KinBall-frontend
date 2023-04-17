<template>
  <div class="row justify-evenly">
    <q-btn
      :label="goingBtnLabel"
      icon="mood"
      @click="react('going' as keyof UserOnEventStatus)"
      @mouseover="showGoing"
      @mouseleave="hideGoing"
      :loading="isLoading.going"
      :disable="blocked"
      class="text-green-5"
      flat
    >
      <UserPopupList
        :isMobile="true"
        :users="
          eventStore
            .getEvent(props.eventId)
            ?.players.filter((p) => p.status === 'going')
            .map((p) => p.user)
        "
        :visible="areGoingVisible"
        @mouseover="showGoing"
        @mouseleave="hideGoing"
      />
      <q-badge floating color="white" text-color="black"
        >({{
          eventStore
            .getEvent(props.eventId)
            ?.players.filter((p) => p.status === 'going').length
        }})
      </q-badge>
    </q-btn>
    <q-btn
      :label="dunnoBtnLabel"
      icon="sentiment_neutral"
      :loading="isLoading.dont_know"
      @click="react('dont_know' as keyof UserOnEventStatus)"
      @mouseover="showDont_knowList"
      @mouseleave="hideDont_knowList"
      :disable="blocked"
      class="text-orange"
      flat
    >
      <UserPopupList
        :isMobile="true"
        :users="
          eventStore
            .getEvent(props.eventId)
            ?.players.filter((p) => p.status === 'dont_know')
            .map((p) => p.user)
        "
        :visible="dont_knowListVisible"
        @mouseover="showDont_knowList"
        @mouseleave="hideDont_knowList"
      />
      <q-badge floating color="white" text-color="black"
        >({{
          eventStore
            .getEvent(props.eventId)
            ?.players.filter((p) => p.status === 'dont_know').length
        }})</q-badge
      >
    </q-btn>
    <q-btn
      :label="NotGoingBtnLabel"
      icon="mood_sad"
      :loading="isLoading.not_going"
      :disable="blocked"
      @click="react('not_going' as keyof UserOnEventStatus)"
      @mouseover="showNot_goingList"
      @mouseleave="hideNot_goingList"
      class="text-red"
      flat
    >
      <UserPopupList
        :isMobile="true"
        :users="
          eventStore
            .getEvent(props.eventId)
            ?.players.filter((p) => p.status === 'not_going')
            .map((p) => p.user)
        "
        :visible="not_goingListVisible"
        @mouseover="showNot_goingList"
        @mouseleave="hideNot_goingList"
      />
      <q-badge floating color="white" text-color="black"
        >({{
          eventStore
            .getEvent(props.eventId)
            ?.players.filter((p) => p.status === 'not_going').length
        }})</q-badge
      >
    </q-btn>
  </div>
  <q-space />
  <q-linear-progress
    v-if="eventStore.getEvent(props.eventId)?.people_limit"
    color="primary"
    :value="percentage"
    rounded
  />
</template>

<script setup lang="ts">
import { Event_extended, UserOnEventStatus } from 'src/types/dbTypes';
import { useEventStore } from 'src/stores/event-store';
import { ref, reactive, computed } from 'vue';
import UserPopupList from 'src/components/lists/UserPopupList.vue';
import { useUserStore } from 'src/stores/user-store';

export interface Props {
  eventId: Event_extended['id'];
  isMobile: boolean;
}
const props = defineProps<Props>();

const eventStore = useEventStore();
const userStore = useUserStore();

const areGoingVisible = ref(false);
const dont_knowListVisible = ref(false);
const not_goingListVisible = ref(false);

const blocked = ref(false);

const percentage = computed(() => {
  const event = eventStore.getEvent(props.eventId);
  if (!event?.players.filter((p) => p.status === 'going')) return 0;
  if (!event?.people_limit) return 0;
  return (
    event?.players.filter((p) => p.status === 'going').length /
    event?.people_limit
  );
});

const goingBtnLabel = computed(() => {
  if (
    eventStore
      .getEvent(props.eventId)
      ?.players.some(
        (ue) =>
          ue.status === UserOnEventStatus.going &&
          ue.user.id === userStore.user.id
      )
  ) {
    return "I'm going";
  }
  return 'Going';
});

const dunnoBtnLabel = computed(() => {
  if (
    eventStore
      .getEvent(props.eventId)
      ?.players.some(
        (ue) => ue.status === 'dont_know' && ue.user.id === userStore.user.id
      )
  ) {
    return "I don't know";
  } else return "Don't know";
});

const NotGoingBtnLabel = computed(() => {
  if (
    eventStore
      .getEvent(props.eventId)
      ?.players.some(
        (ue) => ue.status === 'not_going' && ue.user.id === userStore.user.id
      )
  ) {
    return "I'm not going";
  } else return 'Not going';
});

function showGoing() {
  areGoingVisible.value = true;
}

function hideGoing() {
  areGoingVisible.value = false;
}

function showDont_knowList() {
  dont_knowListVisible.value = true;
}

function hideDont_knowList() {
  dont_knowListVisible.value = false;
}

function showNot_goingList() {
  not_goingListVisible.value = true;
}

function hideNot_goingList() {
  not_goingListVisible.value = false;
}

const isLoading = reactive({
  going: false,
  dont_know: false,
  not_going: false,
});

async function react(reaction: keyof UserOnEventStatus) {
  isLoading[String(reaction)] = true;
  blocked.value = true;
  await eventStore.reactOnEvent(props.eventId, reaction);
  isLoading[String(reaction)] = false;
  blocked.value = false;
}
</script>

<style scoped></style>
