<template>
  <q-item class="justify-end q-gutter-sm" dense>
    <q-icon
      name="edit"
      size="xs"
      color="primary"
      class="click-cursor"
      @click="openEditDialog()"
    >
      <q-tooltip>{{ $t('tooltip.post.edit') }}</q-tooltip>
    </q-icon>
    <q-icon name="delete" size="xs" color="red" class="click-cursor">
      <q-tooltip>{{ $t('tooltip.post.delete') }}</q-tooltip>
      <q-menu auto-close>
        <q-card class="my-card">
          <q-card-section class="bg-primary text-white">
            <div class="text">{{ $t('prompt.AreYouSure.remove.post') }}</div>
          </q-card-section>

          <q-card-actions align="right">
            <q-btn
              :label="$t('btn.delete')"
              flat
              color="white"
              class="bg-red"
              @click="postStore.deletePost(props.post.id)"
            />
          </q-card-actions>
        </q-card>
      </q-menu>
    </q-icon>
  </q-item>
</template>

<script setup lang="ts">
import { usePostStore } from 'src/stores/post-store';
import { useEventStore } from 'src/stores/event-store';
import { Post_extended, postType } from 'src/types/dbTypes';

export interface Props {
  post: Post_extended;
  isMobile: boolean;
}
const props = defineProps<Props>();

const postStore = usePostStore();
const eventStore = useEventStore();

function openEditDialog() {
  switch (props.post.type) {
    case postType.text:
      postStore.openPostDialog(props.post.id);
      break;
    case postType.survey:
      postStore.openPostDialog(props.post.id);
      break;
    case postType.event:
      eventStore.openEventDialog(props.post.event?.id);
      break;
  }
}
</script>

<style scoped>
.click-cursor {
  cursor: pointer;
}
</style>
