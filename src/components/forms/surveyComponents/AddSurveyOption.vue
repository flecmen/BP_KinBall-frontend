<template>
  <q-form class="row justify-between">
    <q-input
      v-model="survey_option"
      label="New survey question"
      :error-message="error"
      :error="error !== ''"
      @vnode-updated="checkNewOptionValidity()"
    ></q-input>
    <q-btn @click="addSurveyOption()" label="Add" color="primary" flat></q-btn>
  </q-form>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { usePostStore } from 'src/stores/post-store';

const postStore = usePostStore();

const survey_option = ref('');
const error = ref('');

function addSurveyOption() {
  if (survey_option.value === '') {
    error.value = 'Please enter a question';
    setTimeout(() => {
      error.value = '';
    }, 3000);
    return;
  }
  postStore.addSurvey_option(survey_option.value);
  error.value = '';
  survey_option.value = '';
}

function checkNewOptionValidity() {
  if (
    postStore.newPost.survey_options.some((o) => o.text === survey_option.value)
  ) {
    error.value = 'This option already exists';
  } else {
    error.value = '';
  }
}
</script>

<style scoped></style>
