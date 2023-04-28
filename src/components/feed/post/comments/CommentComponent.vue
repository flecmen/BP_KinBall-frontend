<template>
  <q-card flat class="bg-grey-2">
    <q-card-section>
      <UserName :user="props.comment.author" />
      <div class="text-caption">
        {{ dateFormat(props.comment.time_of_creation) }}
      </div>
    </q-card-section>
    <q-card-section class="q-pb-none q-pt-none">
      {{ text }}
    </q-card-section>
    <q-card-actions align="right" side>
      <LikeButton
        :isBeingLiked="isLoading.like"
        :color="
          comment.likes.some((u) => u.id === userStore.user.id) ? 'red' : ''
        "
        :likesCount="props.comment.likes.length"
        :showLikes="true"
        @like="likeComment()"
      />
    </q-card-actions>
  </q-card>
</template>

<script setup lang="ts">
import dateFormat from 'src/helpers/dateFormat';
import { onMounted, reactive, ref } from 'vue';
import { Post_comment_extended } from 'src/types/dbTypes';
import { usePostStore } from 'src/stores/post-store';
import { useUserStore } from 'src/stores/user-store';
import UserName from '../components/UserName.vue';
import LikeButton from 'src/components/buttons/LikeButton.vue';

export interface Props {
  comment: Post_comment_extended;
}
const props = defineProps<Props>();

onMounted(() => {
  text.value = props.comment.text;
});

const postStore = usePostStore();
const userStore = useUserStore();

const text = ref('');
const isLoading = reactive({
  like: false,
});

async function likeComment() {
  isLoading.like = true;
  await postStore.likeComment(props.comment.postId, props.comment.id);
  isLoading.like = false;
}
</script>

<style scoped></style>
