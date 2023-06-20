<template>
  <q-dialog ref="dialog">
    <q-card>
      <q-card-section>
        <UserForm
          :user="user"
          :include="{ groupSelector: true, roleSelector: true }"
          :newUser="isThisNewUser"
          @close-dialog="dialog.hide()"
          @shake="dialog.shake()"
        />
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { User_extended } from 'src/types/dbTypes';
import { useAdminStore } from 'src/stores/admin-store';
import UserForm from '../forms/UserForm.vue';

const props = defineProps<{
  userId: User_extended['id'];
  newUser?: boolean;
}>();

const adminStore = useAdminStore();

const isThisNewUser = computed(() => {
  return props.userId === -1;
});

const user = ref(
  isThisNewUser.value
    ? adminStore.newUser
    : JSON.parse(JSON.stringify(adminStore.getLocalUser(props.userId) ?? {}))
);

const dialog = ref();
</script>

<style scoped></style>
