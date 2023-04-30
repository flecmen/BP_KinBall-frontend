<template>
  <q-card class="q-pa-xl">
    <q-form class="" ref="loginForm" @submit="login()">
      <q-input
        v-model="email"
        :label="$t('email.address')"
        type="email"
        lazy-rules
        :rules="[formRules.required, formRules.isEmail]"
      />
      <q-input
        v-model="password"
        :label="$t('password')"
        type="password"
        :rules="[formRules.required]"
      />
      <q-btn
        class="float-right"
        color="primary"
        :label="$t('btn.log.in')"
        type="submit"
        :loading="userStore.isProcessing"
      ></q-btn>
    </q-form>
  </q-card>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import formRules from 'src/helpers/formRules';
import useNotify from 'src/composables/useNotify';
import { useUserStore } from 'src/stores/user-store';
import { i18n } from 'src/utils/i18n';

const userStore = useUserStore();
const notify = useNotify();

const email = ref('');
const password = ref('');

const loginForm = ref();
async function login() {
  // Validace formuláře
  if (!loginForm.value.validate()) {
    notify.fail('failed');
    return;
  }
  await userStore.login(email.value, password.value);
}
</script>
