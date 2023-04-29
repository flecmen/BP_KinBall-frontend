<template>
  <q-dialog ref="dialog" style="width: 700px">
    <q-card>
      <q-card-section>
        <div class="text-h6">Create or update new post</div>
      </q-card-section>
      <!-- POST TYPE RADIO -->
      <q-card-section class="q-pt-none">
        <q-radio
          v-model="post.type"
          :val="postType.text"
          :label="postType.text"
          :disable="props.postId_to_edit > -1"
        />
        <q-radio
          v-model="post.type"
          :val="postType.survey"
          :label="postType.survey"
          :disable="props.postId_to_edit > -1"
        />
      </q-card-section>

      <!-- GROUPS SELECTOR -->
      <q-card-section class="q-pt-none">
        <GroupsSelector
          :groups="post.groups"
          @GroupsUpdate="(groups) => (post.groups = groups)"
          :error="error.groups.show"
          :errorMessage="error.groups.text"
        />
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-form ref="form">
          <!-- HEADING -->
          <q-input
            v-model="post.heading"
            label="Heading"
            :rules="[formRules.required]"
          />
          <!-- TEXT -->
          <q-input v-model="post.text" label="Text" type="textarea" />

          <!-- SURVEY -->
          <div v-if="post.type === postType.survey">
            <AddSurveyOption
              :error="error.surveyOptions.show"
              :errorMessage="error.surveyOptions.text"
            />
            <CurrentSurveyQuestions />
          </div>
        </q-form>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn
          label="Submit"
          color="primary"
          @click="createOrUpdatePost()"
          :loading="isLoading"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { usePostStore } from 'src/stores/post-store';
import { ref, computed, reactive } from 'vue';
import { postType } from 'src/types/dbTypes';
import GroupsSelector from '../forms/GroupsSelector.vue';
import AddSurveyOption from '../forms/surveyComponents/AddSurveyOption.vue';
import CurrentSurveyQuestions from '../forms/surveyComponents/CurrentSurveyQuestions.vue';
import formRules from 'src/helpers/formRules';
import { useI18n } from 'vue-i18n';

const props = defineProps<{
  postId_to_edit: number;
}>();

const postStore = usePostStore();
const i18n = useI18n();

const isThisNewPost = computed(() => {
  return props.postId_to_edit === -1;
});

const post = ref(
  isThisNewPost.value
    ? postStore.newPost
    : JSON.parse(
        JSON.stringify(postStore.getLocalPost(props.postId_to_edit) ?? {})
      )
);

const isLoading = ref(false);
const dialog = ref();
const form = ref();

const error = reactive({
  groups: {
    text: '',
    show: false,
  },
  surveyOptions: {
    text: '',
    show: false,
  },
});

async function createOrUpdatePost() {
  // validate
  if (!(await form.value.validate())) {
    dialog.value.shake();
    return;
  }
  if (!post.value.groups || post.value.groups.length === 0) {
    error.groups.show = true;
    error.groups.text = i18n.t('form.rules.groups');
    dialog.value.shake();
    return;
  }

  if (post.value.type === postType.survey) {
    if (!post.value.survey_options || post.value.survey_options.length < 2) {
      console.log(post.value.survey_options.length);
      error.surveyOptions.show = true;
      error.surveyOptions.text = i18n.t('form.rules.surveyOptions');
      setTimeout(() => {
        error.surveyOptions.show = false;
      }, 2000);
      dialog.value.shake();
      return;
    }
  }

  isLoading.value = true;
  if (isThisNewPost.value) {
    await postStore.postNewPost();
  } else {
    await postStore.updatePost(post.value);
  }
  isLoading.value = false;
  dialog.value.hide();
}
</script>

<style scoped></style>
