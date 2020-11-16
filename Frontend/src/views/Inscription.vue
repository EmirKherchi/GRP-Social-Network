<template>
  <div>
    <Register class="register" />
    <div class="login">
      <p>
        <router-link class="link" to="/connexion">Se Connecter</router-link>
      </p>
    </div>
  </div>
</template>

<script>
import Register from "@/components/Register";

export default {
  name: "Inscription",
  components: {
    Register,
  },
};
</script>
<style lang="scss" scoped>
.register {
  margin-top: 100px;
}
.login {
  margin-top: 25px;
  p {
    margin-top: 25px;
    color: #000a12;
    .link {
      color: #0f4c81;
      font-weight: 600;
    }
  }
}
</style>
