import { Post_extended } from './../types/dbTypes';
import { defineStore } from 'pinia';
import axios from 'axios';
import { ref } from 'vue';
import config from 'src/config';
import { Post } from 'src/types/dbTypes';
import { Notify } from 'quasar';
import { i18n } from 'src/utils/i18n';


export const usePostStore = defineStore('postStore', () => {

  const newPost = ref<Post>();
  const posts = ref<Post_extended[]>();

  async function loadPosts() {
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
    return;
  }

  async function likePost(postId: Post['id']) {
    const response = await axios.get(config.backendUrl + '')
    return
  }


  return {
    newPost,
    posts,
    loadPosts,
    likePost,
  }
},
  {
    persist: true
  })
