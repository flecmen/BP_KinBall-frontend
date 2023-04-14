<template>
  <div></div>
</template>

<script setup lang="ts">
import { role } from 'src/types/dbTypes';
import { computed } from 'vue';

const props = defineProps<{
  role: role;
}>();
</script>

<style scoped></style>
