<template>
  <q-badge :color="props.group.color ?? 'primary'" text-color="white">{{
    props.group.name
  }}</q-badge>
</template>

<script setup lang="ts">
import { Group } from 'src/types/dbTypes';

export interface Props {
  group: Group;
}
const props = defineProps<Props>();
</script>

<style scoped></style>
