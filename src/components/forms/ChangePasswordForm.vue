<template>
  <q-form ref="form">
    <PasswordInput @update:password="(psw: string) => (password = psw)" />
    <PasswordInput
      :showError="showError"
      :errorMessage="errorMessage"
      :label="$t('form.input.password.confirm')"
      @update:password="(psw: string) => (passwordConfirm = psw)"
    />

    <div align="right">
      <q-btn
        :loading="isLoading"
        :disabled="isLoading"
        color="primary"
        :label="$t('Change password')"
        @click="changePassword()"
      />
    </div>
  </q-form>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useUserStore } from 'src/stores/user-store';
import PasswordInput from './inputs/passwordInput.vue';

const userStore = useUserStore();

const password = ref('');
const passwordConfirm = ref('');
const isLoading = ref(false);

const showError = ref(false);
const errorMessage = computed(() => {
  if (password.value !== passwordConfirm.value) {
    return 'Passwords do not match';
  }
  return '';
});

const form = ref();
async function changePassword() {
  if (errorMessage.value !== '') {
    showError.value = true;
    return;
  }
  isLoading.value = true;
  await userStore.changePassword(password.value);
  password.value = '';
  passwordConfirm.value = '';
  isLoading.value = false;
}
</script>

<style scoped></style>
