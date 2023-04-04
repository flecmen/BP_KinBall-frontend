<template>
  <router-link :to="{ name: props.link }" class="router-link">
    <q-card class="text-grey q-hoverable">
      <span class="q-focus-helper"></span>
      <q-card-section>
        <q-icon :name="props.icon" />
        <h2 class="text-primary">{{ props.title }}</h2>
        <p class="font-light">{{ props.description }}</p>
      </q-card-section>
    </q-card>
  </router-link>
</template>

<script setup lang="ts">
const props = defineProps<{
  icon: string;
  title: string;
  description: string;
  link: string;
}>();
</script>

<style scoped>
.router-link {
  text-decoration: none;
}
</style>
