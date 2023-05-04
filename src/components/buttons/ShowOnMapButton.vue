<template>
  <q-btn
    :label="$t('btn.show.onmap')"
    icon="location_on"
    color="secondary"
    text-color="grey"
    clickable
    @click="openGoogleMaps()"
    flat
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
