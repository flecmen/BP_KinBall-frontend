<template>
  <q-item class="col-12 q-pa-none">
    <q-checkbox v-model="checked" @vnode-updated="checking()" />
    <q-item-section>
      <div class="text-weight-bold">
        {{ props.option.text }}
      </div>
      <q-linear-progress :color="color" :value="percentage" rounded />
      <div>
        votes: {{ option.votes.length }} | {{ Math.round(percentage * 100) }}%
      </div>
    </q-item-section>
  </q-item>
</template>

<script setup lang="ts">
import { Survey_option_extended } from 'src/types/dbTypes';
import { computed, ref } from 'vue';
import useNotify from 'src/composables/useNotify';
import { usePostStore } from 'src/stores/post-store';
import { useUserStore } from 'src/stores/user-store';

const props = defineProps<{
  postId: number;
  option: Survey_option_extended;
  total_votes: number;
}>();

const notify = useNotify();
const postStore = usePostStore();
const userStore = useUserStore();

const checked = ref(props.option.votes.some((u) => u.id === userStore.user.id));

async function checking() {
  const n = notify.wait('Adding your vote ...');
  await postStore.changeSurvey_optionValue(
    checked.value,
    props.postId,
    props.option.id
  );
  notify.resolve_wait(n);
}

const percentage = computed(() => {
  const percentage = props.option.votes.length / props.total_votes;
  if (isNaN(percentage)) {
    return 0;
  } else {
    return percentage;
  }
});

const color = computed(() => {
  if (percentage.value > 0.75) {
    return 'green';
  } else if (percentage.value > 0.5) {
    return 'yellow';
  } else if (percentage.value > 0.25) {
    return 'orange';
  } else {
    return 'red';
  }
});
</script>

<style scoped></style>
