<!-- eslint-disable vue/no-mutating-props -->
<template>
  <q-select
    filled
    v-model="selectedGroups"
    multiple
    :options="groupsSelection"
    use-chips
    stack-label
    label="Groups"
    option-label="name"
    @filter="filterGroups"
    use-input
    @update:model-value="emit('groupsUpdate', selectedGroups)"
  >
    <template v-slot:option="scope">
      <q-item v-bind="scope.itemProps">
        <q-item-section>
          <q-item-label>{{ scope.opt.name }}</q-item-label>
        </q-item-section>
      </q-item>
    </template>
  </q-select>
  {{ groupSelection }}
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { Group } from 'src/types/dbTypes';
import { useUserStore } from 'src/stores/user-store';
import { useAdminStore } from 'src/stores/admin-store';

export interface Props {
  groups: Group[];
}
const props = defineProps<Props>();

const emit = defineEmits<{
  (event: 'groupsUpdate', groups: Group[]): void;
}>();

const userStore = useUserStore();
const adminStore = useAdminStore();

onMounted(async () => {
  await adminStore.loadGroups();
});

const groupsSelection = ref<Group[]>(
  JSON.parse(JSON.stringify(adminStore.groups))
);
const selectedGroups = ref<Group[]>(props.groups);

function filterGroups(val: string, update) {
  if (val === '') {
    groupsSelection.value = JSON.parse(JSON.stringify(adminStore.groups));
    return;
  }
  update(() => {
    const needle = val.toLowerCase();
    groupsSelection.value = JSON.parse(JSON.stringify(adminStore.groups));
    groupsSelection.value = groupsSelection.value.filter(
      (v) => v?.name.toLowerCase().indexOf(needle) > -1
    );
    return;
  });
}
</script>

<style scoped></style>
