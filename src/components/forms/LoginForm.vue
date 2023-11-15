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
        :label="$t('form.input.password.text')"
        type="password"
        :rules="[formRules.required]"
      />
      <q-btn
        class="float-right"
        color="primary"
        :label="$t('btn.log.in')"
        type="submit"
        :loading="isLoading"
      ></q-btn>
    </q-form>
    {{ $t('no_account') }}
    <router-link
      :to="{ name: 'register' }"
      style="text-decoration: none; color: inherit"
      >{{ $t('btn.register') }}</router-link
    >
  </q-card>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import formRules from 'src/helpers/formRules';
import useNotify from 'src/composables/useNotify';
import { useUserStore } from 'src/stores/user-store';

const userStore = useUserStore();
const notify = useNotify();

const email = ref('');
const password = ref('');
const isLoading = ref(false);

const loginForm = ref();
async function login() {
  isLoading.value = true;
  // Validace formuláře
  if (!loginForm.value.validate()) {
    notify.fail('failed');
    isLoading.value = false;
    return;
  }
  await userStore.login(email.value, password.value);
  isLoading.value = false;
}
</script>
