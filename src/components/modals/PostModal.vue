<template>
  <q-dialog ref="dialog" style="width: 700px">
    <q-card>
      <q-card-section>
        <div class="text-h6">Create a new post</div>
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
        <GroupsSelector :groups="post.groups" @GroupsUpdate="updateGroups" />
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-form>
          <!-- HEADING -->
          <q-input v-model="post.heading" label="Heading" />
          <!-- TEXT -->
          <q-input v-model="post.text" label="Text" type="textarea" />
          <div v-if="post.type === postType.survey">
            <AddSurveyOption />
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
import { ref, computed } from 'vue';
import { postType, Group } from 'src/types/dbTypes';
import GroupsSelector from '../forms/GroupsSelector.vue';
import AddSurveyOption from '../forms/surveyComponents/AddSurveyOption.vue';
import CurrentSurveyQuestions from '../forms/surveyComponents/CurrentSurveyQuestions.vue';

const props = defineProps<{
  postId_to_edit: number;
}>();

const postStore = usePostStore();

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

function updateGroups(groups: Group[]) {
  post.value.groups = groups;
}

async function createOrUpdatePost() {
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
