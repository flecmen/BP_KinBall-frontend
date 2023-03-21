<template>
  <q-form class="" ref="loginForm" @submit="login()">
    <q-input
      v-model="email"
      :label="$t('email.address')"
      type="email"
      lazy-rules
      :rules="[formRules.required, formRules.isEmail]"
      siz
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
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { router } from 'src/router/index';
import formRules from 'src/helpers/formRules';
import useNotify from 'src/composables/useNotify';
import { useUserStore } from 'src/stores/user-store';
import { useI18n } from 'vue-i18n';

const userStore = useUserStore();
const { t } = useI18n();
const notify = useNotify();

const email = ref('');
const password = ref('');

const loginForm = ref();
async function login() {
  // Validace formuláře
  if (!loginForm.value.validate()) {
    notify.fail(t('failed'));
    return;
  }
  await userStore.login(email.value, password.value);
}
</script>
