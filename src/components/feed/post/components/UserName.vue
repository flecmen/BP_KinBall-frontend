<template>
  <div
    class="text-bold cursor-pointer"
    @click="
      router.push({
        name: 'user-profile',
        params: { userId: props.user.id },
      })
    "
  >
    {{ props.user.full_name }}
    <sup class="superscript">{{ props.user.role }}</sup>
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
.superscript {
  vertical-align: super;
  font-size: smaller;
}
</style>
