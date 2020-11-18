<template>
  <b-container>
    <form
      enctype="multipart/form-data"
      class="addPost"
      @submit.prevent="submitComment"
    >
      <label for="content"><h4>Quelque chose à ajouter....</h4></label>
      <b-form-textarea
        required
        v-model="content"
        id="content"
        name="content"
      >
      </b-form-textarea>
      <div>
        <b-btn variant="primary" type="submit">Poster votre commentaire</b-btn>
      </div>

      <hr />
    </form>
  </b-container>
</template>

<script>
export default {
  name: "NewComment",
  data() {
    return {
      content: "",
    };
  },
  methods: {
    submitComment() {
      let data = {
        content: this.content,
      };
      this.$store.dispatch("comments/newComment", data)
      this.content = "";
    
    },
  },
};
</script>

<style lang="scss" scoped>
h4 {
  margin: 2%; 
}
button {
  margin-top: 2%;
  background: #0f4c81;
  border:#0f4c81;
  &:hover{
    background: #002554;
  }
}
</style>
