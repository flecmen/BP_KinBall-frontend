import { defineStore } from 'pinia';
import axios from 'axios';
import { ref, computed } from 'vue';
import config from 'src/config';

export const useUserStore = defineStore('userStore', () => {
  const token = ref(localStorage.getItem('token'));
  if (token.value) {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token.value;
  }

  //TODO: user datatype!!
  const user = ref({})
  const afterLoginRoute = ref<string | null>(null);
  const isProcessing = ref<boolean>(false);

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
      //Přidat notify na error
    }
  }

  return {
    user,
    afterLoginRoute,
    isProcessing,
    isAuthenticated,
    login,
  }
})
