import { Post_extended, Post_comment_extended, Group, Survey_option, Survey_option_extended } from './../types/dbTypes';
import { defineStore } from 'pinia';
import { ref, reactive, computed } from 'vue';
import { Post } from 'src/types/dbTypes';
import { Notify } from 'quasar';
import { i18n } from 'src/utils/i18n';
import { useUserStore } from './user-store';
import { api } from 'src/boot/axios';

const userStore = useUserStore();


export const usePostStore = defineStore('postStore', () => {

  const newPost = ref<Post_extended>({} as Post_extended);
  const posts = ref<Post_extended[]>();
  const posts_sorted = computed(() => {
    return posts.value?.sort((a, b) => new Date(b.time_of_creation).getTime() - new Date(a.time_of_creation).getTime())
  })
  const postTypeFilter = reactive<{
    text: boolean,
    event: boolean,
    survey: boolean,
  }>({
    text: true,
    event: true,
    survey: true,
  })
  const groupsFilter = ref<{ group: Group, visible: boolean }[]>([])

  function initFeedFilter() {
    groupsFilter.value = [];
    const groups = userStore.user.groups
    if (!groups) {
      Notify.create({
        type: 'negative',
        message: i18n.t('Groups cannot be loaded')
      })
      return;
    }
    groups.forEach((g: Group) => {
      groupsFilter.value.push({ group: g, visible: true })
    })
  }

  function initNewPost() {
    newPost.value = {
      author: userStore.user,
      groups: [] as Group[],
      survey_options: [] as Survey_option[],
    } as Post_extended
  }

  async function loadPosts() {
    const response = await api.get('/post');
    // Fail check
    if (!response.data) {
      Notify.create({
        type: 'negative',
        message: i18n.t('failed')
      })
      return;
    }

    // posts loaded
    posts.value = response.data;
    initFeedFilter();
    return;
  }

  async function likePost(postId: Post['id']) {
    // Check if post was already liked by user
    if (getLocalPost(postId)?.likes.some(u => u.id === userStore.user.id)) {
      // Removing like
      const response = await api.delete('/post/' + postId + '/like/' + userStore.user.id)
      if (response.status !== 204) {
        Notify.create({
          type: 'negative',
          message: i18n.t('failed')
        })
        return;
      }
      getLocalPost(postId)?.likes.splice(getLocalPost(postId)?.likes.indexOf(userStore.user) as number)
      return
    } else {
      // Adding like
      const response = await api.post('/post/' + postId + '/like/' + userStore.user.id)
      if (response.status !== 201) {
        Notify.create({
          type: 'negative',
          message: i18n.t('failed')
        })
        return;
      }
      posts.value?.find(p => p.id === postId)?.likes.push(userStore.user);
      return
    }
  }

  async function likeComment(postId: Post['id'], commentId: Post_comment_extended['id']) {
    // Check if post was already liked by user
    if (getLocalComment(postId, commentId)?.likes.some(u => u.id === userStore.user.id)) {
      //removing like
      const response = await api.delete('/post/' + postId + '/comment/' + commentId + '/like/' + userStore.user.id)
      if (response.status !== 204) {
        Notify.create({
          type: 'negative',
          message: i18n.t('failed')
        })
        return
      }
      getLocalComment(postId, commentId)?.likes.splice(getLocalComment(postId, commentId)?.likes.indexOf(userStore.user) as number)
      return
    } else {
      // Adding like
      const response = await api.post('/post/' + postId + '/comment/' + commentId + '/like/' + userStore.user.id)
      if (response.status !== 201) {
        Notify.create({
          type: 'negative',
          message: i18n.t('failed')
        })
        return;
      }
      getLocalComment(postId, commentId)?.likes.push(userStore.user)
      return
    }
  }

  async function sendComment(postId: Post['id'], text: string) {
    const response = await api.post(`/post/${postId}/comment/${userStore.user.id}`, { text: text })
    if (response.status !== 201) {
      Notify.create({
        type: 'negative',
        message: i18n.t('failed')
      })
      return;
    }

    getLocalPost(postId)?.comments.push(response.data)
  }

  function getLocalPost(postId: Post['id']) {
    return posts.value?.find(p => p.id === postId)
  }

  function getLocalComment(postId: Post['id'], commentId: Post_comment_extended['id']) {
    return getLocalPost(postId)?.comments.find(c => c.id === commentId)
  }

  async function postNewPost() {
    const response = await api.post('/post', newPost.value)
    if (response.status !== 201) {
      Notify.create({
        type: 'negative',
        message: i18n.t('failed')
      })
      return;
    }
    posts.value?.push(response.data)
  }

  function addSurvey_option(text: string) {
    newPost.value.survey_options.push({ text } as Survey_option_extended)
  }
  function removeSurvey_option(index: number) {
    newPost.value.survey_options.splice(index, 1)
  }
  async function changeSurvey_optionValue(value: boolean, postId: Post['id'], optionId: Survey_option['id']) {
    console.log(1)
    const response = await api.post('/post/' + postId + '/survey/' + optionId + '/user/' + userStore.user.id + '/' + value)
    console.log(2)
    if (response.status !== 200) {
      Notify.create({
        type: 'negative',
        message: i18n.t('failed')
      })
      return;
    }
    console.log(3)

    if (value) getLocalPost(postId)?.survey_options.find(o => o.id === optionId)?.votes.push(userStore.user)
    else getLocalPost(postId)?.survey_options.find(o => o.id === optionId)?.votes.splice(getLocalPost(postId)?.survey_options.find(o => o.id === optionId)?.votes.indexOf(userStore.user) as number)
    console.log(4)
    return;
  }


  return {
    newPost,
    posts,
    posts_sorted,
    loadPosts,
    likePost,
    likeComment,
    sendComment,
    postTypeFilter,
    groupsFilter,
    postNewPost,
    initNewPost,
    addSurvey_option,
    removeSurvey_option,
    changeSurvey_optionValue,
  }
})
