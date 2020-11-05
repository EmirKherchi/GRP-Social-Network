<template>
  <div class="file">
    <h4>Modifier votre image de profil</h4>
    <form enctype="multipart/form-data" @submit.prevent="submit">
      <div class="field">
        <label>Image de profil</label><br />

        <input type="file" ref="file" @change="onFileSelected" />
      </div>

      <div>
        <button type="submit">Envoyé</button>
      </div>

      <div class="message">
        <h5>{{ message }}</h5>
      </div>
    </form>
  </div>
</template>

<script>
// import PictureInput from "vue-picture-input";
import axios from "axios";
export default {
  name: "UpdateAvatar",
  components: {
    // PictureInput,
  },
  data() {
    return {
      file: "",
      message: "",
    };
  },
  methods: {
    onFileSelected() {
      const file = this.$refs.file.files[0];
      this.file = file;
      console.log(this.file);
    },
    async submit() {
      const formData = new FormData();
      formData.append("file", this.file);
      try {
        await axios.put("http://localhost:8080/api/users/me/", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        this.message = "Mis à jour mother fuck";
      } catch (err) {
        console.log(err);
        this.message = "Un problème ?!  motherfuck  ! ";
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.file {
  margin: 100px 0;
  & input {
    margin: 20px;
  }
  & button {
    margin: 20px 0;
  }
}
</style>
