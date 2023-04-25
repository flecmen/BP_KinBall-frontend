<template>
  <div class="text-h6">lvl {{ userLevel }}</div>
  <div class="q-pl-sm q-pr-sm">{{ levelMessage }}</div>
</template>

<script setup lang="ts">
import { inRange } from 'lodash';
import { useUserStore } from 'src/stores/user-store';
import { computed, ref } from 'vue';

const userStore = useUserStore();

const userLevel = ref(userStore.user?.reward_system.level);

const levelMessage = computed(() => {
  switch (
    true // switch on true
  ) {
    case inRange(userLevel.value, 0, 5):
      return 'Kin-noob';
    case inRange(userLevel.value, 5, 10):
      return 'Kinballista';
    case inRange(userLevel.value, 10, 15):
      return 'Elite-ball';
    case inRange(userLevel.value, 15, 99999):
      return 'Repre';
    // add other cases here
    default: // optional default case
      return 'Unknown';
  }
});
</script>

<style scoped></style>
