<template>
  <div
    class="post-name text-bold userName"
    @click="
      router.push({
        name: 'user-profile',
        params: { userId: props.user.id },
      })
    "
  >
    {{ props.user.full_name }}
  </div>
</template>

<script setup lang="ts">
import { User_extended } from 'src/types/dbTypes';
import { useRouter } from 'vue-router';

const props = defineProps<{
  user: User_extended;
}>();

const router = useRouter();
</script>

<style scoped>
.userName {
  cursor: pointer;
}
</style>
