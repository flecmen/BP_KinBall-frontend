<!-- eslint-disable vue/no-mutating-props -->
<template>
  <q-menu v-model="props.visible">
    <div class="q-pa-none q-ma-none" style="max-width: 350px">
      <q-list bordered>
        <q-item
          v-for="user in props.users"
          v-bind:key="user.id"
          dense
          v-ripple
          :clickable="false"
        >
          <q-item-section avatar>
            <UserAvatar :image="user.profile_picture" :isMobile="isMobile" />
          </q-item-section>

          <q-item-section>{{ user.full_name }}</q-item-section>
        </q-item>
      </q-list>
    </div>
  </q-menu>
</template>

<script setup lang="ts">
import { User_extended } from 'src/types/dbTypes';
import UserAvatar from 'src/components/userAvatar.vue';

export interface Props {
  users: User_extended[] | undefined;
  isMobile: boolean;
  visible: boolean;
}
const props = defineProps<Props>();
</script>

<style scoped></style>
