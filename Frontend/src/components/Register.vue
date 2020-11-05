<template>
  <div>
    <h4>Créez votre compte</h4>
    <form @submit.prevent="register">
      <label for="firstname">Prénom</label>
      <div>
        <input
          id="firstname"
          type="text"
          v-model="firstname"
          required
          autofocus
        />
      </div>

      <label for="lastname">Nom</label>
      <div>
        <input id="lastname" type="text" v-model="lastname" required />
      </div>

      <label for="email">Email</label>
      <div>
        <input id="email" type="email" v-model="email" required />
      </div>

      <label for="avatar">Image de profil</label>
      <picture-input
        id="avatar"
        ref="pictureInput"
        @change="onFileSelected"
        :width="300"
        :removable="true"
        removeButtonClass="ui red button"
        :height="200"
        accept="image/jpeg, image/png, image/gif"
        buttonClass="ui button primary"
        :customStrings="{
          upload: '<h1>Upload it!</h1>',
          drag: 'Drag and drop your image here',
        }"
      />

      <label for="password">Mot de passe</label>
      <div>
        <input id="password" type="password" v-model="password" required />
      </div>
      <hr />

      <div>
        <button type="submit">Register</button>
      </div>
      <div>
        <h1>{{ connexionMessage }}</h1>
      </div>
    </form>
  </div>
</template>

<script>
import { mapState } from "vuex";
import PictureInput from 'vue-picture-input'
export default {
  components:{
    PictureInput,
  },
  data() {
    return {
      firstname: "",
      lastname: "",
      email: "",
      profil_image: "",
      password: "",
    };
  },
  computed: {
    ...mapState("user", ["connexionMessage"]),
  },
  methods: {
    onFileSelected() {
      const file = this.$refs.pictureInput.file;
      this.profil_image = file;
      console.log(this.profil_image);
    },
    register() {
      let data = {
        firstname : this.firstname,
        lastname : this.lastname,
        email :this.email,
        password : this.password,
        profil_image : this.profil_image
      }      
      this.$store
        .dispatch("user/register", {data})
        .then(() => {
          let router = this.$router;
          setTimeout(function() {
            router.push({ path: `/connexion` });
          }, 2000);
        })
        .catch((err) => console.log(err));
    },
  },
};
</script>

<style></style>
