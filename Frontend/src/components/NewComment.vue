<template>
  <div>
    <form
      enctype="multipart/form-data"
      class="addPost"
      @submit.prevent="submitComment"
    >
      <h1>Nouveau commentaire</h1>

      <label for="content">Votre commentaire</label>
      <textarea
        required
        v-model="content"
        id="content"
        name="content"
        rows="5"
        cols="33"
      >
  Quelque chose à ajouter....
</textarea
      >
      <div><button type="submit">Poster votre publication</button></div>
      <hr />
    </form>
  </div>
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
      this.$store.dispatch("comments/newComment", data);
    },
  },
};
</script>

<style></style>
