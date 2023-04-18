<template>
  <q-btn flat round dense icon="account_circle">
    <q-menu>
      <q-list>
        <q-item
          v-close-popup
          tabindex="0"
          clickable
          :to="{ name: 'user-profile', params: { userId: userStore.user.id } }"
        >
          <q-item-section>
            {{ userStore.user.full_name }}
          </q-item-section>
        </q-item>
        <q-item
          clickable
          v-close-popup
          tabindex="0"
          @click="emit('installApp')"
        >
          <q-item-section> {{ $t('install.app') }} </q-item-section>
        </q-item>
        <q-item clickable v-close-popup tabindex="0" @click="emit('settings')">
          <q-item-section>{{ $t('settings') }} </q-item-section>
        </q-item>
        <q-item clickable v-close-popup tabindex="0" @click="emit('logout')">
          <q-item-section>
            <q-item-label>{{ $t('btn.log.out') }}</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-menu>
  </q-btn>
</template>

<script setup lang="ts">
import { useUserStore } from 'src/stores/user-store';
const userStore = useUserStore();

const emit = defineEmits<{
  (event: 'logout'): void;
  (event: 'settings'): void;
  (event: 'installApp'): void;
}>();
</script>

<style scoped></style>
