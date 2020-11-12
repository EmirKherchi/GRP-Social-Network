<template>
  <div>
    <Login class="login" />
    <div class="register">
      <p>
        Si vous n'avez pas de compte suivez le liens suivant
        <router-link class="link" to="/inscription">Inscription</router-link>
      </p>
    </div>
  </div>
</template>

<script>
import Login from "@/components/Login";

export default {
  name: "Connexion",
  components: {
    Login,
  },
};
</script>
<style lang="scss" scoped>
.login {
  margin-top: 100px;
}
.register {
  margin-top: 25px;
  p {
    margin-top: 25px;
    color: black;
    .link {
      color: black;
      font-weight: 600;
    }
  }
}
</style>
