<template>
  <div>
    <b-container class="register">
      <form enctype="multipart/form-data" @submit.prevent="register">
        <div class="field">
          <b-img
            fluid
            src="../assets/Images/icon.png"
            alt="Logo Groupomania social network"
            class="d-inline-block align-top"
          ></b-img>
          <h2>Créez votre compte</h2>
          <label for="firstname">Prénom</label>

          <b-form-input
            id="firstname"
            type="text"
            v-model="firstname"
            required
            class="input"
          />

          <label for="lastname">Nom</label>

          <b-form-input
            id="lastname"
            type="text"
            v-model="lastname"
            required
            class="input"
          />

          <label for="email">Email</label>

          <b-form-input
            id="email"
            type="email"
            v-model="email"
            required
            class="input"
          />

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
            required
            :customStrings="{
              upload: 'Importer votre image',
              drag: ' Cliquer <br> ou faire un glisser-déposer',
            }"
          />

          <label for="password">Mot de passe</label>

          <b-form-input
            id="password"
            type="password"
            v-model="password"
            required
            class="input"
          />
        </div>

        <div>
          <b-button class="btn" type="submit">Inscription</b-button>
        </div>
        <div>
           <h4>{{ pictureRequired }}</h4>
           
          <h4>{{ connexionMessage }}</h4>
        </div>
      </form>
    </b-container>
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
      pictureRequired: "",
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
      if (this.file == "") {
        this.pictureRequired = "Veuillez choisir une image";
      } else {
        this.pictureRequired = "";
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
      }
    },
  },
};
</script>

<style scoped lang="scss">
.register {
  form {
    padding: 25px 0 50px 0;
    background: #0f4c81;
    color: #fff;
    img {
      max-width: 100px;
    }
    .btn {
      margin: 20px 0 0 0;
      background-color: #263238;
      border: transparent;
      &:hover {
        background-color: #000a12;
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
      width: 30%;
      display: block;
      margin: auto;
    }
  }
}
</style>
