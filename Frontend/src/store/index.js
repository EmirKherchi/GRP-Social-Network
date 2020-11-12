import Vue from 'vue'
import Vuex from 'vuex'
import posts from './modules/posts'
import user from './modules/user'
import likes from './modules/likes'
import comments from './modules/comments'



Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    posts,
    user,
    likes,
    comments,
  }
})
