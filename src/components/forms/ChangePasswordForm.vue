<template>
  <q-form>
    <q-input
      v-model="password"
      outlined
      :type="isPwd1 ? 'password' : 'text'"
      :label="$t('Password')"
      :rules="[formRules.required]"
      ><template v-slot:append>
        <q-icon
          :name="isPwd1 ? 'visibility_off' : 'visibility'"
          class="cursor-pointer"
          @click="isPwd1 = !isPwd1"
        />
      </template>
    </q-input>
    <q-input
      v-model="passwordConfirm"
      outlined
      :type="isPwd2 ? 'password' : 'text'"
      :label="$t('Confirm password')"
      :rules="[formRules.required]"
      :error-message="errorMessage"
      :error="showError"
    >
      <template v-slot:append>
        <q-icon
          :name="isPwd2 ? 'visibility_off' : 'visibility'"
          class="cursor-pointer"
          @click="isPwd2 = !isPwd2"
        />
      </template>
    </q-input>
    <div align="right">
      <q-btn
        :loading="loading"
        :disabled="loading"
        color="primary"
        :label="$t('Change password')"
        @click="changePassword()"
      />
    </div>
  </q-form>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import formRules from 'src/helpers/formRules';
import { useUserStore } from 'src/stores/user-store';

const userStore = useUserStore();

const password = ref('');
const isPwd1 = ref(true);
const isPwd2 = ref(true);
const passwordConfirm = ref('');
const loading = ref(false);
const showError = ref(false);
const errorMessage = computed(() => {
  if (password.value !== passwordConfirm.value) {
    return 'Passwords do not match';
  }
  return '';
});

async function changePassword() {
  if (errorMessage.value !== '') {
    showError.value = true;
    return;
  }
  loading.value = true;
  await userStore.changePassword(password.value);
  password.value = '';
  passwordConfirm.value = '';
  loading.value = false;
}
</script>

<style scoped></style>
