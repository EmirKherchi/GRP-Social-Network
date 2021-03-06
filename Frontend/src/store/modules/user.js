import axios from "axios";
import router from "@/router";

const API_URL = "http://localhost:8080/api";

const user = {
  namespaced: true,
  state: {
    status: "",
    token: localStorage.getItem("token") || "",
    user: {},
    userProfile: {},
    connexionMessage: "",
    updateMessage: "",
    isAdmin: "",
  },
  mutations: {
    SET_THIS_USER(state, data) {
      state.userProfile = data;
      state.isAdmin = data
    },
    SET_ADMIN(state,data){
      state.isAdmin = data
    },
    SET_CONNEXION_MESSAGE(state, data) {
      state.connexionMessage = data;
    },
    SET_UPDATE_MESSAGE(state, data) {
      state.updateMessage = data;
    },
    auth_request(state) {
      state.status = "loading";
    },
    auth_success(state, token) {
      state.status = "success";
      state.token = token;
    },
    auth_error(state) {
      state.status = "error";
    },
    logout(state) {
      state.status = "";
      state.token = "";
      state.isAdmin = "";
    },
  },
  actions: {
    login({ commit }, user) {
      return new Promise((resolve, reject) => {
        commit("auth_request");
        axios({
          url: API_URL + "/users/login/",
          data: user,
          method: "POST",
        })
          .then((resp) => {
            const token = resp.data.token;
            const isAdmin = resp.data.is_admin;  
            localStorage.setItem("token", token);
            axios.defaults.headers.common["Authorization"] = "Bearer " + token; // set default headers with the token from response for next request
            commit("auth_success", token);
            commit("SET_ADMIN", isAdmin)
            resolve(resp);
          })
          .catch((err) => {
            commit("auth_error");
            commit("SET_CONNEXION_MESSAGE", err.response.data);
            localStorage.removeItem("token");
            reject(err);
          });
      });
    },

    register({ commit }, user,) {
      return new Promise((resolve, reject) => {
        commit("auth_request");
        axios({
          url: API_URL + "/users/register/",
          headers: {
            "Content-Type": "multipart/form-data",
          },
          data:user,
          method: "POST",
        })
          .then((resp) => {
            commit("SET_CONNEXION_MESSAGE", resp.data);
            resolve(resp);
          })
          .catch((err, resp) => {
            commit("auth_error");
            commit("SET_CONNEXION_MESSAGE", err.response.data);
            reject(resp);
          });
      });
    },
    logout({ commit }) {
      return new Promise((resolve) => {
        commit("logout");
        commit("SET_CONNEXION_MESSAGE", "");
        localStorage.removeItem("token");
        delete axios.defaults.headers.common["Authorization"];
        resolve();
      });
    },
    profile({ commit }) {
      return new Promise((resolve, reject) => {
        axios({
          url: API_URL + "/users/me",
          method: "GET",
        })
          .then((resp) => {
            const isAdmin = resp.data.is_admin;
            const userProfile = resp.data;
            commit("SET_THIS_USER", userProfile);
            commit("SET_ADMIN", isAdmin)
            resolve(resp);
          })
          .catch((err) => {
            router.push("/connexion");
            localStorage.removeItem("token");
            delete axios.defaults.headers.common["Authorization"];
            reject(err);
          });
      });
    },
    update({ commit }, data) {
      return new Promise((resolve, reject) => {
        commit("auth_request");
        axios({
          url: API_URL + "/users/me/",
          headers: {
            "Content-Type": "multipart/form-data",
          },
          data: data,
          method: "PUT",
        })
          .then((resp) => {
            commit("SET_UPDATE_MESSAGE", "Image de profil modifiée");
            resolve(resp);
          })
          .catch((err, resp) => {
            commit("auth_error");
            commit("SET_UPDATE_MESSAGE", "erreur");
            reject(resp);
          });
      });
    },
    delete({commit,dispatch }) {
      return new Promise((resolve, reject) => {
        axios({
          url: API_URL + "/users/me",
          method: "DELETE",
        })
          .then((resp) => {
            dispatch("logout");
            commit("SET_CONNEXION_MESSAGE", "Votre profil est supprimé");
            resolve(resp);
          })
          .catch((err) => {
            console.log(err)
            reject(err);
          });
      });
    },
  },
  getters: {
    isLoggedIn: (state) => !!state.token,
    authStatus: (state) => state.status,
    isAdmin: (state) => state.isAdmin
  },
};

export default user;
