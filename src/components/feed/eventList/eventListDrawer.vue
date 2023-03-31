<template>
  <q-drawer side="right" bordered :width="200" :breakpoint="500">
    <q-scroll-area class="fit">
      <div class="q-pa-sm">
        <div v-for="n in 50" :key="n">Drawer {{ n }} / 50</div>
      </div>
    </q-scroll-area>
  </q-drawer>
</template>

<script setup lang="ts"></script>

<style scoped></style>
