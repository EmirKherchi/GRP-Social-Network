<template>
  <div id="app">
    <div id="nav">
      <router-link to="/posts">Posts</router-link>
      <router-link v-if="isLoggedIn" to="/newpost">Ajouter</router-link>
      <div class="user">
        <router-link v-if="isLoggedIn" to="/userboard">
          <Avatar
            class="Avatar"
            :UserFirstname="userProfile.firstname"
            :UserLastname="userProfile.lastname"
            :profil_image="userProfile.profil_image"
          />
        </router-link>
        <span class="logout" v-if="isLoggedIn"
          ><a @click="logout"> <b-button variant="danger" class="mb-2">
      <b-icon icon="power" aria-hidden="true"></b-icon> 
    </b-button></a></span
        >
      </div>
    </div>
    <router-view />
  </div>
</template>

<script>
import { mapState } from "vuex";
import Avatar from "@/components/Avatar";
export default {
  components: {
    Avatar,
  },
  computed: {
    isLoggedIn: function() {
      return this.$store.getters["user/isLoggedIn"];
    },
    ...mapState("user", ["userProfile"]),
  },
  methods: {
    logout: function() {
      this.$store.dispatch("user/logout").then(() => {
        this.$router.push("/connexion");
      });
    },
  },
  mounted() {
    this.$store.dispatch("user/profile");
  },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  margin-top: 50px;
  display: flex; /*1*/
  flex-direction: row; /*2*/
  justify-content: center; /*3*/
  @media (max-width: 450px) {
    flex-flow: column wrap; /*4*/
  }
  .user{
    display: flex;
    flex-direction: row; /*2*/
  justify-content: center; /*3*/
  @media (max-width: 450px) {
    flex-flow: column wrap; /*4*/
  }
  }
  a {
    font-weight: bold;
    color: #2c3e50;
    margin: 0 2%;
    text-decoration: none;

    &.router-link-exact-active {
      color: #171e2c;
    }
  }
  .logout {
    cursor: pointer;
  }
  .Avatar {
    justify-content: center;
    img {
      max-width: 40px;
      border-radius: 100%;
      
    }
    p {
     display: none;
    }
  }
}
</style>
