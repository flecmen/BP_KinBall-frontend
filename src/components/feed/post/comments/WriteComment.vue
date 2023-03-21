<template>
  <q-item>
    <q-item-section side>
      <userAvatar
        :image="userStore.user.profile_picture"
        :isMobile="props.isMobile"
      />
    </q-item-section>
    <q-item-section>
      <q-input
        v-model="commentText"
        label="Write a comment"
        filled
        autogrow
        dense
      >
      </q-input>
    </q-item-section>
    <div class="q-ml-md">
      <q-btn
        label="send"
        :loading="isCommentBeingSent"
        @click="sendComment()"
        color="primary"
      >
        <template v-slot:loading>
          <q-spinner-facebook />
        </template>
      </q-btn>
    </div>
  </q-item>
</template>

<script setup lang="ts">
import { Post_extended } from 'src/types/dbTypes';
import { useUserStore } from 'src/stores/user-store';
import { usePostStore } from 'src/stores/post-store';
import { ref } from 'vue';
import useNotify from 'src/composables/useNotify';
import { i18n } from 'src/utils/i18n';
import userAvatar from 'src/components/userAvatar.vue';
export interface Props {
  post: Post_extended;
  isMobile: boolean;
}
const props = defineProps<Props>();

const userStore = useUserStore();
const postStore = usePostStore();
const notify = useNotify();

const commentText = ref('');
const isCommentBeingSent = ref(false);

async function sendComment() {
  if (commentText.value.length === 0) {
    notify.fail(i18n.t('emptyComment'));
    return;
  }
  isCommentBeingSent.value = true;
  await postStore.sendComment(props.post.id, commentText.value);
  notify.success(i18n.t('success'));
  isCommentBeingSent.value = false;
  commentText.value = '';
}
</script>

<style scoped></style>
