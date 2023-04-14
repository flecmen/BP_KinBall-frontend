<template>
  <q-card class="q-pa-xl">
    <q-form class="" ref="registerForm" @submit="login()">
      <q-input
        v-model="full_name"
        :label="$t('user.full_name')"
        type="text"
        lazy-rules
        :rules="[formRules.required]"
      />
      <q-input
        v-model="email"
        :label="$t('email.address')"
        type="email"
        lazy-rules
        :rules="[formRules.required, formRules.isEmail]"
        :error-message="error.email.message"
        :error="error.email.value"
        :hint="emailMessage"
      />
      <q-input
        v-model="password"
        :label="$t('password')"
        type="password"
        :rules="[formRules.required]"
      />
      <q-input
        v-model="password2"
        :label="$t('second.password')"
        type="password"
        :rules="[formRules.required]"
        :error="error.password.value"
        :error-message="error.password.message"
      />
      <q-btn
        class="float-right"
        color="primary"
        :label="$t('btn.register')"
        type="submit"
        :loading="userStore.isProcessing"
        @click="register()"
      ></q-btn>
    </q-form>
  </q-card>
</template>

<script setup lang="ts">
import { reactive, ref, watch } from 'vue';
import formRules from 'src/helpers/formRules';
import useNotify from 'src/composables/useNotify';
import { useUserStore } from 'src/stores/user-store';
import { useI18n } from 'vue-i18n';
import { debounce } from 'lodash';

const userStore = useUserStore();
const { t } = useI18n();
const notify = useNotify();

const error = reactive({
  email: {
    value: false,
    message: '',
  },
  password: {
    value: false,
    message: '',
  },
});

const email = ref('');
const password = ref('');
const password2 = ref('');
const full_name = ref('');

const emailMessage = ref('');

const registerForm = ref();

async function register() {
  // Validace formuláře
  if (!registerForm.value.validate()) {
    notify.fail(t('failed'));
    return;
  }
  await userStore.register(email.value, password.value, full_name.value);
}

// Create a debounced function using Lodash's debounce
const debouncedFunction = debounce(async (newVal: string) => {
  const isEmailFree = await userStore.checkEmail(newVal);
  console.log(isEmailFree);
  if (isEmailFree) {
    error.email.value = false;
    emailMessage.value = t('email.available');
  } else {
    error.email.value = true;
    error.email.message = t('email.is.taken');
  }
}, 2000);

// Watch for changes in the email value and call the debounced function
watch(email, (newVal) => {
  debouncedFunction(newVal);
});
</script>

<style scoped></style>
