<template>
  <q-btn flat round dense icon="translate">
    <q-menu>
      <q-list>
        <q-item
          v-for="option in localeOptions"
          :key="option.value"
          clickable
          v-close-popup
          tabindex="0"
          @click="$i18n.locale = option.value"
        >
          <q-item-section>
            <q-item-label>{{ option.label }}</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-menu>
  </q-btn>
</template>

<script setup lang="ts">
const localeOptions = [
  { value: 'en-US', label: 'English' },
  { value: 'cs', label: 'Czech' },
];
</script>

<style scoped></style>
