<template>
  <q-select
    v-model="selectedGroups"
    :options="groupOptions"
    filled
    multiple
    use-chips
    label="Groups"
    option-label="name"
    use-input
    @update:model-value="emit('groupsUpdate', selectedGroups)"
    emit-value
    hide-dropdown-icon
    @filter="updateInput"
    :error="props.error"
    :error-message="props.errorMessage"
  >
    <template v-slot:option="scope">
      <q-item v-bind="scope.itemProps">
        <q-item-section>
          <q-item-label>{{ scope.opt.name }}</q-item-label>
        </q-item-section>
      </q-item>
    </template>
  </q-select>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { Group, role } from 'src/types/dbTypes';
import { useAdminStore } from 'src/stores/admin-store';
import { useUserStore } from 'src/stores/user-store';

export interface Props {
  groups: Group[];
  error: boolean;
  errorMessage: string;
}
const props = defineProps<Props>();

const emit = defineEmits<{
  (event: 'groupsUpdate', groups: Group[]): void;
}>();

const adminStore = useAdminStore();
const userStore = useUserStore();

onMounted(async () => {
  await adminStore.loadGroups();
});

const selectedGroups = ref(props.groups);
const groupOptions = ref(
  userStore.user.role === role.admin || userStore.user.role === role.coach
    ? JSON.parse(JSON.stringify(adminStore.groups))
    : JSON.parse(JSON.stringify(userStore.user.groups))
);

ref<Group[]>(JSON.parse(JSON.stringify(adminStore.groups)));

function updateInput(
  inputValue: string,
  doneFn: (callbackFn: () => void) => void
) {
  doneFn(() => {
    if (inputValue === '') {
      groupOptions.value = JSON.parse(JSON.stringify(adminStore.groups));
    } else {
      groupOptions.value = JSON.parse(
        JSON.stringify(
          adminStore.groups.filter((g) =>
            g.name.toLowerCase().includes(inputValue.toLowerCase())
          )
        )
      );
    }
  });
}
</script>

<style scoped></style>
