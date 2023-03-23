<!-- eslint-disable vue/no-mutating-props -->
<template>
  <q-menu v-model="props.visible">
    <div class="q-pa-none q-ma-none" style="max-width: 350px">
      <q-list bordered>
        <q-item
          v-for="userEvent in props.players"
          v-bind:key="userEvent.userId"
          dense
          v-ripple
          :clickable="false"
        >
          <q-item-section avatar>
            <UserAvatar
              :image="userEvent.user.profile_picture"
              :isMobile="isMobile"
            />
          </q-item-section>

          <q-item-section>{{ userEvent.user.full_name }}</q-item-section>
        </q-item>
      </q-list>
    </div>
  </q-menu>
</template>

<script setup lang="ts">
import { Event_extended } from 'src/types/dbTypes';
import UserAvatar from 'src/components/userAvatar.vue';

export interface Props {
  players: Event_extended['players'] | undefined;
  isMobile: boolean;
  visible: boolean;
}
const props = defineProps<Props>();
</script>

<style scoped></style>
