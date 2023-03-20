import { Post_extended, Post_comment_extended, Group } from './../types/dbTypes';
import { defineStore } from 'pinia';
import axios from 'axios';
import { ref, reactive } from 'vue';
import config from 'src/config';
import { Post } from 'src/types/dbTypes';
import { Notify } from 'quasar';
import { i18n } from 'src/utils/i18n';
import { useUserStore } from './user-store';

const userStore = useUserStore();


export const usePostStore = defineStore('postStore', () => {

  const newPost = ref<Post>();
  const posts = ref<Post_extended[]>();
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
  const filterReady = ref(false);

  function initFeedFilter() {
    const groups = userStore.user.groups
    console.log(groups)
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
    filterReady.value = true;
  }

  async function loadPosts() {
    filterReady.value = false;
    const response = await axios.get(config.backendUrl + '/post');
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
      const response = await axios.delete(config.backendUrl + '/post/' + postId + '/like/' + userStore.user.id)
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
      const response = await axios.post(config.backendUrl + '/post/' + postId + '/like/' + userStore.user.id)
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
      const response = await axios.delete(config.backendUrl + '/post/' + postId + '/comment/' + commentId + '/like/' + userStore.user.id)
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
      const response = await axios.post(config.backendUrl + '/post/' + postId + '/comment/' + commentId + '/like/' + userStore.user.id)
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
    const response = await axios.post(`${config.backendUrl}/post/${postId}/comment/${userStore.user.id}`, { text: text })
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


  return {
    newPost,
    posts,
    loadPosts,
    likePost,
    likeComment,
    sendComment,
    postTypeFilter,
    groupsFilter,
    filterReady,
  }
})
