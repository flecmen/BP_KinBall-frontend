<template>
  <q-avatar :size="isMobile ? '40px' : '50px'">
    <img
      :src="image?.image_path ? image.image_path : 'src/assets/avatar.jpg'"
      alt="avatar"
    />
  </q-avatar>
</template>

<script setup lang="ts">
import { User_extended } from 'src/types/dbTypes';

export interface Props {
  image: User_extended['profile_picture'];
  isMobile: boolean;
}
const props = defineProps<Props>();
</script>

<style scoped></style>
