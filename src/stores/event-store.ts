import { Post_extended, Event_extended } from './../types/dbTypes';
import { defineStore } from 'pinia';
import { ref, reactive } from 'vue';
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

  function getEvent(eventId: Event_extended['id']) {
    return events.value.find(e => e.id == eventId)
  }

  async function registerOnEvent(eventId: Event_extended['id']) {
    const response = await api.put('/event/' + eventId + '/addUser/' + userStore.user.id);
    if (!response.data) {
      Notify.create({
        type: 'negative',
        message: i18n.t('failed to load event id:' + eventId)
      })
      return;
    }
    if (response.status == 201) {
      Notify.create({
        type: 'positive',
        message: i18n.t('You are registered to event id:' + eventId)
      })

    }
  }


  return {
    events,
    loadEvent,
    registerOnEvent,
    getEvent,
  }
})
