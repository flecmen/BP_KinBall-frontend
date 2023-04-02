<template>
  <router-link :to="{ path: props.link }" class="router-link">
    <q-card class="text-grey q-hoverable">
      <span class="q-focus-helper"></span>
      <q-card-section>
        <h2 class="text-primary">{{ props.title }}</h2>
        <p class="font-light">{{ props.description }}</p>
      </q-card-section>
    </q-card>
  </router-link>
</template>

<script setup lang="ts">
const props = defineProps<{
  title: string;
  link: string;
  iconClass: string;
  description: string;
}>();
</script>

<style scoped>
.router-link {
  text-decoration: none;
}
</style>
