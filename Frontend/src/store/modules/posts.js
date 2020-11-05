import axios from "axios";
import router from "@/router";

const API_URL = "http://localhost:8080/api/";

const posts = {
  namespaced: true,
  state: {
    posts: {},
    post: {},
    newPost: {},
  },
  mutations: {
    SET_POSTS(state, data) {
      state.posts = data;
    },
    SET_POST(state, data) {
      state.post = data;
    },
    SET_NEW_POST(state, data) {
        state.newPost = data;
      },
  },
  actions: {
    loadPosts({ commit }) {
      axios
        .get(API_URL + "posts/")
        .then((response) => {
          commit("SET_POSTS", response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    loadPost({ commit }) {
      let id = router.currentRoute.params.id;
      axios
        .get(API_URL + `posts/${id}`)
        .then((response) => {
          commit("SET_POST", response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    newPost({ commit }, newPost) {
        return new Promise((resolve, reject) => {
          commit("auth_request");
          axios({
            url: API_URL + "posts/new/",
            data: newPost,
            method: "POST",
          })
            .then((resp) => {
              commit("SET_NEW_POST", resp.data);
              resolve(resp);
            })
            .catch((err, resp) => {
              commit("SET_NEW_POST", err.response.data);
              reject(resp);
            });
        });
      }
  },
  
};

export default posts;
