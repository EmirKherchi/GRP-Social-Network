import axios from "axios";
import router from "@/router";

const API_URL = "http://localhost:8080/api/";

const likes = {
  namespaced: true,
  state: {
    likes: {},
    dislikes: {},
  },
  mutations: {
    SET_LIKES(state, data) {
      state.likes = data;
    },
    SET_DISLIKES(state, data) {
      state.dislikes = data;
    },
  },
  actions: {
    likedIt({ commit, dispatch }) {
      let id = router.currentRoute.params.id;
      axios
        .post(API_URL + `posts/${id}/like/`)
        .then((response) => {
          commit("SET_LIKES", response);
          setTimeout(function() {
            dispatch("posts/loadPost", null, { root: true });
            dispatch("user/profile", null, { root: true });
          }, 300);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    dislikedIt({ commit, dispatch }) {
      let id = router.currentRoute.params.id;
      axios
        .post(API_URL + `posts/${id}/dislike/`)
        .then((response) => {
          commit("SET_DISLIKES", response);
          setTimeout(function() {
            dispatch("posts/loadPost", null, { root: true });
            dispatch("user/profile", null, { root: true });
          }, 300);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};

export default likes;
