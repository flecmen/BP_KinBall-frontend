<template>
  <q-form class="" ref="loginForm" @submit="login()">
    <q-input
      v-model="email"
      label="email"
      type="email"
      lazy-rules
      :rules="[rules.required, rules.isEmail]"
      siz
    />
    <q-input
      v-model="password"
      label="heslo"
      type="password"
      :rules="[rules.required]"
    />
    <q-btn
      class="float-right"
      color="primary"
      label="přihlásit"
      type="submit"
      :loading="userStore.isProcessing"
    ></q-btn>
  </q-form>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import config from 'src/config';
import useNotify from 'src/composables/useNotify';
import { useUserStore } from 'src/stores/user-store';

const userStore = useUserStore();
const notify = useNotify();

const email = ref('');
const password = ref('');

const rules = {
  required: (value: string) => !!value || 'Required',
  isEmail: (value: string) =>
    config.regex_email.test(value) || 'Zadejte platný email',
};

const loginForm = ref();
async function login() {
  // Validace formuláře
  if (!loginForm.value.validate()) {
    notify.fail('Something is wrong');
  }
  await userStore.login(email.value, password.value);
  return;
}
</script>
