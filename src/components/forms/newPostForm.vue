<template>
  <q-form>
    <q-input v-model="postStore.newPost.heading" label="Heading" />
    <q-input v-model="postStore.newPost.text" label="Text" type="textarea" />
    <div v-if="props.type === postType.survey">
      <AddSurveyOption />
      <CurrentSurveyQuestions />
    </div>
  </q-form>
</template>

<script setup lang="ts">
import { usePostStore } from 'src/stores/post-store';
import { useUserStore } from 'src/stores/user-store';
import { postType } from 'src/types/dbTypes';
import AddSurveyOption from './surveyComponents/AddSurveyOption.vue';
import CurrentSurveyQuestions from './surveyComponents/CurrentSurveyQuestions.vue';

const props = defineProps<{
  type: postType;
}>();

const postStore = usePostStore();
const userStore = useUserStore();
</script>

<style scoped></style>
