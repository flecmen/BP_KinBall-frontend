<template>
  <q-card flat>
    <q-card-section class="row justify-between">
      <div class="col-6">
        <div class="text-h6">Čas: {{ dateFormat(props.post.event?.time) }}</div>
        <div class="text-h6">
          <q-icon name="location_on" color="red" />{{
            props.post.event?.address_short
          }}
        </div>
        <div class="text-h6">{{ props.post.event?.organiser.full_name }}</div>
      </div>

      <EventPrice :price="props.post.event?.price" />
    </q-card-section>

    <q-separator />

    <q-card-section align="left">
      <div class="text-h6">
        Přihlášeno: {{ props.post.event?.players.length }}/{{
          props.post.event?.people_limit
        }}
      </div>
      <q-btn label="I'm coming"></q-btn>
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
import { Post_extended } from 'src/types/dbTypes';
import dateFormat from 'src/helpers/dateFormat';
import EventPrice from './contentComponents/EventPrice.vue';

export interface Props {
  post: Post_extended;
  isMobile: boolean;
}
const props = defineProps<Props>();
</script>

<style scoped></style>
