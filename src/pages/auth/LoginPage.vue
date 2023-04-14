<template>
  <div class="row">
    <component
      :is="form"
      class="fixed-center col-lg-3 col-md-4 col-sm-6 col-xs-10"
    ></component>
  </div>
</template>

<script setup lang="ts">
import LoginForm from 'src/components/forms/LoginForm.vue';
import RegisterForm from 'src/components/forms/RegisterForm.vue';
import { computed } from 'vue';

const props = defineProps<{
  form: 'login' | 'register';
}>();

const form = computed(() => {
  if (props.form === 'login') return LoginForm;
  else return RegisterForm;
});
</script>
<style></style>
