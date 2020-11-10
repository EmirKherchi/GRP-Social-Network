<template>
  <div id="app">
    <div id="nav">
     
      <router-link to="/posts">Posts</router-link>
      <span v-if="isLoggedIn"> | <a @click="logout">Logout</a></span>
      <router-link v-if="isLoggedIn" to="/userboard">
        <Avatar
          class="avatar"
          :UserFirstname="userProfile.firstname"
          :UserLastname="userProfile.lastname"
          :profil_image="userProfile.profil_image"
        />
      </router-link>
      <router-link v-if="isLoggedIn" to="/newpost">Ajouter</router-link>
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
      return (
        this.$store.getters["user/isLoggedIn"]
        
      );
    },
    ...mapState('user', ['userProfile'])
  },
  methods: {
    logout: function() {
      this.$store.dispatch("user/logout").then(() => {
        this.$router.push("/connexion");
      });
    },
  },
  mounted() {
     this.$store.dispatch('user/profile')
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
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
