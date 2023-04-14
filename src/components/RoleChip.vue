<template>
  <q-chip :color="color" text-color="white">{{ props.user.role }}</q-chip>
</template>

<script setup lang="ts">
import { User_extended } from 'src/types/dbTypes';
import { computed } from 'vue';

export interface Props {
  user: User_extended;
}
const props = defineProps<Props>();

const color = computed(() => {
  switch (props.user.role) {
    case 'admin':
      return 'red';
    case 'coach':
      return 'orange';
    default:
      return 'primary';
  }
});
</script>

<style scoped></style>
