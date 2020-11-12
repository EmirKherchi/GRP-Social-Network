<template>
  <div id="app">
    <div id="nav">
      <b-navbar class="navbar" toggleable="lg" type="dark" variant="dark">
        <router-link to="/posts">
          <b-navbar-brand class="navbar-brand">
            <b-img
              fluid
              src="./assets/Images/icon-left-font-monochrome-white.png"
              alt="Logo Groupomania social network"
              class="d-inline-block align-top"
            ></b-img>
          </b-navbar-brand>
        </router-link>

        <b-navbar-toggle
          v-if="isLoggedIn"
          target="nav-collapse"
        ></b-navbar-toggle>

        <b-collapse v-if="isLoggedIn" id="nav-collapse" is-nav>
          <b-navbar-nav center>
            <b-nav-item target="nav-collapse">
              <router-link class="addPost" to="/newpost">
                <b-button size="lg" class="mb-2 addPost-btn">
                  <b-icon icon="cloud-plus"></b-icon>
                </b-button>
              </router-link>
            </b-nav-item>
          </b-navbar-nav>
          <!-- Right aligned nav items -->
          <b-navbar-nav class="ml-auto">
            <b-nav-item>
              <router-link v-if="isLoggedIn" to="/userboard">
                <Avatar
                  class="Avatar"
                  :UserFirstname="userProfile.firstname"
                  :UserLastname="userProfile.lastname"
                  :profil_image="userProfile.profil_image"
                  badge
                  badge-variant="success"
                />
              </router-link>
            </b-nav-item>
            <b-nav-item>
              <span class="logout" v-if="isLoggedIn"
                ><a @click="logout">
                  <b-button variant="danger" class="mb-2">
                    <b-icon icon="power" aria-hidden="true"></b-icon>
                  </b-button>
                </a>
              </span>
            </b-nav-item>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
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
  color: #242f3a;
  
  .navbar {
    background-color: #263238 !important;
    &-brand {
      width: 20%;
      padding: 0;
      float: left;
      margin-left: 20px;
    }
  }
}
#nav {
  position: sticky;
  top: 0;
  z-index: 10000;
  .logout {
    cursor: pointer;
  }
  .navbar-toggler {
    margin: auto;
  }
  .addPost {
    &-btn {
      background-color: rgb(55, 97, 122);
      border: transparent;
      &:hover {
        background-color: rgb(52, 91, 114);
        border: rgb(52, 91, 114);
        transition: 300ms ease-in-out;
      }
    }
  }
  .Avatar {
    justify-content: center;

    margin-left: 8px;
    margin-bottom: 8px;

    p {
      display: none;
    }
  }
}
</style>
