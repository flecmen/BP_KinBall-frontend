<template>
  <q-dialog ref="dialog">
    <q-card>
      <q-card-section>
        <q-form>
          <q-input
            v-model="user.full_name"
            label="Name"
            filled
            :rules="[formRules.required]"
          />

          <q-input
            v-model="user.email"
            label="Email"
            filled
            :rules="[formRules.required, formRules.isEmail]"
          />

          <q-select
            label="Role"
            v-model="user.role"
            :options="userRoleOptions"
            filled
            emit-value
            map-options
            options-dense
            :rules="[formRules.required]"
          >
          </q-select>

          <GroupsSelector :groups="user.groups" @groups-update="updateGroups" />
        </q-form>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn
          label="Submit"
          color="primary"
          @click="createOrUpdateUser()"
          :loading="isLoading"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { Group, User_extended, role } from 'src/types/dbTypes';
import { useAdminStore } from 'src/stores/admin-store';
import GroupsSelector from '../forms/GroupsSelector.vue';
import formRules from 'src/helpers/formRules';

const props = defineProps<{
  userId: User_extended['id'];
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

const isLoading = ref(false);
const dialog = ref();

const userRoleOptions = Object.entries(role).map(([key, value]) => ({
  label: value,
  value: key,
}));

function updateGroups(groups: Group[]) {
  user.value.groups = groups;
}

async function createOrUpdateUser() {
  isLoading.value = true;
  if (isThisNewUser.value) {
    await adminStore.createNewUser();
  } else {
    await adminStore.updateUser(user.value);
  }
  isLoading.value = false;
  dialog.value.hide();
}
</script>

<style scoped></style>
