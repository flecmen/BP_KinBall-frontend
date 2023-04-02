<template>
  <UserModal
    v-if="isVisible.userModal"
    v-model="isVisible.userModal"
    :userId="editedUserId"
  />
  <div class="q-pa-md">
    <q-btn
      label="New"
      icon="add"
      color="positive"
      @click="showUserModal()"
    ></q-btn>
    <q-table
      :title="$t('users')"
      :loading="table.isLoading"
      :rows="table.rows"
      :columns="table.columns"
      row-key="id"
      :visible-columns="['edit', 'name', 'email', 'role', 'groups']"
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
                    Určitě TRVALE smazat zákazníka "{{
                      props.row.nazev_firmy
                    }}"?
                  </div>
                </q-card-section>
                <q-card-actions align="right">
                  <q-btn
                    flat
                    color="white"
                    class="bg-red"
                    :label="$t('delete')"
                    :loading="isLoading.deleteBtn"
                    @click="deleteUser(props.row.id)"
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
            @click="showUserModal(props.row.id)"
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
    </q-table>
  </div>
</template>

<script setup lang="ts">
import { reactive, onMounted, computed, ref } from 'vue';
import { useAdminStore } from 'src/stores/admin-store';
import useNotify from 'src/composables/useNotify';
import GroupChip from 'src/components/GroupChip.vue';
import UserModal from 'src/components/modals/UserModal.vue';
import { role } from 'src/types/dbTypes';

const adminStore = useAdminStore();
const notify = useNotify();

onMounted(async () => {
  table.isLoading = true;
  await adminStore.loadUsers();
  table.rows = computed(() => {
    return adminStore.users.filter((user) => {
      return (
        user.full_name
          .toLowerCase()
          .includes(table.searchfilter.toLowerCase()) ||
        user.email.toLowerCase().includes(table.searchfilter.toLowerCase()) ||
        user.role.toLowerCase().includes(table.searchfilter.toLowerCase())
      );
    });
  });
  table.isLoading = false;
});

const isLoading = reactive({
  deleteBtn: false,
  editBtn: false,
});

const isVisible = reactive({
  userModal: false,
});

const editedUserId = ref(-1);

async function deleteUser(userId: number) {
  isLoading.deleteBtn = true;
  await adminStore.deleteUser(userId);
  notify.success('User deleted');
  isLoading.deleteBtn = false;
}

function showUserModal(userId?: number) {
  userId ? (editedUserId.value = userId) : (editedUserId.value = -1);
  isVisible.userModal = !isVisible.userModal;
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
      name: 'full_name',

      // label for header
      label: 'Full name',

      // row Object property to determine value for this column
      field: 'full_name',
      // OR field: row => row.some.nested.prop,

      // (optional) if we use visible-columns, this col will always be visible
      required: true,

      // (optional) alignment
      align: 'left',
      format: (val: string) => `${val}`,
      sortOrder: 'ad', // or 'da'
      headerClasses: 'my-special-class',
    },
    {
      name: 'email',
      label: 'Email',
      field: 'email',
      align: 'left',
    },
    {
      name: 'role',
      label: 'Role',
      field: 'role',
      align: 'left',
      format: (val: string) => role[val as keyof typeof role],
    },
    {
      name: 'last_login',
      label: 'Last login',
      field: 'last_login',
      align: 'left',
    },
    {
      name: 'groups',
      label: 'Groups',
      field: 'groups',
      align: 'left',
    },
  ],
  rows: [] as typeof adminStore.users,
  isLoading: true,
  searchCol: '',
  searchfilter: '',
});
</script>

<style scoped></style>
