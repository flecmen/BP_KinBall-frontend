<template>
  <q-avatar round size="md" class="cursor-pointer">
    <q-img
      src="https://upload.wikimedia.org/wikipedia/commons/9/95/Instagram_logo_2022.svg"
      alt="Instagram logo"
      :href="props.link"
      @click="handleClick"
    />
  </q-avatar>
</template>

<script setup lang="ts">
const props = defineProps<{
  link: string;
}>();

function handleClick() {
  window.open(props.link, '_blank');
}
</script>
