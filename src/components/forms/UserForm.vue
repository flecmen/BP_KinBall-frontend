<template>
  <q-form ref="form">
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
      :error="error.groups.show"
      :errorMessage="error.groups.errorMessage"
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
import useNotify from 'src/composables/useNotify';
import formRules from 'src/helpers/formRules';
import { role, Group } from 'src/types/dbTypes';
import { ref, computed, reactive } from 'vue';
import { i18n } from 'src/utils/i18n';
import GroupsSelector from './GroupsSelector.vue';

const props = defineProps<{
  user?: User_extended;
  include: {
    groupSelector: boolean;
    roleSelector: boolean;
  };
  newUser?: boolean;
}>();

const emit = defineEmits<{
  (event: 'close-dialog'): void;
  (event: 'shake'): void;
}>();

const userStore = useUserStore();
const adminStore = useAdminStore();
const notify = useNotify();

const isLoading = ref(false);
const user = ref<User_extended>(
  props.user ? props.user : ({} as User_extended)
);
const form = ref();

const error = reactive({
  groups: {
    show: false,
    errorMessage: '',
  },
});

const isUserEdittingHimself = computed(() => {
  return userStore.user.id === props.user?.id;
});

const isThisNewUser = computed(() => {
  if (props.newUser) return true;
  else return false;
});

const userRoleOptions = Object.entries(role).map(([key, value]) => ({
  label: value,
  value: key,
}));

function updateGroups(groups: Group[]) {
  user.value.groups = groups;
}

async function createOrUpdateUser() {
  //validate
  if (!(await form.value.validate())) return;
  if (!user.value.groups || user.value.groups.length === 0) {
    error.groups.show = true;
    error.groups.errorMessage = i18n.t('form.rules.groups');
    notify.fail(i18n.t('notify.missing.groups'));
    return;
  }

  isLoading.value = true;
  if (isUserEdittingHimself.value) {
    // user edits his profile
    await userStore.updateUserProfile(user.value);
  } else {
    console.log(props.user);
    if (isThisNewUser.value) {
      // admin creates new user
      if (!(await adminStore.createNewUser())) {
        emit('shake');
        isLoading.value = false;
        return;
      }
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
