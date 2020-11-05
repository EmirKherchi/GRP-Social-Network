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
  },
  mutations: {
    SET_THIS_USER(state, data) {
      state.userProfile = data;
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
    auth_success(state, token, user) {
      state.status = "success";
      state.token = token;
      state.user = user;
    },
    auth_error(state) {
      state.status = "error";
    },
    logout(state) {
      state.status = "";
      state.token = "";
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
            const user = resp.data.Id;
            localStorage.setItem("token", token);
            axios.defaults.headers.common["Authorization"] = "Bearer " + token; // set default headers with the token from response for next request
            commit("auth_success", token, user);
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

    register({ commit }, user) {
      return new Promise((resolve, reject) => {
        commit("auth_request");
        console.log("User module register request" + user.data.profil_image);
        axios({
          url: API_URL + "/users/register/",
          data: user,
          method: "POST",
        })
          .then((resp) => {
            commit("SET_CONNEXION_MESSAGE", resp.data);
            console.log("Image uploaded successfully ✨");
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
            const userProfile = resp.data;
            commit("SET_THIS_USER", userProfile);
            resolve(resp);
          })
          .catch((err) => {
            router.push("/connexion");
            localStorage.removeItem("token");
            delete axios.defaults.headers.common["Authorization"];
            commit(
              "SET_CONNEXION_MESSAGE",
              "erreur serveur veuillez vous reconnecter"
            );
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
            commit("SET_UPDATE_MESSAGE", "Image de profil modifié");
            resolve(resp);
          })
          .catch((err, resp) => {
            commit("auth_error");
            commit("SET_UPDATE_MESSAGE", "erreur");
            reject(resp);
          });
      });
    },
  },
  getters: {
    isLoggedIn: (state) => !!state.token,
    authStatus: (state) => state.status,
  },
};

export default user;
