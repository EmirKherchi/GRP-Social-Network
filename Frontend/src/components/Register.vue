<template>
  <div>
    <h4>Créez votre compte</h4>
    <form enctype="multipart/form-data" @submit.prevent="register">
      <div class="field">
        <label for="firstname">Prénom</label>

        <input id="firstname" type="text" v-model="firstname" required />

        <label for="lastname">Nom</label>

        <input id="lastname" type="text" v-model="lastname" required />

        <label for="email">Email</label>

        <input id="email" type="email" v-model="email" required />

        <label for="avatar">Image de profil</label>
        <picture-input
          id="avatar"
          ref="pictureInput"
          @change="onFileSelected"
          :width="300"
          :crop="false"
          :hideChangeButton="true"
          :height="200"
          accept="image/jpeg, image/png, image/gif"
          buttonClass="button"
          :customStrings="{
            upload: 'Importer votre image',
            drag: ' Cliquer <br> ou faire un glisser-déposer',
          }"
        />

        <label for="password">Mot de passe</label>

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
import PictureInput from "vue-picture-input";
export default {
  components: {
    PictureInput,
  },
  data() {
    return {
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      file: "",
    };
  },
  computed: {
    ...mapState("user", ["connexionMessage"]),
  },
  methods: {
    onFileSelected() {
      const file = this.$refs.pictureInput.file;
      this.file = file;
    },
    register() {
      const formData = new FormData();

      formData.append("firstname", this.firstname);
      formData.append("lastname", this.lastname);
      formData.append("email", this.email);
      formData.append("password", this.password);
      formData.append("file", this.file);
      
      this.$store
        .dispatch("user/register", formData)
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
