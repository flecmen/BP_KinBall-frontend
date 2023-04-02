import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { Notify } from 'quasar';
import { User_extended } from 'src/types/dbTypes';
import { i18n } from 'src/utils/i18n';
import { router } from 'src/router/index'
import { api } from 'src/boot/axios';

export const useAdminStore = defineStore('adminStore', () => {
  const users = ref<User_extended[]>([]);
  const newUser = ref<User_extended>({} as User_extended);

  async function loadUsers() {
    const response = await api.get('/user');
    users.value = response.data;
    if (response.status !== 200) {
      Notify.create({
        type: 'negative',
        message: i18n.t('notify.error')
      })
    }
  }

  async function deleteUser(userId: User_extended['id']) {
    // delete on backend
    const response = await api.delete(`/user/${userId}`);
    const index = users.value.findIndex(user => user.id === userId);
    if (response.status !== 204 || index === -1) {
      Notify.create({
        type: 'negative',
        message: i18n.t('failed')
      })
      return;
    }
    // delete on frontend
    users.value.splice(index, 1);
    return;
  }

  async function createNewUser() {
    const response = await api.post('/user', newUser.value);
    if (response.status !== 201) {
      Notify.create({
        type: 'negative',
        message: i18n.t('failed')
      })
      return;
    }
    users.value.push(response.data);
    Notify.create({
      type: 'positive',
      message: i18n.t('success')
    })
    return;
  }

  async function updateUser(user: User_extended) {
    // Update backend
    const response = await api.put(`/user/${user.id}`, user);
    if (response.status !== 200) {
      Notify.create({
        type: 'negative',
        message: i18n.t('failed')
      })
      return;
    }
    Notify.create({
      type: 'positive',
      message: i18n.t('success')
    })
    // Update frontend
    const index = users.value.findIndex(u => u.id === user.id);
    if (index > -1) {
      users.value.splice(index, 1, response.data);
    }
    return;
  }

  function initNewUser() {
    newUser.value = {} as User_extended;
  }

  function getLocalUser(userId: User_extended['id']) {
    return users.value.find(user => user.id === userId);
  }

  return {
    users,
    newUser,
    loadUsers,
    deleteUser,
    initNewUser,
    getLocalUser,
    createNewUser,
    updateUser,
  }
},)
