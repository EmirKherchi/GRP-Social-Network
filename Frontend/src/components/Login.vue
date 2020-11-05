<template>
  <div>
    <form class="login" @submit.prevent="login">
      <h1>Connectez-vous</h1>

      <label for="email">Email</label>
      <input required v-model="email" type="email" placeholder="Email" />

      <label for="password">Mot de passe</label>
      <input
        required
        type="password"
        v-model="password"
        placeholder="Mot de passe"
      />

      <hr />

      <div><button type="submit">Connexion</button></div>
      <div>
        <h1>{{ connexionMessage }}</h1>
      </div>
    </form>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      email: "",
      password: "",
    };
  },
  computed: {
    ...mapState('user', ['connexionMessage'])
  },
  methods: {
    login() {
      let email = this.email;
      let password = this.password;
      this.$store
        .dispatch("user/login", { email, password })
        .then(() =>
        this.$store.dispatch("user/profile"))
        .then(() => 
        this.$router.push({ path: `/posts/` }))
        .catch((err) => console.log("Login error:" + err));
    },
  },
};
</script>

<style></style>
