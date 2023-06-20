<template>
  <q-form class="row justify-between">
    <q-input
      v-model="survey_option"
      :label="$t('form.input.survey_option')"
      :error-message="props.errorMessage"
      :error="props.error"
      @vnode-updated="checkNewOptionValidity()"
    ></q-input>
    <q-btn
      @click="addSurveyOption()"
      :label="$t('btn.add.default')"
      color="primary"
      flat
    ></q-btn>
  </q-form>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { usePostStore } from 'src/stores/post-store';
import useNotify from 'src/composables/useNotify';
import { i18n } from 'src/utils/i18n';

const props = defineProps<{
  error: boolean;
  errorMessage: string;
}>();

const postStore = usePostStore();
const notify = useNotify();

const survey_option = ref('');
const error = ref('');

function addSurveyOption() {
  if (survey_option.value === '') {
    notify.fail(i18n.t('notify.invalid.input'));
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
