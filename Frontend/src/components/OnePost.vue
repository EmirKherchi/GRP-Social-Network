<template>
  <div class="OnePost" @click.once="sendRequest">
    <div class="OnePost__header">
      <h3 class="OnePost__header--title">{{ title }}</h3>
    </div>

    <div class="OnePost__body">
      <img class="OnePost__body--image" :src="image_post" :alt="title" />
    </div>
  </div>
</template>

<script>
export default {
  name: "OnePost",
  props: {
    id: {
      type: Number,
    },
    title: {
      type: String,
      required: true,
      default: "Post Title",
    },
    image_post: {
      type: String,
      Required: true,
    },
  },
  methods: {
    sendRequest() {
      let id = this.id;
      if (id == this.$route.params.id) {
        this.$router.push({ path: `/posts/` });
      } else {
        this.$router.push({ path: `/posts/${id}` });
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.OnePost {
  margin: 5px 0px 40px 0px;  
  border-radius: 3px;
  cursor: pointer;
  &__header {
    margin-top: 40px;
    margin-bottom: 25px;
    &--title {
      letter-spacing: 0.5px;
      text-align: left;
      margin-left: 5%;
      margin: 0;
    }
  }
  &__body {
    &--image {
      margin: 25px 0 50px 0;
      width: 100%;
      max-width: 500px;
      height: auto;
    }
  }
}
</style>
