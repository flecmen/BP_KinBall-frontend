<template>
  <q-card>
    <q-card-section>
      <h2>{{ $t('User settings') }}</h2>
    </q-card-section>
    <q-card-section class="row">
      <div class="col-auto">
        <p>Notification settings</p>
        <UserSettingsForm />
      </div>
    </q-card-section>
    <h5>Change password</h5>
    <q-card-section class="row q-pa-md">
      <ChangePasswordForm class="col-4" />
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
import UserSettingsForm from 'src/components/forms/UserSettingsForm.vue';
import ChangePasswordForm from 'src/components/forms/ChangePasswordForm.vue';
</script>

<style scoped></style>
