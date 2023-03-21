import { Post_extended, Event_extended } from './../types/dbTypes';
import { defineStore } from 'pinia';
import { ref, reactive } from 'vue';
import { Post } from 'src/types/dbTypes';
import { Notify } from 'quasar';
import { i18n } from 'src/utils/i18n';
import { useUserStore } from './user-store';
import { api } from 'src/boot/axios';

const userStore = useUserStore();


export const useEventStore = defineStore('eventStore', () => {

  const events = ref<Event_extended[]>([])

  async function loadEvent(eventId: Event_extended['id']) {
    const response = await api.get('/event/' + eventId);
    // Fail check
    if (!response.data) {
      Notify.create({
        type: 'negative',
        message: i18n.t('failed to load event id:' + eventId)
      })
      return;
    }

    // event loaded
    events.value.push(response.data)
    return;
  }


  return {
    events,
    loadEvent,
  }
})
