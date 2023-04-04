import { Event_extended, UserOnEventStatus } from './../types/dbTypes';
import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { Notify } from 'quasar';
import { i18n } from 'src/utils/i18n';
import { useUserStore } from './user-store';
import { usePostStore } from './post-store';
import { api } from 'src/boot/axios';

const userStore = useUserStore();


export const useEventStore = defineStore('eventStore', () => {

  const events = ref<Event_extended[]>([])
  const newEvent = ref<{
    event: Event_extended, // pokud jich je víc, tak je to první který se koná (další podle nastavené periody)
    period: number // weeks
    isPeriodic: boolean
  }>({ event: { time: new Date(), organiser: userStore.user } as Event_extended, period: 1, isPeriodic: false })

  const chronologicEvents = computed(() => {
    return events.value.sort((a, b) => new Date(a.time).getTime() - new Date(b.time).getTime());
  });

  function initNewEvent() {
    newEvent.value = { event: { time: new Date(), organiser: userStore.user } as Event_extended, period: 1, isPeriodic: false }
  }

  async function loadEvent(eventId: Event_extended['id']) {
    // Pokud je již event načtený v events, tak znovu načítat nebudeme
    if (getEvent(eventId) !== undefined) return;
    // Načtení ještě nenačteného eventu
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
    // if event with same id already is in events.value, remove it and replace with this one
    const index = events.value.findIndex(e => e.id == eventId)
    if (index > -1) {
      events.value.splice(index, 1)
    }
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
    const index = events.value.findIndex(e => e.id == eventId)
    if (index > -1) {
      events.value.splice(index, 1)
    }
    events.value.push(response.data)

    if (response.status == 201) {
      Notify.create({
        type: 'positive',
        message: i18n.t('success')
      })
    }
  }

  async function createEvent() {
    //format date correctly
    const [day, month, year, hours, minutes] = newEvent.value.event.time.toString().split(/[.: ]/);
    newEvent.value.event.time = new Date(`${year}-${month}-${day}T${hours}:${minutes}:00`);
    const newPostsIds: number[] = []
    /*
    *Periodic event, creating all events by period
    */
    if (newEvent.value.isPeriodic && newEvent.value.period > 1) {
      for (let i = 0; i < newEvent.value.period; i++) {
        const response = await api.post('/event', newEvent.value.event)
        if (!response.data) {
          Notify.create({
            type: 'negative',
            message: i18n.t('failed to create event')
          })
          return;
        }
        // save event on FE
        events.value.push(response.data);
        // save post ID for later load of posts
        newPostsIds.push(response.data.postId)
        // prepare next event time for next week
        newEvent.value.event.time = new Date(newEvent.value.event.time.getTime() + 7 * 24 * 60 * 60 * 1000)
      }
      /*
      * only one event
      */
    } else {
      const response = await api.post('/event', newEvent.value.event)
      if (!response.data) {
        Notify.create({
          type: 'negative',
          message: i18n.t('failed to create event')
        })
        return;
      }
      // save event on FE
      events.value.push(response.data);
      // save post ID for later load of posts
      newPostsIds.push(response.data.postId)
    }
    // load posts for new events
    await usePostStore().loadMultiplePosts(newPostsIds);
    return;
  }

  async function deleteEvent(eventId: Event_extended['id']) {
    const response = await api.delete(`/event/${eventId}`)
    if (response.status !== 204) {
      Notify.create({
        type: 'negative',
        message: i18n.t('failed to delete event')
      })
      return;
    }
    const index = events.value.findIndex(e => e.id == eventId)
    if (index > -1) {
      events.value.splice(index, 1)
    }
    return;
  }

  return {
    events,
    chronologicEvents,
    newEvent,
    loadEvent,
    reactOnEvent,
    getEvent,
    initNewEvent,
    createEvent,
    deleteEvent,
  }
},
  {
    persist: true
  })
