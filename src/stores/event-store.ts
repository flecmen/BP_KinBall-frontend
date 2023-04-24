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
    return events.value.filter(e => new Date(e.time).getTime() > new Date().getTime())
      .sort((a, b) => new Date(a.time).getTime() - new Date(b.time).getTime());
  });

  const myEvents = computed(() => {
    return events.value.filter(e => e.organiser.id === userStore.user.id)
  })
  const areWeOnEventsFeedBedrock = ref(false);

  // event dialog
  const isEventDialogVisible = ref(false)
  const eventId_to_edit = ref(-1)
  function openEventDialog(eventId?: number) {
    if (!eventId) {
      initNewEvent();
      eventId_to_edit.value = -1
    } else {

      eventId_to_edit.value = eventId
    }
    isEventDialogVisible.value = !isEventDialogVisible.value;
  }

  // event right Drawer
  const isRightDrawerVisible = ref(false)

  function toggleRightDrawer() {
    isRightDrawerVisible.value = !isRightDrawerVisible.value;
  }

  function initNewEvent() {
    newEvent.value = { event: { time: new Date(), organiser: userStore.user } as Event_extended, period: 1, isPeriodic: false }
  }

  async function loadEvent(eventId: Event_extended['id']) {
    // Pokud je již event načtený v events, tak znovu načítat nebudeme
    if (getEvent(eventId) !== undefined) return;
    // Načtení ještě nenačteného eventu
    const response = await api.get('/event/id/' + eventId);
    // Fail check
    if (!response.data) {
      Notify.create({
        type: 'negative',
        message: i18n.t('failed to load event id:' + eventId)
      })
      return;
    }

    // event loaded
    pushEvent(response.data)
    return;
  }

  async function loadEvents(index: number, limit: number) {
    const response = await api.get('/event', { params: { page: index, limit } });

    // no more events
    if (response.status === 204) {
      console.log('no more events')
      areWeOnEventsFeedBedrock.value = true;
      return;
    }

    // Fail check
    if (!response.data) {
      Notify.create({
        type: 'negative',
        message: i18n.t('failed to load events')
      })
      return;
    }

    response.data.forEach((e: Event_extended) => {
      pushEvent(e);
    })
  }

  function getEvent(eventId: Event_extended['id']) {
    return events.value.find(e => e.id == eventId)
  }

  async function reactOnEvent(eventId: Event_extended['id'], reaction: keyof UserOnEventStatus) {
    // Check, if user took back his reaction (he takes back his reaction)
    const boolvalue = !getEvent(eventId)?.players.some(p => p.user.id === userStore.user.id && p.status === reaction)

    // Check if there is space left
    if (boolvalue && reaction === UserOnEventStatus.going) {
      const event = getEvent(eventId);
      console.log('people limit: ', event?.people_limit)
      console.log('going: ', event?.players.filter(p => p.status === 'going').length)
      if (event?.people_limit && event.people_limit <= event.players.filter(p => p.status === 'going').length) {

        Notify.create({
          type: 'negative',
          message: i18n.t('no space left')
        })
        return;
      }
    }

    // Change backend
    const response = await api.post(`/event/${eventId}/user/${userStore.user.id}/status/${String(reaction)}/${boolvalue}`);
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
      // remove the whole event
      events.value.splice(index, 1)
    }
    // push new event
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
        console.log('Posílám na backend: ')
        console.log(newEvent.value)
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
      pushEvent(response.data)
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

  async function loadMultipleEventsByPostId(postIds: number[]) {
    if (postIds.length < 1) return;
    const response = await api.get('/event/multiple/byPostIds', { params: { idArray: postIds.join(',') } })
    if (!response.data) {
      Notify.create({
        type: 'negative',
        message: i18n.t('failed to load events')
      })
      return;
    }
    response.data.forEach((event: Event_extended) => {
      pushEvent(event)
    })
  }

  function pushEvent(event: Event_extended) {
    const index = events.value.findIndex(e => e.id == event.id)
    if (index > -1) {
      events.value.splice(index, 1, event)
    } else {
      events.value.push(event)
    }
    return;
  }

  async function loadMyEvents(filter?: string) {

    const response = await api.get('/event/organiser/' + userStore.user.id + (filter ? '/' + filter : ''))
    if (!response.data) {
      Notify.create({
        type: 'negative',
        message: i18n.t('failed to load events')
      })
      return;
    }
    response.data.forEach((event: Event_extended) => {
      pushEvent(event)
    })
  }

  async function updateEvent(eventId: Event_extended['id'], event: Event_extended) {
    const response = await api.put(`/event/${eventId}`, event)
    if (!response.data) {
      Notify.create({
        type: 'negative',
        message: i18n.t('failed to update event')
      })
      return;
    }
    pushEvent(response.data)
  }

  async function sendAttendance(eventId: Event_extended['id']) {
    const event = getEvent(eventId)
    const response = await api.post(`/event/${eventId}/attendance`, { data: event?.players.map(p => { return { userId: p.userId, present: p.present } }) })
    if (response.status === 400) {
      Notify.create({
        type: 'negative',
        message: i18n.t(response.data.error)
      })
      return;
    }
    pushEvent(response.data)
  }

  return {
    events,
    chronologicEvents,
    myEvents,
    newEvent,
    loadEvents,
    loadEvent,
    loadMyEvents,
    reactOnEvent,
    getEvent,
    updateEvent,
    initNewEvent,
    createEvent,
    deleteEvent,
    loadMultipleEventsByPostId,
    areWeOnEventsFeedBedrock,
    sendAttendance,
    isEventDialogVisible,
    eventId_to_edit,
    openEventDialog,
    isRightDrawerVisible,
    toggleRightDrawer,
  }
},
  // {
  //   persist: true
  // }
)
