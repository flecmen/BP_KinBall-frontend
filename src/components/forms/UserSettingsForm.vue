<template>
  <div v-for="(value, key) in userStore.user.settings" :key="key">
    <q-toggle
      v-if="key !== 'userId'"
      :key="key"
      v-model="settings[key]"
      :label="$t('settings.' + key)"
    />
  </div>
  <div align="right">
    <q-btn @click="updateSettings()" label="Update" color="primary" />
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from 'src/stores/user-store';
import { ref } from 'vue';

const userStore = useUserStore();

const settings = ref(JSON.parse(JSON.stringify(userStore.user.settings)));

function updateSettings() {
  userStore.updateSettings(settings.value);
}
</script>

<style scoped></style>
