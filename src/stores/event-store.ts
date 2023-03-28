import { Post_extended, Event_extended, UserOnEventStatus } from './../types/dbTypes';
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

  async function reactOnEvent(eventId: Event_extended['id'], reaction: keyof UserOnEventStatus) {
    const value = !getEvent(eventId)?.players.some(p => p.user.id === userStore.user.id && p.status === reaction)
    // Change backend
    const response = await api.post(`/event/${eventId}/user/${userStore.user.id}/status/${String(reaction)}/${value}`);
    if (!response.data) {
      Notify.create({
        type: 'negative',
        message: i18n.t('failed to load event id:' + eventId)
      })
      return;
    }
    // Change frontend
    console.log('time to change frontend')
    const index = events.value.findIndex(e => e.id == eventId)
    if (index > -1) {
      events.value.splice(index, 1)
      console.log('splicing')
    }
    events.value.push(response.data)
    console.log('pushing')

    if (response.status == 201) {
      Notify.create({
        type: 'positive',
        message: i18n.t('success')
      })
    }
  }
  return {
    events,
    loadEvent,
    reactOnEvent,
    getEvent,
  }
})
