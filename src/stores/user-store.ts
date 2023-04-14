import { defineStore } from 'pinia';
import { RouteLocationNormalized } from 'vue-router/dist/vue-router';
import { ref, computed } from 'vue';
import { Notify } from 'quasar';
import { Group, Settings, User_extended, role } from 'src/types/dbTypes';
import { i18n } from 'src/utils/i18n';
import { router } from 'src/router/index'
import { api } from 'src/boot/axios';

export const useUserStore = defineStore('userStore', () => {
  const token = ref(localStorage.getItem('token'));
  if (token.value) {
    api.defaults.headers.common['Authorization'] = 'Bearer ' + token.value;
  }

  const user = ref<User_extended>({} as User_extended)
  const afterLoginRoute = ref<RouteLocationNormalized | null>(null);
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

  async function register(email: string, password: string, full_name: string) {
    if (!email || !password || !full_name) return;
    isProcessing.value = true;
    const response = await api.post('/auth/register', { email, password, full_name })
    if (response.status !== 201) {
      Notify.create({
        type: 'negative',
        message: i18n.t(response.data.error)
      })
      isProcessing.value = false;
      return;
    }
    Notify.create({
      type: 'positive',
      message: i18n.t('success')
    })
    isProcessing.value = false;
    router.push({ name: 'login' });
    return
  }

  async function checkEmail(email: string) {
    const response = await api.get(`/auth/checkEmail/${email}`)
    if (response.status !== 200) {
      Notify.create({
        type: 'negative',
        message: i18n.t('Faliled to check email')
      })
      return false;
    }
    return response.data.message;
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
  function setAfterLoginRoute(route: RouteLocationNormalized) {
    afterLoginRoute.value = route
  }

  function isAuthorizedToEdit(authorId: User_extended['id']) {
    // user si může upravovat svoje příspěvky
    if (user.value.id === authorId) return true;
    // admin a trenér mohou upravovat cokoliv
    if (user.value.role === role.admin || user.value.role === role.trener) return true;
    return false;

  }

  return {
    user,
    afterLoginRoute,
    isProcessing,
    isAuthenticated,
    login,
    logout,
    register,
    checkEmail,
    getUser,
    updateSettings,
    changePassword,
    setAfterLoginRoute,
    isAuthorizedToEdit,
  }
},
  {
    persist: true
  })
