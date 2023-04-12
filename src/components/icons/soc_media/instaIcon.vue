<template>
  <q-avatar square>
    <img
      src="https://upload.wikimedia.org/wikipedia/commons/9/95/Instagram_logo_2022.svg"
      alt="Instagram logo"
      :href="props.link"
    />
  </q-avatar>
</template>

<script setup lang="ts">
const props = defineProps<{
  link: string | undefined | null;
}>();
</script>
