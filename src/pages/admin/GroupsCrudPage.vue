<template>
  <GroupModal
    v-if="isVisible.groupModal"
    v-model="isVisible.groupModal"
    :groupId="editedGroupId"
  />
  <div class="q-pa-md">
    <q-btn
      label="New"
      icon="add"
      color="positive"
      @click="showGroupModal(-1)"
    ></q-btn>
    <q-table
      :title="$t('users')"
      :loading="table.isLoading"
      :rows="table.rows"
      :columns="table.columns"
      row-key="id"
      :visible-columns="['edit', 'name', 'color']"
    >
      <!-- SEARCH BAR -->
      <template v-slot:top-right>
        <div class="q-gutter-md row items-start">
          <q-input
            borderless
            dense
            debounce="300"
            v-model="table.searchfilter"
            placeholder="Search"
          >
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>
        </div>
      </template>
      <!-- EDIT AND DELETE -->
      <template v-slot:body-cell-edit="props">
        <q-td :props="props" class="justify-center">
          <q-btn dense flat round color="red-5" icon="delete">
            <q-menu auto-close>
              <q-card class="my-card">
                <q-card-section class="bg-primary text-white">
                  <div class="text">
                    {{
                      $t('Are you sure to permanently delete') +
                      ' ' +
                      props.row.full_name +
                      '?'
                    }}
                  </div>
                </q-card-section>
                <q-card-actions align="right">
                  <q-btn
                    flat
                    color="white"
                    class="bg-red"
                    :label="$t('delete')"
                    :loading="isLoading.deleteBtn"
                    @click="deleteGroup(props.row.id)"
                  ></q-btn>
                </q-card-actions>
              </q-card>
            </q-menu>
          </q-btn>
          <q-btn
            dense
            flat
            round
            color="grey"
            icon="edit"
            @click="showGroupModal(props.row.id)"
          ></q-btn>
        </q-td>
      </template>

      <!-- GROUPS -->
      <template v-slot:body-cell-groups="props">
        <q-td :props="props">
          <GroupChip
            v-for="group in props.row.groups"
            v-bind:key="group.id"
            :group="group"
          />
        </q-td>
      </template>

      <!-- COLOR -->
      <template v-slot:body-cell-color="props">
        <q-td :props="props">
          <q-badge :color="props.row.color" />
        </q-td>
      </template>
    </q-table>
  </div>
</template>

<script setup lang="ts">
import { reactive, onMounted, computed, ref } from 'vue';
import { useAdminStore } from 'src/stores/admin-store';
import GroupChip from 'src/components/GroupChip.vue';
import { Group } from 'src/types/dbTypes';
import GroupModal from 'src/components/modals/GroupModal.vue';

const adminStore = useAdminStore();

onMounted(async () => {
  table.isLoading = true;
  await adminStore.loadGroups();
  table.isLoading = false;
});

const isLoading = reactive({
  deleteBtn: false,
  editBtn: false,
});

const isVisible = reactive({
  userModal: false,
  groupModal: false,
});

const editedGroupId = ref(-1);

async function deleteGroup(groupId: Group['id']) {
  isLoading.deleteBtn = true;
  await adminStore.deleteGroup(groupId);
  isLoading.deleteBtn = false;
}

function showGroupModal(groupId: Group['id']) {
  editedGroupId.value = groupId;
  isVisible.groupModal = true;
}

const table = reactive({
  columns: [
    // array of Objects
    // column Object definition
    {
      name: 'edit',
      label: '',
      field: '',
      align: 'left',
    },
    // unique id
    // identifies column
    {
      name: 'id',
      field: 'id',
    },
    {
      name: 'name',
      label: 'Name',
      field: 'name',
      align: 'left',
      sortOrder: 'ad', // or 'da'
    },
    {
      name: 'color',
      label: 'Color',
      field: 'color',
      align: 'left',
    },
  ],
  rows: computed(() => {
    return adminStore.groups.filter((group: Group) => {
      return group.name
        .toLowerCase()
        .includes(table.searchfilter.toLowerCase());
    });
  }),
  isLoading: true,
  searchCol: '',
  searchfilter: '',
});
</script>

<style scoped></style>
