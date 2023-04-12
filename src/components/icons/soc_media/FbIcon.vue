<template>
  <q-avatar>
    <img
      src="https://upload.wikimedia.org/wikipedia/en/0/04/Facebook_f_logo_%282021%29.svg"
      alt="Facebook logo"
      :href="props.link"
    />
  </q-avatar>
</template>

<script setup lang="ts">
const props = defineProps<{
  link: string | undefined | null;
}>();
</script>
