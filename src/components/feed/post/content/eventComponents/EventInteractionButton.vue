<template>
  <q-btn
    :label="label"
    :icon="props.icon"
    @click="emit('react', reactionType)"
    @mouseover="showList"
    @mouseleave="hideList"
    :loading="isLoading"
    :disable="disable"
    :text-color="props.color"
    flat
  >
    <UserPopupList
      :isMobile="true"
      :users="props.players"
      :visible="isPlayersListVisible"
      @mouseover="showList"
      @mouseleave="hideList"
    />
  </q-btn>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { User_extended } from 'src/types/dbTypes';
import UserPopupList from 'src/components/lists/UserPopupList.vue';

const props = defineProps<{
  reactionType: string;
  players: User_extended[] | undefined;
  label: string;
  icon: string;
  isLoading: boolean;
  disable: boolean;
  color: string;
}>();

const emit = defineEmits<{
  (event: 'react', status: string): void;
}>();

const isPlayersListVisible = ref(false);

function showList() {
  isPlayersListVisible.value = true;
}

function hideList() {
  isPlayersListVisible.value = false;
}
</script>

<style scoped></style>
