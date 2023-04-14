<template>
  <q-chip
    :label="$t('show.on.map')"
    icon="location_on"
    color="secondary"
    text-color="white"
    clickable
    @click="openGoogleMaps()"
  />
</template>

<script setup lang="ts">
const props = defineProps<{
  address: string;
  lat?: string | null;
  lng?: string | null;
}>();

function openGoogleMaps() {
  const url = `https://www.google.com/maps?q=${encodeURIComponent(
    props.address
  )}`;

  // Open Google Maps in a new window
  window.open(url, '_blank');
}
</script>

<style scoped></style>
