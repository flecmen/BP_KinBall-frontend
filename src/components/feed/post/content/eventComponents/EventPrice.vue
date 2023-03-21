<template>
  <q-chip v-if="props?.price" color="red-2" class="col-auto"
    >{{ props.price }} Kč</q-chip
  >
  <q-chip v-else class="col-auto" color="green">Zdarma</q-chip>
</template>

<script setup lang="ts">
export interface Props {
  price?: number | null | undefined;
}
const props = defineProps<Props>();
</script>

<style scoped></style>
