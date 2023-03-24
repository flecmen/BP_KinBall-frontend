<template>
  <q-dialog>
    <q-card>
      <q-card-section>
        <div class="text-h6">Create a new event</div>
      </q-card-section>

      <q-card-section v-if="postStore.newPost.type === postType.event">
        <q-select
          outlined
          v-model="postStore.newPost.event.eventType"
          :options="eventTypes"
          label="Event"
        />
      </q-card-section>
      <q-card-actions align="right">
        <q-btn flat label="OK" color="primary" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { usePostStore } from 'src/stores/post-store';
import { postType, eventType, Event_extended } from 'src/types/dbTypes';
import { onMounted } from 'vue';

onMounted(() => {
  postStore.newPost.event = {} as Event_extended;
});

const postStore = usePostStore();

const eventTypes = Object.values(eventType);
</script>

<style scoped></style>
