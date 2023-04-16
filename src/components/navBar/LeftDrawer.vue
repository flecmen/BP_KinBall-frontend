<template>
  <q-drawer bordered :width="200" :breakpoint="500">
    <q-list>
      <q-item-label header> Menu </q-item-label>
      <EssentialLink
        v-for="link in navigationButtons"
        :key="link.title"
        :label="link.title"
        v-bind="link"
        :handler="link.handler"
      />
    </q-list>
  </q-drawer>
</template>

<script setup lang="ts">
import EssentialLink from 'src/components/navBar/buttons/leftDrawerButton.vue';
import navigationButtons from 'src/data/navigationButtons';
</script>

<style scoped></style>
