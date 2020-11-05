<template>
  <div>
    <form enctype="multipart/form-data" class="addPost" @submit.prevent="submitPost">
      <h1>Nouvelle Publication</h1>

      <label for="title">Titre</label>
      <input required v-model="title" type="text" placeholder="Titre" />
      <label for="image">Image</label>
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

      <div><button type="submit">Poster votre publication</button></div>
    </form>
  </div>
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
        .dispatch("posts/newPost", formData )
        .then(()=> this.$store.dispatch("user/profile"))
        .then(() => this.$router.push({ path: `/posts/` }))
        .catch((err) => console.log("Login error:" + err));
    },
  },
};
</script>

<style></style>
