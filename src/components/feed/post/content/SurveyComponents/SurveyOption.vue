<template>
  <q-item class="col-12 q-pa-none">
    <q-checkbox v-model="checked" @vnode-updated="checking()" />
    <q-item-section>
      <div class="text-weight-bold">
        {{ props.option.text }}
      </div>
      <div class="bg-grey-2">
        <div :style="{ width: percentage + '%' }" :class="color"></div>
      </div>
      <div>votes: {{ option.votes.length }}</div>
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
  const percentage = (props.option.votes.length / props.total_votes) * 100;
  if (isNaN(percentage)) {
    return 0;
  } else {
    return percentage;
  }
});

const color = computed(() => {
  if (percentage.value > 75) {
    return 'bg-green';
  } else if (percentage.value > 50) {
    return 'bg-yellow';
  } else if (percentage.value > 25) {
    return 'bg-orange';
  } else {
    return 'bg-red';
  }
});
</script>

<style scoped>
.bg-grey-2 div {
  height: 10px;
}
.bg-green {
  background-color: green;
}
.bg-yellow {
  background-color: yellow;
}
.bg-orange {
  background-color: orange;
}
.bg-red {
  background-color: red;
}
</style>
