<template>
  <component :is="displayedTrophy" :height="props.height" />
</template>

<script setup lang="ts">
import { computed } from 'vue';
import BronzeTrophy from 'src/components/icons/trophies/bronzeTrophy.vue';
import SilverTrophy from 'src/components/icons/trophies/silverTrophy.vue';
import GoldTrophy from 'src/components/icons/trophies/GoldTrophy.vue';
const props = defineProps<{
  level: number;
  height?: number;
}>();

const displayedTrophy = computed(() => {
  if (props.level >= 5 && props.level < 10) {
    return BronzeTrophy;
  }
  if (props.level >= 10 && props.level < 15) {
    return SilverTrophy;
  }
  if (props.level >= 15) {
    return GoldTrophy;
  }
  return '';
});
</script>

<style scoped></style>
