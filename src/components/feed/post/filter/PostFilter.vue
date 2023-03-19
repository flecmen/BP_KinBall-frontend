<template>
  <div>
    <q-card>
      <q-card-section>
        <div class="text-h6">Feed filter</div>
      </q-card-section>
      <q-card-section>
        <q-toggle> </q-toggle>
      </q-card-section>
    </q-card>
  </div>
</template>

<script setup lang="ts">
import { Post_extended } from 'src/types/dbTypes';
import { usePostStore } from 'src/stores/post-store';
import { useUserStore } from 'src/stores/user-store';

const postStore = usePostStore();
const userStore = useUserStore();
</script>

<style scoped></style>
