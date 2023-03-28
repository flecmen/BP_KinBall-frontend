<template>
  <q-item>
    {{ props.post.text }}
  </q-item>

  <survey-option
    v-for="option in props.post.survey_options"
    v-bind:key="option.id"
    :postId="props.post.id"
    :option="option"
    :total_votes="total_votes"
    class="row"
  />
</template>

<script setup lang="ts">
import { Post_extended } from 'src/types/dbTypes';
import SurveyOption from './SurveyComponents/SurveyOption.vue';
import { computed } from 'vue';

export interface Props {
  post: Post_extended;
  isMobile: boolean;
}
const props = defineProps<Props>();

const total_votes = computed(() => {
  return props.post.survey_options.reduce((acc, option) => {
    return acc + option.votes.length;
  }, 0);
});
</script>

<style scoped></style>
