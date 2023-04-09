<template>
  <div class="profile-picture">
    <img
      :src="config.backendUrl + '/static/image/' + props.image?.image_path"
      alt="Profile Picture"
    />
  </div>
</template>

<script setup lang="ts">
import { User_extended } from 'src/types/dbTypes';
import config from 'src/config';

const props = defineProps<{
  image: User_extended['profile_picture'];
}>();
</script>

<style scoped>
.profile-picture {
  width: 100px; /* Set desired width of the profile picture */
  height: 100px; /* Set desired height of the profile picture */
  border-radius: 50%; /* Set desired border radius to create a circular profile picture */
  overflow: hidden; /* Hide overflow to create a circular shape */
}

.profile-picture img {
  width: 100%; /* Make sure the image fills the container */
  height: 100%; /* Make sure the image fills the container */
  object-fit: cover; /* Ensure the image maintains its aspect ratio and covers the entire container */
}
</style>
