<template>
  <q-chip v-if="props?.price" color="red-5" outline class="col-auto"
    >{{ props.price }} Kč</q-chip
  >
  <q-chip v-else class="col-auto" color="green" outline>{{
    $t('free')
  }}</q-chip>
</template>

<script setup lang="ts">
export interface Props {
  price?: number | null | undefined;
}
const props = defineProps<Props>();
</script>

<style scoped></style>
