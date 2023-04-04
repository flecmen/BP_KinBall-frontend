<template>
  <div class="row q-pa-lg bg-blue">
    <div class="text-h3">Welcome to Admin</div>
  </div>
  <div class="row q-mt-md q-gutter-xl q-pa-md">
    <AdminTile
      v-for="tile in props.tiles"
      v-bind:key="tile.title"
      :title="tile.title"
      :link="tile.link"
      :iconClass="tile.icon"
      :description="tile.description"
      :icon="tile.icon"
      class="tile"
    />
  </div>
</template>

<script setup lang="ts">
import AdminTile from 'src/components/admin/AdminTile.vue';
import { Tile } from 'src/data/adminConfig';

const props = defineProps<{
  tiles: Tile[];
}>();
</script>

<style scoped>
.tile {
  width: 300px;
  height: 300px;
}
</style>
