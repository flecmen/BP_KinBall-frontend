<template>
  <div class="xp-bar">
    <div class="level">Level {{ level }}</div>
    <div class="bar">
      <q-linear-progress color="primary" height="10px" :value="progress" />
    </div>
    <p>{{ xp }}</p>
    <div class="awards">
      <div class="award" v-for="(award, index) in awards" :key="index">
        <q-avatar
          class="award-avatar"
          size="30px"
          :src="award.image"
          alt="Award"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, defineProps } from 'vue';

const props = defineProps<{
  xp: number;
  maxXp: number;
  level: number;
  awards: Award[];
}>();

interface Award {
  image: string;
}

const progress = computed(() => {
  return props.xp / props.maxXp;
});
</script>

<style scoped>
.xp-bar {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.level {
  margin-top: 20px;
  font-size: 24px;
  font-weight: bold;
}

.bar {
  margin-top: 10px;
  width: 100%;
}

.awards {
  display: flex;
  justify-content: center;
  margin-top: 10px;
}

.award {
  margin: 0 5px;
}

.award-avatar {
  border: 2px solid #fff;
}
</style>
