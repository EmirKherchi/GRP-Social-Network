<template>
  <div class="file">
    <h4>Modifier votre image de profil</h4>
    <form enctype="multipart/form-data" @submit.prevent="submit">
      <div class="field">
        <!-- <input type="file" ref="file" @change="onFileSelected" /> -->
        <picture-input
          id="avatar"
          ref="pictureInput"
          @change="onFileSelected"
          :width="300"
          :crop="false"
          :hideChangeButton="true"
          :height="200"
          accept="image/jpeg, image/png, image/gif,image/jpg"
          buttonClass="button"
          :customStrings="{
            upload: 'Importer votre image',
            drag: ' Cliquer <br> ou faire un glisser-déposer',
          }"
        />
      </div>

      <div>
        <b-button class="btn" type="submit">Modifier</b-button>
      </div>

      <div class="message">
        <h5>{{ updateMessage }}</h5>
      </div>
    </form>
  </div>
</template>

<script>
import { mapState } from "vuex";
import PictureInput from "vue-picture-input";
export default {
  name: "UpdateAvatar",
  components: {
    PictureInput,
  },
  data() {
    return {
      file: "",
    };
  },
  computed: {
    ...mapState("user", ["updateMessage"]),
  },
  methods: {
    onFileSelected() {
      const file = this.$refs.pictureInput.file;
      this.file = file;
      console.log(this.file);
    },
    submit() {
      const formData = new FormData();
      formData.append("file", this.file);
      this.$store
        .dispatch("user/update", formData)
        .then(() => {
          this.$store.dispatch("user/profile");
        })
        .catch((err) => console.log(err));
    },
  },
};
</script>

<style lang="scss" scoped>
.file {
  margin: 100px 0;
  h4 {
    margin: 2%;
  }
  & input {
    margin: 20px;
  }
  & button {
    margin: 2%;
    background: #0f4c81;
    border: #0f4c81;
    &:hover {
      background: #002554;
    }
  }
}
</style>
