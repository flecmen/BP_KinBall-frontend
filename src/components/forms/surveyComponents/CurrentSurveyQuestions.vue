<template>
  <q-list>
    <q-item
      v-for="(option, index) in postStore.newPost.survey_options"
      v-bind:key="option.text"
    >
      <q-item-lable>{{ index + 1 }})</q-item-lable>
      <q-item-section>
        {{ option.text }}
      </q-item-section>
      <q-item-section>
        <q-btn
          @click="postStore.removeSurvey_option(index)"
          :label="$t('btn.delete')"
          color="primary"
          flat
        ></q-btn>
      </q-item-section>
    </q-item>
  </q-list>
</template>

<script setup lang="ts">
import { usePostStore } from 'src/stores/post-store';

const postStore = usePostStore();
</script>

<style scoped></style>
