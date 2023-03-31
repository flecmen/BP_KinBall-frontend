<template>
  <q-avatar :size="isMobile ? '40px' : '50px'">
    <img
      :src="config.backendUrl + '/static/image/' + props.image?.image_path"
      alt="avatar"
    />
  </q-avatar>
</template>

<script setup lang="ts">
import { User_extended } from 'src/types/dbTypes';
import config from 'src/config';

export interface Props {
  image: User_extended['profile_picture'];
  isMobile: boolean;
}
const props = defineProps<Props>();
</script>

<style scoped></style>
