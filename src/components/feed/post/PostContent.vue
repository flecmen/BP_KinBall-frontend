<template>
  <ContentTypeEvent
    v-if="props.post.type === postType.event"
    :eventId="props.post.event?.id"
    :isMobile="props.isMobile"
  />
  <ContentTypeText
    v-else-if="props.post.type === postType.text"
    :post="props.post"
    :isMobile="props.isMobile"
  />
  <ContentTypeSurvey v-else :post="props.post" :isMobile="props.isMobile" />
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
import { Post_extended, postType } from 'src/types/dbTypes';
import ContentTypeEvent from './content/ContentTypeEvent.vue';
import ContentTypeText from './content/ContentTypeText.vue';
import ContentTypeSurvey from './content/ContentTypeSurvey.vue';

export interface Props {
  post: Post_extended;
  isMobile: boolean;
}
const props = defineProps<Props>();
</script>

<style scoped></style>
