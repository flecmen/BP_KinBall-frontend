import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { Notify } from 'quasar';
import { Settings, User_extended } from 'src/types/dbTypes';
import { i18n } from 'src/utils/i18n';
import { router } from 'src/router/index'
import { api } from 'src/boot/axios';

export const useUserStore = defineStore('userStore', () => {
  const token = ref(localStorage.getItem('token'));
  if (token.value) {
    api.defaults.headers.common['Authorization'] = 'Bearer ' + token.value;
  }

  const user = ref<User_extended>({} as User_extended)
  const afterLoginRoute = ref<string | null>(null);
  const isProcessing = ref<boolean>(false);

  const isAuthenticated = computed(() => token.value !== null)

  async function login(email: string, password: string) {
    try {
      isProcessing.value = true;
      const data = { email, password }
      const response = await api.post('/auth/login', data)

      token.value = response.data.token;
      user.value = response.data.user;
      api.defaults.headers.common['Authorization'] = 'Bearer ' + token.value;

      localStorage.setItem('token', token.value as string);

      Notify.create({
        type: 'positive',
        message: i18n.t('success')
      })
      isProcessing.value = false;
      router.push(afterLoginRoute.value ?? { name: 'home' });
      afterLoginRoute.value = null;

      return;
    } catch (response) {
      //TODO doladit errorové zprávy podle kódu
      Notify.create({
        type: 'negative',
        message: i18n.t('notify.wrong.credentials')
      })
    }
    isProcessing.value = false;
  }

  function logout() {
    token.value = null;
    delete api.defaults.headers.common['Authorization'];
    localStorage.removeItem('token');
    router.push({ name: 'login' })
  }

  async function getUser(userId: User_extended['id']) {
    try {
      const response = await api.get(`/user/${userId}`)
      return response.data;
    } catch (error) {
      console.log(error)
    }
  }

  async function updateSettings(settings: Settings) {
    const new_user = JSON.parse(JSON.stringify(user.value))
    new_user.settings = settings
    const response = await api.put(`/user/${user.value.id}`, new_user)
    user.value = response.data;
    Notify.create({
      type: 'positive',
      message: i18n.t('success')
    })
    return;
  }

  async function changePassword(password: string) {
    const response = await api.put(`/user/changePassword/${user.value.id}`, { password })
    if (response.status === 400) {
      Notify.create({
        type: 'negative',
        message: i18n.t(response.data.error)
      })
      return;
    }
    if (response.status === 200) {
      Notify.create({
        type: 'positive',
        message: i18n.t('success')
      })
    }
    return;
  }

  return {
    user,
    afterLoginRoute,
    isProcessing,
    isAuthenticated,
    login,
    logout,
    getUser,
    updateSettings,
    changePassword,
  }
},
  {
    persist: true
  })
