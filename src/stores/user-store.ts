import { defineStore } from 'pinia';
import axios from 'axios';
import { ref, computed } from 'vue';
import config from 'src/config';
import { Notify } from 'quasar';
import { User } from 'src/types/dbTypes';
import { i18n } from 'src/utils/i18n';

export const useUserStore = defineStore('userStore', () => {
  const token = ref(localStorage.getItem('token'));
  if (token.value) {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token.value;
  }

  const user = ref<User>({} as User)
  const afterLoginRoute = ref<string | null>(null);
  const isProcessing = ref<boolean>(false);
  const error = ref<string>()

  const isAuthenticated = computed(() => token.value !== null)

  async function login(email: string, password: string) {
    try {
      isProcessing.value = true;
      const data = { email, password }
      const response = await axios.post(config.backendUrl + '/auth/login', data)

      token.value = response.data.token;
      user.value = response.data.user;
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + token.value;

      localStorage.setItem('token', token.value as string);
      isProcessing.value = false;
    } catch (response) {
      //TODO doladit errorové zprávy podle kódu
      isProcessing.value = false;

      Notify.create({
        type: 'negative',
        message: i18n.t('notify.wrong.credentials')
      })
    }
  }

  function logout() {
    token.value = null;
    delete axios.defaults.headers.common['Authorization'];
    localStorage.removeItem('token');
  }

  return {
    user,
    afterLoginRoute,
    isProcessing,
    isAuthenticated,
    error,
    login,
    logout,
  }
})
