<template>
  <q-card class="q-pa-xl">
    <q-form class="" ref="form">
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
        :error="error.email.show"
        :hint="emailMessage"
        :loading="emailLoading"
        @update:model-value="() => (emailLoading = true)"
      >
      </q-input>
      <PasswordInput @update:password="(psw: string) => (password = psw)" />
      <PasswordInput
        :showError="error.password.show"
        :errorMessage="error.password.message"
        :label="$t('form.input.password.confirm')"
        @update:password="(psw: string) => (password2 = psw)"
      />

      <q-btn
        class="float-right"
        color="primary"
        :label="$t('btn.register')"
        type="submit"
        :loading="isLoading"
        @click="register()"
      ></q-btn>
    </q-form>
    {{ $t('have_account') }}
    <router-link
      :to="{ name: 'login' }"
      style="text-decoration: none; color: inherit"
      >{{ $t('btn.log.in') }}</router-link
    >
  </q-card>
</template>

<script setup lang="ts">
import { reactive, ref, watch, computed } from 'vue';
import formRules from 'src/helpers/formRules';
import useNotify from 'src/composables/useNotify';
import { useUserStore } from 'src/stores/user-store';
import { i18n } from 'src/utils/i18n';
import { debounce } from 'lodash';
import PasswordInput from './inputs/passwordInput.vue';
import { router } from 'src/router/index'

const userStore = useUserStore();
const notify = useNotify();

const error = reactive({
  email: {
    show: false,
    message: '',
  },
  password: {
    show: computed(() => password.value !== password2.value),
    message: computed(() => {
      if (password.value !== password2.value) {
        return 'Passwords do not match';
      }
      return '';
    }),
  },
});

const email = ref('');
const password = ref('');
const password2 = ref('');
const full_name = ref('');
const emailLoading = ref(false);
const isLoading = ref(false);

const emailMessage = ref('');

const form = ref();

async function register() {
  isLoading.value = true;
  // Validace formuláře
  if (!(await form.value.validate()) || error.password.show) {
    notify.fail(i18n.t('failed'));
    isLoading.value = false;
    return;
  }

  await userStore.register(email.value, password.value, full_name.value);
  isLoading.value = false;
  router.push({ name: 'login' });
}

// Create a debounced function using Lodash's debounce
const debouncedFunction = debounce(async (newVal: string) => {
  const isEmailFree = await userStore.checkEmail(newVal);
  console.log(isEmailFree);
  if (isEmailFree) {
    error.email.show = false;
    emailMessage.value = i18n.t('form.rules.email.avaiable');
  } else {
    error.email.show = true;
    error.email.message = i18n.t('form.rules.email.taken');
  }
  emailLoading.value = false;
}, 2000);

// Watch for changes in the email value and call the debounced function
watch(email, (newVal) => {
  debouncedFunction(newVal);
});
</script>

<style scoped></style>
