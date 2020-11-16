<template>
  <b-container class="newPost">
    <form
      enctype="multipart/form-data"
      class="addPost"
      @submit.prevent="submitPost"
    >
      <h4>Nouvelle Publication</h4>

      <label for="title">Titre</label>
      <b-form-input
        class="input"
        required
        v-model="title"
        type="text"
        placeholder="Titre"
      />
      <label for="avatar"></label>
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
      <hr />

      <div><b-button class="btn" type="submit">Publier</b-button></div>
    </form>
  </b-container>
</template>

<script>
import PictureInput from "vue-picture-input";
export default {
  name: "NewPost",
  components: {
    PictureInput,
  },
  data() {
    return {
      title: "",
      file: "",
    };
  },
  methods: {
    onFileSelected() {
      const file = this.$refs.pictureInput.file;
      this.file = file;
    },
    submitPost() {
      const formData = new FormData();
      formData.append("title", this.title);
      formData.append("file", this.file);
      this.$store
        .dispatch("posts/newPost", formData)
        .then(() => this.$store.dispatch("user/profile"))
        .then(() => this.$router.push({ path: `/posts/` }))
        .catch((err) => console.log("Login error:" + err));
    },
  },
};
</script>

<style lang="scss" scoped>
.newPost {
  margin-top: 100px;
  h4 {
    margin: 20px;
  }
  form {
    padding: 25px 0 50px 0;
    background: #0f4c81;
    color: #fff;
    .avatar {
      margin-top: 35px;
    }
    .input {
      width: 40%;
      display: block;
      margin: auto;
    }
    .btn {
      margin: 20px 0 0 0;
      background-color: #263238;
      border: transparent;
      &:hover {
        background-color: #000a12;
      }
    }
  }
  label {
    margin-top: 35px;
  }
}
</style>
//background: #f2f3f7
