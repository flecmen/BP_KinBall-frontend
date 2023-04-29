<template>
  <q-card>
    <q-card-section class="row q-pa-lg bg-blue">
      <h2 class="text-white">{{ $t('profile.settings') }}</h2>
    </q-card-section>

    <q-card-section class="row">
      <div class="col-4">
        <h5 class="text-h5">{{ $t('profile.change.details') }}</h5>
        <UserForm
          :user="userStore.user"
          :include="{ groupSelector: false, roleSelector: false }"
        />
      </div>
    </q-card-section>

    <q-card-section class="row">
      <div class="col-auto">
        <h5 class="text-h5">{{ $t('settings.notification') }}</h5>
        <UserSettingsForm />
      </div>
    </q-card-section>

    <q-card-section class="col q-pa-md">
      <h5>Change password</h5>
      <div class="row">
        <ChangePasswordForm class="col-4" />
      </div>
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
import UserSettingsForm from 'src/components/forms/UserSettingsForm.vue';
import ChangePasswordForm from 'src/components/forms/ChangePasswordForm.vue';
import UserForm from 'src/components/forms/UserForm.vue';
import { useUserStore } from 'src/stores/user-store';

const userStore = useUserStore();
</script>

<style scoped></style>
