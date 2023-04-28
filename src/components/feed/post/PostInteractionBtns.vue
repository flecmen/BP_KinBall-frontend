<template>
  <q-card-section class="flex justify-between q-pb-none">
    <div class="text-center">
      <LikeButton
        :isBeingLiked="isBeingLiked"
        :likesCount="props.post.likes.length"
        :color="post.likes.some((u) => u.id === userStore.user.id) ? 'red' : ''"
        :showLikes="false"
        @like="likePost"
      />
      <div>{{ props.post.likes.length }} {{ $t('post.reaction.likes') }}</div>
    </div>

    <div class="text-center">
      <q-btn flat icon="comment" @click="emit('showComments')">
        <q-tooltip>{{ $t('tooltip.comment.show') }}</q-tooltip>
      </q-btn>
      <div>
        {{ props.post.comments.length }} {{ $t('post.reaction.comments') }}
      </div>
    </div>

    <div class="invisible">
      <q-toggle
        v-model="isFollowing"
        flat
        :label="$t('post.reaction.follow')"
      />
    </div>
  </q-card-section>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Post_extended } from 'src/types/dbTypes';
import { usePostStore } from 'src/stores/post-store';
import { useUserStore } from 'src/stores/user-store';
import LikeButton from 'src/components/buttons/LikeButton.vue';

export interface Props {
  post: Post_extended;
  isMobile: boolean;
}
const props = defineProps<Props>();
const emit = defineEmits<{
  (event: 'showComments'): void;
}>();

const postStore = usePostStore();
const userStore = useUserStore();

const isBeingLiked = ref<boolean>(false);

//TODO: implement follow
const isFollowing = ref<boolean>(false);

async function likePost() {
  isBeingLiked.value = true;
  await postStore.likePost(props.post.id);
  isBeingLiked.value = false;
}
</script>

<style scoped></style>
