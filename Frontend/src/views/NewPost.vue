<template>
  <div>
    <form class="addPost" @submit.prevent="submitPost">
      <h1>Nouvelle Publication</h1>

      <label for="title">Titre</label>
      <input required v-model="title" type="text" placeholder="Titre" />
      <label for="image">Image</label>
      <input required v-model="image" type="text" placeholder="Image" />
      <hr />

      <div><button type="submit">Connexion</button></div>
    </form>
  </div>
</template>

<script>
export default {
  name: "NewPost",
  data() {
    return {
      title: "",
      image: "",
    };
  },
  methods: {
    submitPost() {
      let title = this.title;
      let image_post = this.image;
      this.$store
        .dispatch("posts/newPost", { title, image_post })
        .then(()=> this.$store.dispatch("user/profile"))
        .then(() => this.$router.push({ path: `/posts/` }))
        .catch((err) => console.log("Login error:" + err));
    },
  },
};
</script>

<style></style>
