<template>
  <q-item>
    <q-item-section side>
      <userAvatar
        :image="userStore.user.profile_picture"
        :isMobile="props.isMobile"
      />
    </q-item-section>
    <q-item-section>
      <q-input v-model="pom" label="What is on your mind?" filled dense disable>
      </q-input>
    </q-item-section>
  </q-item>
</template>

<script setup lang="ts">
import { useUserStore } from 'src/stores/user-store';
import userAvatar from '../userAvatar.vue';
import { ref } from 'vue';

export interface Props {
  isMobile: boolean;
}
const props = defineProps<Props>();

const userStore = useUserStore();

const pom = ref('');
</script>

<style scoped></style>
