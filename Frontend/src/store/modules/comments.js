import axios from "axios";
import router from "@/router";

const API_URL = "http://localhost:8080/api/";

const comments = {
  namespaced: true,
  state: {
    comments: {},
    newComment: {},
  },
  mutations: {
    SET_COMMENTS(state, data) {
      state.comments = data;
    },
    SET_NEW_COMMENT(state, data) {
      state.newComment = data;
    },
  },
  actions: {
    loadComments({ commit }) {
      let id = router.currentRoute.params.id;
      axios
        .get(API_URL + `posts/${id}/comments`)
        .then((response) => {
          commit("SET_COMMENTS", response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    newComment({ commit, dispatch }, content) {
      let id = router.currentRoute.params.id;
      console.log(content);
      axios({
        url: API_URL + `posts/${id}/comment/new/`,
        data: content,
        method: "POST",
      })

        .then((response) => {
          commit("SET_NEW_COMMENT", response);
          setTimeout(function() {
            dispatch("comments/loadComments", null, { root: true })
            dispatch("posts/loadPost", null, { root: true });
          }, 1000);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};

export default comments;
