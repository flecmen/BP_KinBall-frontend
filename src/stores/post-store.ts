import { Post_extended } from './../types/dbTypes';
import { defineStore } from 'pinia';
import axios from 'axios';
import { ref } from 'vue';
import config from 'src/config';
import { Post } from 'src/types/dbTypes';


export const usePostStore = defineStore('postStore', () => {

  const newPost = ref<Post>();
  const posts = ref<Post_extended[]>();

  async function loadPosts() {
    const response = await axios.get(config.backendUrl + '/post');
    posts.value = response.data;
  }


  return {
    newPost,
    posts,
    loadPosts,
  }
},
  {
    persist: true
  })
