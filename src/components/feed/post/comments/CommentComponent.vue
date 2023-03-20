<template>
  <q-card flat>
    <q-card-section>
      <div class="post-name text-bold">
        {{ props.comment.author.full_name }}
      </div>
      <div class="text-caption">
        {{ dateFormat(props.comment.time_of_creation) }}
      </div>
    </q-card-section>
    <q-card-section>
      {{ text }}
      <q-card-actions align="right" side>
        <q-btn
          label="like"
          @click="postStore.likeComment(comment.postId, comment.id)"
          :color="
            comment.likes.some((u) => u.id === userStore.user.id)
              ? 'positive'
              : 'primary'
          "
        >
          <q-badge
            v-if="props.comment.likes.length > 0"
            color="orange"
            floating
            >{{ props.comment.likes.length }}</q-badge
          >
        </q-btn>
      </q-card-actions>
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
import dateFormat from 'src/helpers/dateFormat';
import { defineProps, onMounted, ref } from 'vue';
import { Post_comment_extended } from 'src/types/dbTypes';
import { usePostStore } from 'src/stores/post-store';
import { useUserStore } from 'src/stores/user-store';

export interface Props {
  comment: Post_comment_extended;
  isMobile: boolean;
}
const props = defineProps<Props>();

const postStore = usePostStore();
const userStore = useUserStore();

const text = ref('');

onMounted(() => {
  text.value = props.comment.text;
});
</script>

<style scoped></style>
