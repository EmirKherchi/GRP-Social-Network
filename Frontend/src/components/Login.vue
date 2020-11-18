<template>
  <div>
    <h1>Groupomania -- réseau social</h1>
    <b-container class="login">
      <form @submit.prevent="login">
        <b-img
          fluid
          src="../assets/Images/icon.png"
          alt="Logo Groupomania social network"
          class="d-inline-block align-top"
        ></b-img>
        <h2>Connectez-vous</h2>

        <label for="email">Email</label>
        <b-form-input
          required
          id="email"
          v-model="email"
          type="email"
          placeholder="Email"
          class="input"
        />

        <label for="password">Mot de passe</label>
        <b-form-input
          required
          id="password"
          type="password"
          v-model="password"
          placeholder="Mot de passe"
          class="input"
        />


        <div><b-button class="btn" type="submit">Connexion</b-button></div>
        <div>
          <h3>{{ connexionMessage }}</h3>
        </div>
      </form>
    </b-container>
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
    ...mapState("user", ["connexionMessage"]),
  },
  methods: {
    login() {
      let email = this.email;
      let password = this.password;
      this.$store
        .dispatch("user/login", { email, password })
        .then(() => this.$store.dispatch("user/profile"))
        .then(() => this.$router.push({ path: `/posts/` }))
        .catch((err) => console.log("Login error:" + err));
    },
  },
};
</script>

<style scoped lang="scss">
.login {
  h1,h3{
    font-size: 24px;
  }
  
  
  form {
    padding: 25px 0 50px 0;
    background: #0f4c81;
    color: #fff;
    img{
      max-width: 100px;
    }
    .btn{
      margin: 20px 0 0 0;
       background-color:#263238;
      border: transparent;
      &:hover{
         background-color:#000a12;
      }
    }
    h1 {
      margin: 20px;
    }
    h4 {
      margin: 20px;
    }
    label {
      margin-top: 35px;
    }
    .input {
      width: 40%;
      display: block;
      margin: auto;
    }
  }
}
</style>
