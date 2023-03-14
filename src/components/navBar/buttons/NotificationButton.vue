<template>
  <q-btn flat round dense icon="mail">
    <q-menu>
      <q-list>
        <q-item v-close-popup tabindex="0">
          <q-item-section> Notifikace </q-item-section>
        </q-item>
      </q-list>
    </q-menu>
  </q-btn>
</template>

<script setup lang="ts">
import { useUserStore } from 'src/stores/user-store';
const userStore = useUserStore();
</script>

<style scoped></style>
