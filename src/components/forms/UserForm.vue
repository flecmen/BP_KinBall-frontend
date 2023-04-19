<template>
  <q-form>
    <!-- Full Name -->
    <q-input
      v-model="user.full_name"
      label="Name"
      filled
      :rules="[formRules.required]"
    />

    <!-- Email -->
    <q-input
      v-model="user.email"
      label="Email"
      filled
      :rules="[formRules.required, formRules.isEmail]"
    />

    <!-- Role -->
    <q-select
      v-if="props.include.roleSelector"
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

    <!-- Groups -->
    <GroupsSelector
      v-if="props.include.groupSelector"
      :groups="user.groups"
      @groups-update="updateGroups"
    />
  </q-form>
  <q-btn
    label="Submit"
    color="primary"
    @click="createOrUpdateUser()"
    :loading="isLoading"
  />
</template>

<script setup lang="ts">
import { User_extended } from 'src/types/dbTypes';
import { useUserStore } from 'src/stores/user-store';
import { useAdminStore } from 'src/stores/admin-store';
import formRules from 'src/helpers/formRules';
import { role, Group } from 'src/types/dbTypes';
import { ref, onMounted, computed } from 'vue';

const props = defineProps<{
  user?: User_extended;
  include: {
    groupSelector: boolean;
    roleSelector: boolean;
  };
}>();

const emit = defineEmits<{
  (event: 'close-dialog'): void;
}>();

const userStore = useUserStore();
const adminStore = useAdminStore();

const isLoading = ref(false);
const isThisNewUser = ref(false);

onMounted(() => {
  isThisNewUser.value = !props.user;
});

const isUserEdittingHimself = computed(() => {
  return userStore.user.id === props.user?.id;
});

const user = ref<User_extended>(
  props.user ? props.user : ({} as User_extended)
);

const userRoleOptions = Object.entries(role).map(([key, value]) => ({
  label: value,
  value: key,
}));

function updateGroups(groups: Group[]) {
  user.value.groups = groups;
}

async function createOrUpdateUser() {
  isLoading.value = true;
  if (isUserEdittingHimself.value) {
    // user edits his profile
    await userStore.updateUserProfile(user.value);
  } else {
    if (isThisNewUser.value) {
      // admin creates new user
      await adminStore.createNewUser();
    } else {
      // admin edits user
      await adminStore.updateUser(user.value);
    }
  }
  isLoading.value = false;
  emit('close-dialog');
}
</script>

<style scoped></style>
