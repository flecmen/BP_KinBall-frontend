<template>
  <q-img
    src="src/assets/trophies/bronze.png"
    alt="Trophy icon"
    :height="`${height}px`"
    :width="`${height}px`"
  >
  </q-img>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps<{
  height?: number;
}>();

const height = ref(props.height ?? 50);
</script>

<style scoped></style>
